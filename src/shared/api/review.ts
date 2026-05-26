import { ReviewOrder, ReviewResponse } from "@/shared/types/api.types";

export const getReviewsById = async (
  id: string,
  page: number = 1,
  order: ReviewOrder = "DATE_DESC",
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2.2/films/${id}/reviews?page=${page}&order=${order}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
    },
  );
  const response: ReviewResponse = await data.json();
  return response;
};
