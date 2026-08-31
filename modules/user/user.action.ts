'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { ErrorCode, Routes, RoutesRedirection } from '@/lib/enum'
import { createResponseError, createResponseSuccess } from '@/lib/utils'
import { signIn } from '@/modules/user/user.auth'
import { prisma } from '@/prisma'

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

export async function getUserEmployee(email?: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { employee: true },
  })

  if (!user) {
    return createResponseError(ErrorCode.UserNotFound)
  }

  return createResponseSuccess(user)
}
