
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, MapPin, Edit } from "lucide-react";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const userInitials = currentUser.displayName 
    ? currentUser.displayName.substring(0, 2).toUpperCase() 
    : currentUser.email?.substring(0, 2).toUpperCase() || "US";

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || currentUser.email || ""} />
                    <AvatarFallback className="text-2xl bg-zerowaste-primary text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{currentUser.displayName || "ZeroWaste User"}</CardTitle>
                <CardDescription>{currentUser.email}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate("/settings")}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Profile Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Name:</span>
                      <span>{currentUser.displayName || "Not set"}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Email:</span>
                      <span>{currentUser.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Account created:</span>
                      <span>{currentUser.metadata.creationTime 
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                        : "Unknown"}</span>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Authentication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Email verified:</span>
                      <span className={`py-0.5 px-2 rounded-full text-xs ${
                        currentUser.emailVerified ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {currentUser.emailVerified ? "Verified" : "Not verified"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
