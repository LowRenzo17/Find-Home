export interface Agent {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: "house" | "apartment" | "condo" | "townhouse" | "villa" | "studio";
  listingType: "sale" | "rent";
  images: string[];
  description: string;
  amenities: string[];
  agent: Agent;
  yearBuilt: number;
  featured?: boolean;
}

const agents: Agent[] = [
  { name: "Sarah Mitchell", phone: "(555) 234-5678", email: "sarah.m@nestfinder.com", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
  { name: "James Rivera", phone: "(555) 345-6789", email: "james.r@nestfinder.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Emily Chen", phone: "(555) 456-7890", email: "emily.c@nestfinder.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { name: "Marcus Johnson", phone: "(555) 567-8901", email: "marcus.j@nestfinder.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { name: "Lisa Park", phone: "(555) 678-9012", email: "lisa.p@nestfinder.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
];

const propertyImages = [
  [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560185127-6a2e3b774926?w=800&h=600&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop",
  ],
  [
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop",
  ],
];

const amenitiesSets = [
  ["Swimming Pool", "Garden", "Garage", "Central AC", "Hardwood Floors", "Fireplace"],
  ["Gym", "Concierge", "Rooftop Terrace", "In-unit Laundry", "Elevator", "Pet Friendly"],
  ["Smart Home", "Solar Panels", "Wine Cellar", "Home Theater", "Walk-in Closet", "Spa"],
  ["Balcony", "Parking", "Security System", "Storage", "Dishwasher", "High Ceilings"],
  ["Ocean View", "Private Beach", "BBQ Area", "Tennis Court", "Sauna", "Guest House"],
];

const locations = [
  { city: "Manhattan, NY", lat: 40.7831, lng: -73.9712 },
  { city: "Brooklyn, NY", lat: 40.6782, lng: -73.9442 },
  { city: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
  { city: "Miami Beach, FL", lat: 25.7907, lng: -80.1300 },
  { city: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { city: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
  { city: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
  { city: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { city: "Denver, CO", lat: 39.7392, lng: -104.9903 },
  { city: "Boston, MA", lat: 42.3601, lng: -71.0589 },
];

const streetNames = [
  "Oak Avenue", "Maple Street", "Cedar Lane", "Elm Drive", "Pine Road",
  "Birch Court", "Willow Way", "Park Boulevard", "Lake Drive", "River Road",
  "Sunset Boulevard", "Ocean Drive", "Harbor View", "Mountain Pass", "Valley Road",
];

const propertyTypes: Property["propertyType"][] = ["house", "apartment", "condo", "townhouse", "villa", "studio"];

const titles = [
  "Modern Luxury Home with Panoramic Views",
  "Charming Downtown Apartment",
  "Elegant Waterfront Condo",
  "Spacious Family Townhouse",
  "Contemporary Urban Villa",
  "Cozy Studio in the Heart of the City",
  "Stunning Penthouse Suite",
  "Classic Colonial with Modern Updates",
  "Renovated Loft with City Views",
  "Mediterranean-Style Estate",
  "Sleek Industrial Conversion",
  "Sun-Drenched Corner Unit",
  "Architect-Designed Masterpiece",
  "Boutique Residence with Private Garden",
  "Luxury High-Rise Living",
];

const descriptions = [
  "This stunning property offers an exceptional living experience with premium finishes throughout. Floor-to-ceiling windows flood the space with natural light, while the open-concept layout is perfect for entertaining. The gourmet kitchen features top-of-the-line appliances and custom cabinetry.",
  "Nestled in a prime location, this beautifully maintained property combines classic charm with modern conveniences. Enjoy spacious rooms, updated fixtures, and a wonderful outdoor space. Walking distance to shops, restaurants, and public transit.",
  "Experience luxury living at its finest in this meticulously crafted home. Every detail has been thoughtfully designed, from the imported marble countertops to the custom millwork. The primary suite is a true retreat with a spa-like bathroom and walk-in closet.",
  "A rare gem in a sought-after neighborhood. This property has been lovingly updated while preserving its original character. Features include hardwood floors, crown molding, and a chef's kitchen. The private backyard is an urban oasis.",
  "Welcome to your dream home. This exceptional property offers the perfect blend of style and comfort. The flowing floor plan is ideal for both daily living and special occasions. Premium materials and attention to detail are evident throughout.",
];

export const properties: Property[] = Array.from({ length: 30 }, (_, i) => {
  const loc = locations[i % locations.length];
  const offset = () => (Math.random() - 0.5) * 0.05;
  const type = propertyTypes[i % propertyTypes.length];
  const isRent = i % 3 === 0;
  const basePrice = isRent
    ? [2500, 3200, 4100, 5500, 1800, 6200, 7500, 2800, 3600, 4800][i % 10]
    : [750000, 1200000, 890000, 520000, 2100000, 450000, 3500000, 680000, 950000, 1650000][i % 10];

  return {
    id: `prop-${i + 1}`,
    title: titles[i % titles.length],
    price: basePrice + Math.floor(Math.random() * 50000),
    location: loc.city,
    address: `${100 + Math.floor(Math.random() * 900)} ${streetNames[i % streetNames.length]}`,
    latitude: loc.lat + offset(),
    longitude: loc.lng + offset(),
    bedrooms: type === "studio" ? 0 : Math.floor(Math.random() * 4) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    area: type === "studio" ? 450 + Math.floor(Math.random() * 200) : 800 + Math.floor(Math.random() * 2500),
    propertyType: type,
    listingType: isRent ? "rent" : "sale",
    images: propertyImages[i % propertyImages.length],
    description: descriptions[i % descriptions.length],
    amenities: amenitiesSets[i % amenitiesSets.length],
    agent: agents[i % agents.length],
    yearBuilt: 1990 + Math.floor(Math.random() * 34),
    featured: i < 6,
  };
});

export const getPropertyById = (id: string): Property | undefined =>
  properties.find((p) => p.id === id);

export const formatPrice = (price: number, listingType: "sale" | "rent"): string => {
  if (listingType === "rent") {
    return `$${price.toLocaleString()}/mo`;
  }
  return `$${price.toLocaleString()}`;
};
