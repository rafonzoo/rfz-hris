"use server";

import { signIn } from "@/auth";
import { Routes, RoutesRedirection } from "@/shared/enum";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function verifyUser(formData: FormData) {
  try {
    await signIn("credentials", formData);
    revalidatePath(Routes.Signin);
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${RoutesRedirection.Unauthorized}?error=${error.type}`);
    }
    throw error;
  }
}
