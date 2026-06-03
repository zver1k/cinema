import { PersonDetail, Staff } from "@/shared/types/api.types";
import { notFound } from "next/navigation";

export const getCastById = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/staff?filmId=${id}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (data.status === 404 || data.status === 402) return [];
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: Staff[] = await data.json();
  return response;
};

export const getPersonById = async (id: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/staff/${id}`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  if (data.status === 404 || data.status === 400 || data.status === 402)
    return notFound();
  if (!data.ok)
    throw new Error(`Ошибка: ${data.status}, подробнее: ${data.statusText}`);
  const response: PersonDetail = await data.json();
  return response;
};
