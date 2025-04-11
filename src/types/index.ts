
export type UserRole = 'donor' | 'recipient' | 'volunteer' | 'admin';

export type FoodType = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'mixed';

export type FoodPreservation = 'refrigerated' | 'frozen' | 'room-temperature' | 'heated';

export type DonationStatus = 'available' | 'reserved' | 'in-transit' | 'delivered' | 'expired';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  verified: boolean;
  createdAt: Date;
}

export interface FoodDonation {
  id: string;
  title: string;
  description: string;
  foodType: FoodType;
  preservation: FoodPreservation;
  quantity: {
    amount: number;
    unit: string;
  };
  servesCount: number;
  expiryTime: Date;
  pickupDeadline: Date;
  status: DonationStatus;
  images: string[];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  donorId: string;
  donor?: User;
  recipientId?: string;
  recipient?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  type: DonationStatus;
  donationId: string;
}
