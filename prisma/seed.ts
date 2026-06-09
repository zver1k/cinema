import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.announcement.deleteMany();
  await prisma.announcement.createMany({
    data: [
      {
        id: crypto.randomUUID(),
        title: "Добро пожаловать!",
        message:
          "Рады видеть вас на сайте о кино. Здесь вы найдёте актуальную информацию о фильмах, рейтинги и премьеры.",
      },
      {
        id: crypto.randomUUID(),
        title: "Об авторе",
        message:
          "Меня зовут Дамир Кунакбаев, я веб-разработчик. Это мой пет-проект на основе Kinopoisk API — буду рад вашему фидбэку!",
      },
      {
        id: crypto.randomUUID(),
        title: "Как пользоваться сайтом",
        message:
          "Используйте поиск, чтобы найти фильм, или просматривайте подборки по жанрам и рейтингам.",
      },
    ],
  });
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
