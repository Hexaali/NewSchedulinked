"use client";

import dynamic from "next/dynamic";

const ClientSideRouter = dynamic(() => import("./ClientSideRouter"), {
  ssr: false,
});

export default function CatchAllPage() {
  return <ClientSideRouter />;
}
