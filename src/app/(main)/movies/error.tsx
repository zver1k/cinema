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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center">
      <h2>Что-то случилось, попробуйте позже!</h2>
      <Button onClick={() => unstable_retry()}>Загрузить снова</Button>
    </div>
  );
}

export default Error;
