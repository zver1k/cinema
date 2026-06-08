"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Film, MovieItem, SimilarFilm } from "@/shared/types/api.types";
import FilmCard from "@/shared/ui/film-card";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { sliderBreakpoints } from "@/shared/constants/slider-breakpoints";
import { SwiperOptions } from "swiper/types";

function CollectionSwiper({
  items,
  eagerFirstImage = false,
  breakpoints = sliderBreakpoints,
}: {
  items: Film[] | SimilarFilm[] | MovieItem[];
  eagerFirstImage?: boolean;
  breakpoints?: SwiperOptions["breakpoints"];
}) {
  return (
    <Swiper
      className="collection-swiper"
      slidesPerView={1}
      spaceBetween={10}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={breakpoints}
      modules={[Pagination, Navigation]}
    >
      {items.map((item, index) => {
        const id = "filmId" in item ? item.filmId : item.kinopoiskId;

        return (
          <SwiperSlide key={id}>
            <Link className="cursor-pointer" href={`/movies/${id}`}>
              <FilmCard film={item} eager={eagerFirstImage && index === 0} />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CollectionSwiper;
