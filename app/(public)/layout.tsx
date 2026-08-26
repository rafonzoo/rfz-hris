import { auth } from "@/auth";
import { RoutesRedirection } from "@/shared/enum";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: {
  children?: ReactNode;
}) {
  const session = await auth();
  if (session) {
    return redirect(RoutesRedirection.Authorized);
  }
  return children;
}
