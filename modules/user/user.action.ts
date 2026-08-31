'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { ErrorCode, Routes, RoutesRedirection } from '@/lib/enum'
import { createResponseError, createResponseSuccess } from '@/lib/utils'
import { auth, signIn } from '@/modules/user/user.auth'
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

/**
 * @param shouldRedirect boolean (default true)
 * @returns
 */
export async function getCurrentEmployee(shouldRedirect = true) {
  const session = await auth()
  if (!session) {
    if (shouldRedirect) {
      return redirect(Routes.Signin)
    }

    return createResponseError(ErrorCode.UserNotFound)
  }
  const employee = await prisma.employee.findUnique({
    where: { userId: session.uid },
  })

  if (!employee) {
    return createResponseError(ErrorCode.EmployeeNotFound)
  }

  return createResponseSuccess(employee)
}
