"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signIn, signOut, useSession } from "next-auth/react";

export function Login() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="border-black border shadow-lg flex flex-col justify-center items-center space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Sign in into your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            Github
          </Button>
        </CardContent>
        {session && (
          <button onClick={() => signOut()}>YOU ARE SIGNED IN</button>
        )}
      </Card>
    </div>
  );
}
