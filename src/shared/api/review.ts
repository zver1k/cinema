import { ReviewOrder, ReviewResponse } from "@/shared/types/api.types";

export const getReviewsById = async (
  id: string,
  page: number = 1,
  order: ReviewOrder = "DATE_DESC",
): Promise<ReviewResponse> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v2.2/films/${id}/reviews?page=${page}&order=${order}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok)
      return {
        items: [],
        total: 0,
        totalPages: 0,
        totalPositiveReviews: 0,
        totalNegativeReviews: 0,
        totalNeutralReviews: 0,
      };
    return await response.json();
  } catch {
    return {
      items: [],
      total: 0,
      totalPages: 0,
      totalPositiveReviews: 0,
      totalNegativeReviews: 0,
      totalNeutralReviews: 0,
    };
  }
};
