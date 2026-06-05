import { PersonDetail, Staff } from "@/shared/types/api.types";
import { notFound } from "next/navigation";

export const getCastById = async (id: string): Promise<Staff[]> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/staff?filmId=${id}`,
      {
        headers: {
          "X-API-KEY": process.env.API_KEY!,
        },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!response.ok) return [];
    return (await response.json()) as Staff[];
  } catch {
    return [];
  }
};

export const getPersonById = async (id: string): Promise<PersonDetail> => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/staff/${id}`, {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) notFound();
    return (await response.json()) as PersonDetail;
  } catch {
    notFound();
  }
};
