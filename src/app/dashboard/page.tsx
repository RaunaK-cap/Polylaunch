import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const userLabel = session.user?.email ?? session.user?.name ?? "User";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">PolyLaunch Dashboard</h1>
          <p className="truncate text-sm text-muted-foreground">Signed in as {userLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
          <SignOutButton />
        </div>
      </header>

      <Card className="rounded-2xl border-border/80">
        <CardHeader>
          <CardTitle>Generate launch assets</CardTitle>
          <CardDescription>
            Upload a product photo and run launch-kit generation. This remains a placeholder flow.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="product-photo">Product photo</Label>
            <Input id="product-photo" type="file" accept="image/*" />
          </div>
          <Button disabled>Generate launch kit</Button>
          <p className="text-xs text-muted-foreground">
            Next step: connect generation and localization outputs to your pipeline.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
