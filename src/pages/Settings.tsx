
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile, updateEmail, sendEmailVerification } from "firebase/auth";
import { Check, User, Mail, Bell, Shield, LogOut } from "lucide-react";

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);

  // Redirect if not logged in
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    
    setIsUpdating(true);
    try {
      // Update display name
      if (displayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName });
      }
      
      // Update email if changed and user is using email/password
      if (email !== currentUser.email && currentUser.providerData[0].providerId === 'password') {
        await updateEmail(currentUser, email);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    if (!currentUser) return;
    
    setIsSendingVerification(true);
    try {
      await sendEmailVerification(currentUser);
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and follow the instructions.",
      });
    } catch (error) {
      console.error("Send verification error:", error);
      toast({
        title: "Failed to send verification",
        description: "Could not send verification email. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-zerowaste-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  disabled={currentUser?.providerData[0].providerId !== 'password'}
                />
                {currentUser?.providerData[0].providerId !== 'password' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Email can't be changed for accounts linked with external providers.
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <div>
                  {!currentUser.emailVerified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSendVerificationEmail}
                      disabled={isSendingVerification}
                    >
                      {isSendingVerification ? "Sending..." : "Verify Email"}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-zerowaste-primary" />
                Account Security
              </CardTitle>
              <CardDescription>Manage your account security options</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full sm:w-auto"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
