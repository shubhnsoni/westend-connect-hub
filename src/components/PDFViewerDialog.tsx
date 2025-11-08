import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface PDFViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string | null;
  title?: string;
}

const PDFViewerDialog = ({ open, onOpenChange, pdfUrl, title }: PDFViewerDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{title || 'Document Viewer'}</DialogTitle>
            <div className="flex items-center gap-2">
              {pdfUrl && (
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    Open
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative bg-muted/30">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {pdfUrl && (
            <object data={pdfUrl} type="application/pdf" className="w-full h-full" aria-label={title || 'PDF Document'}>
              <embed src={pdfUrl} type="application/pdf" className="w-full h-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="text-sm text-muted-foreground">Preview not available on this device. Use the buttons above to open or download.</p>
              </div>
            </object>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerDialog;
