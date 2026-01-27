export interface Flight {
  id: string;
  destination: string;
  departureCity: string;
  departureDate: string;
  price: number;
  airline?: string;
  departureTime?: string;
  arrivalTime?: string;
}

export interface WishlistFlight extends Flight {
  addedAt: string;
  priceHistory: PricePoint[];
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface SearchParams {
  departureCity: string;
  departureDate: string;
  maxPrice: number;
}
