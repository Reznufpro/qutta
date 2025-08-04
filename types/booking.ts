export interface BookingReturnType {
  business: {
    id: string;
    name: string;
    image: any[];
    rating: number;
    phone_number: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
      location: string;
    };
  };
  service: {
    title: string;
    time: string;
    price: number;
    description?: string;
  }[];
  staff?: {
    id: string;
    name: string;
    rating?: number;
    image?: any;
  };
  dateTime: string;
  createdAt: string;
  total: number | null;
  status: "confirmed" | "cancelled";
}

export interface OwnerBookingReturnType {
  client: {
    name: string;
  };
  business_name: string;
  created_at: string;
  datetime: string;
  status: "confirmed" | "cancelled";
  total: number;
  id: string;
  service: {
    title: string;
    time: string;
    price: number;
  }[];
  staff?: {
    id: string;
    name: string;
    rating?: number;
    image?: any;
  };
}

export interface clientList {
  clients?: ClientsEntity[] | null;
}

export interface ClientsEntity {
  email: string;
  id: string;
  lastName: string;
  name: string;
}
