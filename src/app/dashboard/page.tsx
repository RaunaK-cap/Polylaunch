import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">
            Product Generator
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            Signed in as {userLabel}
          </p>
        </div>
        <SignOutButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate ad-ready product images</CardTitle>
          <CardDescription>
            Upload a product photo and we’ll generate ad images (placeholder UI for now).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="product-photo">Product photo</Label>
            <Input id="product-photo" type="file" accept="image/*" />
          </div>

          <Button disabled>Generate images</Button>
          <p className="text-xs text-muted-foreground">
            Next step: connect this to your image generation pipeline.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
