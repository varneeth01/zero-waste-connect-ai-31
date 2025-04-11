
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Utensils, MapPin, Clock, Calendar, Info, MessageSquare } from "lucide-react";
import { FoodDonation, User } from "@/types";
import { mockDonations, mockUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const DonationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [donation, setDonation] = useState<FoodDonation | null>(null);
  const [donor, setDonor] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch the donation details from an API
    // For demo purposes, we'll simulate fetching data
    setIsLoading(true);
    setTimeout(() => {
      const foundDonation = mockDonations.find(d => d.id === id);
      setDonation(foundDonation || null);
      
      if (foundDonation) {
        const foundDonor = mockUsers.find(u => u.id === foundDonation.donorId);
        setDonor(foundDonor || null);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const formatTimeLeft = (deadline: Date) => {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.round(diffMs / (1000 * 60));
      return `${diffMins} minutes left`;
    }
    
    return `${diffHrs} hours left`;
  };

  const handleReserve = () => {
    toast({
      title: "Reservation Requested",
      description: "Your request has been sent to the donor. They will contact you shortly.",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the donor.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zerowaste-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading donation details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!donation) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-3xl mx-auto p-8 text-center">
            <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-4">Donation Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The donation you're looking for might have been removed or doesn't exist.
            </p>
            <Button asChild>
              <a href="/map">Back to Donations</a>
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="relative aspect-video">
                <img 
                  src={donation.images[0]} 
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge className="bg-zerowaste-primary hover:bg-zerowaste-dark">
                    {donation.foodType}
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    {donation.preservation}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{donation.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2">
                      <Clock className="h-4 w-4 text-zerowaste-primary" />
                      <span className="font-medium text-zerowaste-primary">
                        {formatTimeLeft(donation.pickupDeadline)}
                      </span>
                    </CardDescription>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Posted</span>
                    <p className="font-medium">{new Date(donation.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {donation.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Utensils className="h-5 w-5 text-zerowaste-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Quantity</h4>
                      <p className="text-muted-foreground">
                        {donation.quantity.amount} {donation.quantity.unit} (serves {donation.servesCount})
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-zerowaste-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Expiry</h4>
                      <p className="text-muted-foreground">
                        {formatDateTime(donation.expiryTime)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-zerowaste-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pickup Deadline</h4>
                      <p className="text-muted-foreground">
                        {formatDateTime(donation.pickupDeadline)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-zerowaste-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pickup Location</h4>
                      <p className="text-muted-foreground">
                        {donation.location.address}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Pickup Map</h3>
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground p-4 text-center">
                      Interactive map would display here, showing pickup location and directions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donor info */}
            <Card>
              <CardHeader>
                <CardTitle>Donor Information</CardTitle>
              </CardHeader>
              <CardContent>
                {donor && (
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={donor.avatar} alt={donor.name} />
                      <AvatarFallback className="bg-zerowaste-primary text-primary-foreground">
                        {donor.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{donor.name}</h3>
                      <p className="text-sm text-muted-foreground">{donor.role}</p>
                      <Badge variant="outline" className="mt-2">Verified Donor</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Button className="w-full" variant="outline" onClick={handleMessage}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Donor
                </Button>
              </CardFooter>
            </Card>
            
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Reservation</CardTitle>
                <CardDescription>
                  Request this donation now before it's gone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Pickup by:</span> {formatDateTime(donation.pickupDeadline)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      <span className="font-medium">Status:</span> {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleReserve}>
                  Reserve This Donation
                </Button>
              </CardFooter>
            </Card>
            
            {/* Similar donations */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Donations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDonations
                  .filter(d => d.id !== donation.id && d.status === 'available' && d.foodType === donation.foodType)
                  .slice(0, 2)
                  .map(d => (
                    <div key={d.id} className="flex gap-3">
                      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={d.images[0]} 
                          alt={d.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-1">{d.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{d.location.address}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-zerowaste-primary">
                          <Clock className="h-3 w-3" />
                          {formatTimeLeft(d.pickupDeadline)}
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <a href="/map">View All Donations</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationDetail;
