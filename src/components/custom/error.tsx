"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  statusCode: number;
  message: string;
};

export default function Error({ statusCode, message }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error(message);
  }, [message]);

  return (
    <div className="flex flex-col h-screen justify-center items-center space-y-4">
      <h1 className="font-bold text-6xl">{statusCode}</h1>
      <p className="text-muted-foreground">{message}</p>
      <Button variant={"outline"} onClick={() => router.refresh()}>
        Refresh
      </Button>
    </div>
  );
}
