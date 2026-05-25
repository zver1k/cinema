"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Film } from "@/shared/types/api.types";
import FilmCard from "@/shared/ui/film-card";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

function CollectionSwiper({ items }: { items: Film[] }) {
  return (
    <Swiper
      style={{ width: "100%" }}
      slidesPerView={1}
      spaceBetween={10}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 8,
          spaceBetween: 10,
        },
      }}
      modules={[Pagination, Navigation]}
    >
      {items.map((item) => {
        return (
          <SwiperSlide key={item.kinopoiskId}>
            <Link
              className="cursor-pointer"
              href={`/films/${item.kinopoiskId}`}
            >
              <FilmCard film={item} />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CollectionSwiper;
