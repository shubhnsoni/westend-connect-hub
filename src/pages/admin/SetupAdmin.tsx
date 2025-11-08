import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserPlus, CheckCircle } from "lucide-react";

const SetupAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      const { data, error } = await supabase.functions.invoke('setup-admin', {
        body: { email, password },
      });

      if (error) {
        console.error('Setup error:', error);
        toast.error('Failed to create admin user: ' + error.message);
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setSuccess(true);
      toast.success('Admin user created successfully! You can now log in.');
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Failed to create admin user: ' + String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Setup Admin User
          </CardTitle>
          <CardDescription>
            Create the first admin user for the WECA website
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <p className="text-lg font-medium">Admin user created successfully!</p>
              <p className="text-sm text-muted-foreground">
                You can now log in to the admin panel
              </p>
              <Button asChild className="w-full">
                <a href="/admin/login">Go to Login</a>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSetup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Admin User...' : 'Create Admin User'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupAdmin;
