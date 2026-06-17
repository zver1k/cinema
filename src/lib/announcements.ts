import { prisma } from "@/lib/prisma";

export async function getAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return announcements;
  } catch (error) {
    console.log(error);
    return [];
  }
}
