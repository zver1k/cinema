"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function PosterImage({
  src,
  alt,
  sizes,
  loading,
}: {
  src: string;
  alt: string;
  sizes: string;
  loading?: "lazy" | "eager";
}) {
  const [errorLoadingImage, setErrorLoadingImage] = useState<boolean>(false);
  return (
    <>
      <Image
        onError={() => setErrorLoadingImage(true)}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        unoptimized
        className={`object-cover ${errorLoadingImage ? "hidden" : ""}`}
      />
      {errorLoadingImage && (
        <div className="absolute flex flex-col gap-2 items-center justify-center inset-0 bg-muted">
          <ImageOff size={32} />
          <span>Нет постера</span>
        </div>
      )}
    </>
  );
}

export default PosterImage;
