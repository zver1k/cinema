"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center">
      <h2>Что-то случилось, попробуйте позже!</h2>
      <Button onClick={() => unstable_retry()}>Загрузить снова</Button>
      <p>{error.digest ? `Код ошибки: ${error.digest}` : ""}</p>
    </div>
  );
}

export default Error;
