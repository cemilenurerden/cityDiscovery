// domain/entities/Review.ts

export interface Review {
  id: string;
  venueId: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  rating: number; // 1-5
  text: string;
  createdAt: Date;
}
