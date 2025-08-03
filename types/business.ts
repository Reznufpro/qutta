export interface BusinessData {
  id: string;
  name: string;
  about: string;
  phone_number: string;
  rating: number;
  tag: "Recommended" | "New" | "Popular" | "Open Now";
  coordinates: BusinessCoordinates;
  image: string[];
  staff: StaffEntity[];
  services: Record<number, CategoryT>;
}

export interface BusinessCoordinates {
  latitude: number;
  longitude: number;
  location: string;
}

export interface StaffEntity {
  id: string;
  name: string;
  rating: number;
  image?: string;
}

export interface CategoryT {
  title: string;
  service: ServiceEntity[];
}

export interface ServiceEntity {
  title: string;
  time: string;
  price: number;
  description?: string;
}

export interface AvailabilityEntry {
  day: string;
  is_closed: boolean;
  open_time?: string; // "HH:mm:ss"
  close_time?: string; // "HH:mm:ss"
}
