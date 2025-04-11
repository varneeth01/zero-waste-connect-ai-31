
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Utensils, Users, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { mockDonations } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Get the most recent donations for the featured section
  const featuredDonations = mockDonations
    .filter(donation => donation.status === 'available')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  const formatTimeLeft = (deadline: Date) => {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffHrs = Math.round(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.round(diffMs / (1000 * 60));
      return `${diffMins} mins left`;
    }
    
    return `${diffHrs} hrs left`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
            opacity: 0.15
          }}
        />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-zerowaste-primary hover:bg-zerowaste-dark">
              AI-Powered Food Rescue
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Zero Food Waste, <br/>
              <span className="text-zerowaste-primary">Maximum Impact</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Connect surplus food with those who need it most. Our platform uses AI and geolocation to make food donation easy, efficient, and impactful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/map">
                  Find Donations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/donation/new">
                  <Leaf className="mr-2 h-4 w-4" /> Donate Food
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-zerowaste-primary mb-2">2,500+</h3>
              <p className="text-muted-foreground">Kilograms of Food Saved</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-zerowaste-primary mb-2">150+</h3>
              <p className="text-muted-foreground">Active Food Donors</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-zerowaste-primary mb-2">75+</h3>
              <p className="text-muted-foreground">Verified Recipients</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-zerowaste-primary mb-2">1,200+</h3>
              <p className="text-muted-foreground">CO₂ Emissions Prevented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to connect surplus food with those who need it, reducing waste and fighting hunger in your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-zerowaste-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-zerowaste-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Donate Surplus Food</h3>
              <p className="text-muted-foreground">
                Restaurants, markets, and individuals can easily list surplus food with details and images.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-zerowaste-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-zerowaste-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Connect with Recipients</h3>
              <p className="text-muted-foreground">
                Food banks, shelters, and verified individuals can find and request available donations.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-zerowaste-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-zerowaste-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor the lifecycle of donations from posting to pickup with notifications and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Donations */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Donations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse recently posted food donations in your area ready for pickup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDonations.map((donation) => (
              <Card key={donation.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={donation.images[0]} 
                    alt={donation.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <Badge className="absolute top-2 right-2 bg-zerowaste-primary hover:bg-zerowaste-dark">
                    {donation.foodType}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{donation.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeLeft(donation.pickupDeadline)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground mb-2">
                    {donation.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="h-4 w-4 text-zerowaste-primary" />
                    <span>Serves {donation.servesCount} people</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to={`/donation/${donation.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/donations">
                View All Donations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-zerowaste-primary/90" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <AlertTriangle className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Join the Movement Against Food Waste</h2>
            <p className="text-lg mb-8 opacity-90">
              Every year, millions of tons of food go to waste while people go hungry. 
              Be part of the solution by donating your surplus food or volunteering your time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-zerowaste-primary hover:bg-white/90 border-white" asChild>
                <Link to="/signup">
                  Register Now
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/20" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
