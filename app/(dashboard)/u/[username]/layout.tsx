import React from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getSelfByUsername } from "@/lib/auth-service";
import { Container } from "./_components/container";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function CreatorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const self = await getSelfByUsername(username);
  if (!self) redirect("/");

  return (
    <div className="flex h-full pt-20">
      <Container>{children}</Container>
    </div>
  );
}
