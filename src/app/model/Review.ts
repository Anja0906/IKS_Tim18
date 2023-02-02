export interface ReviewSmall{
  rating: number,
  comment: string,
}

export function createReview(rating: number, comment: string): ReviewSmall {
  return {rating, comment};
}