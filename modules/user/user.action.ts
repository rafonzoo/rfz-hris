'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { Routes, RoutesRedirection } from '@/lib/enum'
import { signIn } from '@/modules/user/user.auth'

export async function verifyUser(formData: FormData) {
  try {
    await signIn('credentials', formData)
    revalidatePath(Routes.Signin)
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${RoutesRedirection.Unauthorized}?error=${error.type}`)
    }
    throw error
  }
}
