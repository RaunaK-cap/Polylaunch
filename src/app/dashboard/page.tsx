import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  // const session = await auth.api.getSession({ headers: await headers() });

  // if (session) {
  //   return
  // }

  // const userLabel = session.user?.email ?? session.user?.name ?? "User";

  return <DashboardClient />;
}
