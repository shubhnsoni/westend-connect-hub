import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileArchive, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ExtractedFile {
  name: string;
  data: Uint8Array;
  status: 'pending' | 'uploading' | 'done' | 'error';
  url?: string;
  error?: string;
}

export default function BulkMinutesUpload({ onComplete }: { onComplete?: () => void }) {
  const [files, setFiles] = useState<ExtractedFile[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleZipSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zipFiles = e.target.files;
    if (!zipFiles?.length) return;

    setIsExtracting(true);
    setFiles([]);

    try {
      const allExtracted: ExtractedFile[] = [];

      for (const zipFile of Array.from(zipFiles)) {
        const zip = await JSZip.loadAsync(zipFile);
        const zipName = zipFile.name.replace(/\.zip$/i, '');

        for (const [path, entry] of Object.entries(zip.files)) {
          if (entry.dir) continue;
          if (!path.toLowerCase().endsWith('.pdf')) continue;
          // Skip macOS metadata
          if (path.startsWith('__MACOSX')) continue;

          const data = await entry.async('uint8array');
          const fileName = path.split('/').pop() || path;
          
          allExtracted.push({
            name: `${zipName}/${fileName}`,
            data,
            status: 'pending',
          });
        }
      }

      setFiles(allExtracted);
      toast({ title: `Extracted ${allExtracted.length} PDF files from ${zipFiles.length} zip(s)` });
    } catch (err: any) {
      toast({ title: 'Error reading zip file', description: err.message, variant: 'destructive' });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleUploadAll = async () => {
    setIsUploading(true);
    setProgress(0);

    const updated = [...files];
    let completed = 0;

    for (let i = 0; i < updated.length; i++) {
      const file = updated[i];
      updated[i] = { ...file, status: 'uploading' };
      setFiles([...updated]);

      try {
        // Clean path for storage
        const storagePath = file.name
          .replace(/[^a-zA-Z0-9/_.-]/g, '-')
          .replace(/-+/g, '-');

        const { error } = await supabase.storage
          .from('meeting-documents')
          .upload(storagePath, file.data, {
            contentType: 'application/pdf',
            upsert: true,
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('meeting-documents')
          .getPublicUrl(storagePath);

        updated[i] = { ...file, status: 'done', url: publicUrl };
      } catch (err: any) {
        updated[i] = { ...file, status: 'error', error: err.message };
      }

      completed++;
      setProgress(Math.round((completed / updated.length) * 100));
      setFiles([...updated]);
    }

    const successCount = updated.filter(f => f.status === 'done').length;
    const errorCount = updated.filter(f => f.status === 'error').length;

    toast({
      title: `Upload complete: ${successCount} succeeded${errorCount ? `, ${errorCount} failed` : ''}`,
    });

    setIsUploading(false);
    onComplete?.();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: 'URL copied to clipboard' });
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <FileArchive className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-semibold text-lg">Bulk Upload Meeting Minutes</h3>
          <p className="text-sm text-muted-foreground">Upload ZIP files containing PDFs to extract and store them</p>
        </div>
      </div>

      <div>
        <input
          ref={fileRef}
          type="file"
          accept=".zip"
          multiple
          onChange={handleZipSelect}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileRef.current?.click()}
          disabled={isExtracting || isUploading}
          className="gap-2"
        >
          {isExtracting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isExtracting ? 'Extracting...' : 'Select ZIP File(s)'}
        </Button>
      </div>

      {files.length > 0 && (
        <>
          <div className="max-h-60 overflow-y-auto space-y-1 border rounded-lg p-3">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm py-1">
                {file.status === 'done' && <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />}
                {file.status === 'error' && <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                {file.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />}
                {file.status === 'pending' && <div className="h-4 w-4 rounded-full border flex-shrink-0" />}
                <span className="truncate flex-1">{file.name}</span>
                {file.status === 'done' && file.url && (
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => copyUrl(file.url!)}>
                    Copy URL
                  </Button>
                )}
                {file.status === 'error' && (
                  <span className="text-xs text-destructive">{file.error}</span>
                )}
              </div>
            ))}
          </div>

          {isUploading && <Progress value={progress} />}

          <Button
            onClick={handleUploadAll}
            disabled={isUploading || files.every(f => f.status === 'done')}
            className="gap-2"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {isUploading ? `Uploading... ${progress}%` : `Upload ${files.filter(f => f.status === 'pending').length} Files`}
          </Button>
        </>
      )}
    </Card>
  );
}
