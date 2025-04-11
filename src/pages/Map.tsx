
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, MapPin, Clock, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FoodDonation, FoodType, FoodPreservation } from "@/types";
import { mockDonations } from "@/data/mockData";
import { Link } from "react-router-dom";

const Map = () => {
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState<FoodType | "all">("all");
  const [preservationFilter, setPreservationFilter] = useState<FoodPreservation | "all">("all");
  const [filteredDonations, setFilteredDonations] = useState<FoodDonation[]>([]);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we'll use our mock data
    setDonations(mockDonations.filter(d => d.status === 'available'));
  }, []);

  useEffect(() => {
    let filtered = [...donations];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(donation => 
        donation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        donation.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Food type filter
    if (foodTypeFilter !== "all") {
      filtered = filtered.filter(donation => donation.foodType === foodTypeFilter);
    }
    
    // Preservation filter
    if (preservationFilter !== "all") {
      filtered = filtered.filter(donation => donation.preservation === preservationFilter);
    }
    
    setFilteredDonations(filtered);
  }, [donations, searchTerm, foodTypeFilter, preservationFilter]);

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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search & Filter
                </CardTitle>
                <CardDescription>
                  Find the right food donations near you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="search" className="text-sm font-medium">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by keywords..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="food-type" className="text-sm font-medium">
                    Food Type
                  </label>
                  <Select value={foodTypeFilter} onValueChange={(value) => setFoodTypeFilter(value as any)}>
                    <SelectTrigger id="food-type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="non-vegetarian">Non-vegetarian</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="preservation" className="text-sm font-medium">
                    Preservation
                  </label>
                  <Select value={preservationFilter} onValueChange={(value) => setPreservationFilter(value as any)}>
                    <SelectTrigger id="preservation">
                      <SelectValue placeholder="All Methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="frozen">Frozen</SelectItem>
                      <SelectItem value="room-temperature">Room Temperature</SelectItem>
                      <SelectItem value="heated">Heated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full" onClick={() => {
                    setSearchTerm("");
                    setFoodTypeFilter("all");
                    setPreservationFilter("all");
                  }}>
                    <Filter className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
                <CardDescription>
                  This would be a real interactive map in the full version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-zerowaste-primary" />
                    <p className="text-sm text-muted-foreground">
                      Interactive map showing all available food donations in your area
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Available Donations</h1>
              <p className="text-sm text-muted-foreground">
                Showing {filteredDonations.length} results
              </p>
            </div>
            
            {filteredDonations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDonations.map((donation) => (
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
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Utensils className="h-4 w-4 text-zerowaste-primary" />
                          <span>Serves {donation.servesCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-zerowaste-primary" />
                          <span className="truncate">{donation.location.address}</span>
                        </div>
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
            ) : (
              <Card className="p-12 text-center">
                <div className="mb-4">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria to find more donations.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setFoodTypeFilter("all");
                  setPreservationFilter("all");
                }}>
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
