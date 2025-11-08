import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Download, CheckCircle, XCircle } from "lucide-react";

const MigrateResources = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleMigrate = async () => {
    setIsLoading(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('migrate-resources', {
        body: {},
      });

      if (error) {
        console.error('Migration error:', error);
        toast.error('Migration failed: ' + error.message);
        return;
      }

      setResults(data);
      toast.success(`Migration completed! ${data.summary.succeeded} succeeded, ${data.summary.failed} failed`);
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Migration failed: ' + String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Migrate Resources</h1>
        <p className="text-muted-foreground">
          Download PDFs from the old website and upload them to cloud storage
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Migration</CardTitle>
          <CardDescription>
            This will download all meeting minutes and newsletters from westendrockvillemd.org
            and upload them to cloud storage, then update the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleMigrate} disabled={isLoading} size="lg">
            <Download className="mr-2 h-4 w-4" />
            {isLoading ? 'Migrating...' : 'Start Migration'}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Migration Results</CardTitle>
            <CardDescription>
              Total: {results.summary.total} | Succeeded: {results.summary.succeeded} | Failed: {results.summary.failed}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.results.map((result: any, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded border">
                  {result.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{result.title}</p>
                    {result.error && (
                      <p className="text-xs text-red-500">{result.error}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {result.type || 'error'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MigrateResources;
