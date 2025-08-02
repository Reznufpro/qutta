import { BusinessCoordinates } from "./business";

export interface Favorites {
  id: string;
  name: string;
  rating: number;
  tag: "Recommended" | "New" | "Popular" | "Open Now";
  image: string[];
  coordinates: BusinessCoordinates;
}
