export interface Review{
    rating: number,
    comment: string,
  }

  export function createReview(rating: number, comment: string): Review {
    return {rating, comment};
  }