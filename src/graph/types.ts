export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Cafe {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
}

export interface Review {
  id: string;
  rating: number;
  review: string;
  drink: string;
  time: string;
}
