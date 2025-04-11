
import { FoodDonation, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'usr1',
    name: 'Green Plate Restaurant',
    email: 'contact@greenplate.com',
    role: 'donor',
    avatar: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=100&auto=format&fit=crop',
    phone: '(555) 123-4567',
    address: '123 Culinary Ave, Foodville',
    coordinates: { lat: 40.712776, lng: -74.005974 },
    verified: true,
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'usr2',
    name: 'Food Rescue Alliance',
    email: 'help@foodrescue.org',
    role: 'recipient',
    avatar: 'https://images.unsplash.com/photo-1617450365226-9bf28c04e130?q=80&w=100&auto=format&fit=crop',
    phone: '(555) 987-6543',
    address: '456 Charity Ln, Helptown',
    coordinates: { lat: 40.714, lng: -74.006 },
    verified: true,
    createdAt: new Date('2023-02-10')
  },
  {
    id: 'usr3',
    name: 'Sarah Thompson',
    email: 'sarah@gmail.com',
    role: 'volunteer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
    phone: '(555) 555-5555',
    address: '789 Helper St, Volunteerburg',
    coordinates: { lat: 40.713, lng: -74.008 },
    verified: true,
    createdAt: new Date('2023-03-05')
  },
  {
    id: 'usr4',
    name: 'Fresh Harvest Market',
    email: 'info@freshharvestmarket.com',
    role: 'donor',
    avatar: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=100&auto=format&fit=crop',
    phone: '(555) 222-3333',
    address: '321 Market St, Freshville',
    coordinates: { lat: 40.717, lng: -74.003 },
    verified: true,
    createdAt: new Date('2023-01-25')
  },
  {
    id: 'usr5',
    name: 'Community Shelter',
    email: 'support@communityshelter.org',
    role: 'recipient',
    avatar: 'https://images.unsplash.com/photo-1569385210018-127685230669?q=80&w=100&auto=format&fit=crop',
    phone: '(555) 444-7777',
    address: '654 Shelter Ave, Communityville',
    coordinates: { lat: 40.715, lng: -74.001 },
    verified: true,
    createdAt: new Date('2023-02-15')
  }
];

export const mockDonations: FoodDonation[] = [
  {
    id: 'don1',
    title: 'Fresh Sandwiches',
    description: 'Assorted sandwiches from our daily lunch service. Includes vegetarian options.',
    foodType: 'mixed',
    preservation: 'refrigerated',
    quantity: { amount: 20, unit: 'sandwiches' },
    servesCount: 20,
    expiryTime: new Date(new Date().setHours(new Date().getHours() + 24)),
    pickupDeadline: new Date(new Date().setHours(new Date().getHours() + 4)),
    status: 'available',
    images: ['https://images.unsplash.com/photo-1567234669003-dce7a7a88821?q=80&w=300&auto=format&fit=crop'],
    location: {
      address: '123 Culinary Ave, Foodville',
      lat: 40.712776,
      lng: -74.005974
    },
    donorId: 'usr1',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 1)),
    updatedAt: new Date(new Date().setHours(new Date().getHours() - 1))
  },
  {
    id: 'don2',
    title: 'Surplus Produce',
    description: 'Assorted fresh vegetables and fruits. Slightly blemished but perfectly edible.',
    foodType: 'vegetarian',
    preservation: 'room-temperature',
    quantity: { amount: 15, unit: 'kg' },
    servesCount: 30,
    expiryTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    pickupDeadline: new Date(new Date().setHours(new Date().getHours() + 8)),
    status: 'available',
    images: ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=300&auto=format&fit=crop'],
    location: {
      address: '321 Market St, Freshville',
      lat: 40.717,
      lng: -74.003
    },
    donorId: 'usr4',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    updatedAt: new Date(new Date().setHours(new Date().getHours() - 3))
  },
  {
    id: 'don3',
    title: 'Prepared Meals',
    description: 'Homestyle meals prepared today. Contains meat and dairy.',
    foodType: 'non-vegetarian',
    preservation: 'heated',
    quantity: { amount: 10, unit: 'meals' },
    servesCount: 10,
    expiryTime: new Date(new Date().setHours(new Date().getHours() + 6)),
    pickupDeadline: new Date(new Date().setHours(new Date().getHours() + 2)),
    status: 'reserved',
    images: ['https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=300&auto=format&fit=crop'],
    location: {
      address: '123 Culinary Ave, Foodville',
      lat: 40.712776,
      lng: -74.005974
    },
    donorId: 'usr1',
    recipientId: 'usr2',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
    updatedAt: new Date(new Date().setHours(new Date().getHours() - 2))
  },
  {
    id: 'don4',
    title: 'Bakery Surplus',
    description: 'Assorted breads, pastries, and baked goods from today\'s production.',
    foodType: 'vegetarian',
    preservation: 'room-temperature',
    quantity: { amount: 25, unit: 'items' },
    servesCount: 15,
    expiryTime: new Date(new Date().setHours(new Date().getHours() + 36)),
    pickupDeadline: new Date(new Date().setHours(new Date().getHours() + 5)),
    status: 'available',
    images: ['https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=300&auto=format&fit=crop'],
    location: {
      address: '321 Market St, Freshville',
      lat: 40.717,
      lng: -74.003
    },
    donorId: 'usr4',
    createdAt: new Date(new Date().setHours(new Date().getHours() - 4)),
    updatedAt: new Date(new Date().setHours(new Date().getHours() - 4))
  },
  {
    id: 'don5',
    title: 'Frozen Meals',
    description: 'Pre-packaged frozen meals with variety of options.',
    foodType: 'mixed',
    preservation: 'frozen',
    quantity: { amount: 30, unit: 'meals' },
    servesCount: 30,
    expiryTime: new Date(new Date().setDate(new Date().getDate() + 30)),
    pickupDeadline: new Date(new Date().setDate(new Date().getDate() + 2)),
    status: 'in-transit',
    images: ['https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=300&auto=format&fit=crop'],
    location: {
      address: '123 Culinary Ave, Foodville',
      lat: 40.712776,
      lng: -74.005974
    },
    donorId: 'usr1',
    recipientId: 'usr5',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setHours(new Date().getHours() - 6))
  }
];
