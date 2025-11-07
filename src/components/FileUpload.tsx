import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, X, FileIcon, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  bucket: string;
  accept?: string;
  maxSize?: number; // in MB
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

export function FileUpload({
  bucket,
  accept = 'image/*',
  maxSize = 5,
  onUploadComplete,
  currentUrl,
  label = 'Upload File',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`File size must be less than ${maxSize}MB`);
        return;
      }

      setUploading(true);

      // Generate unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadComplete(publicUrl);
      toast.success('File uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadComplete('');
  };

  const isImage = accept.includes('image');

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {preview ? (
        <div className="relative">
          {isImage ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          ) : (
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <FileIcon className="h-8 w-8" />
              <span className="text-sm truncate flex-1">{preview}</span>
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${bucket}`}
          />
          <Label
            htmlFor={`file-upload-${bucket}`}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            {isImage ? (
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            ) : (
              <FileIcon className="h-12 w-12 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {uploading ? 'Uploading...' : `Click to upload (Max ${maxSize}MB)`}
            </span>
          </Label>
        </div>
      )}
    </div>
  );
}
