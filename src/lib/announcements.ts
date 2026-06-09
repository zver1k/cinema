import { prisma } from "@/lib/prisma";

export async function getAnnouncements() {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return announcements;
}
