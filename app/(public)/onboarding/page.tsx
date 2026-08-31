import { redirect } from 'next/navigation'
import { OnboardingClient } from '@/app/(public)/onboarding/client'
import { Routes, RoutesRedirection } from '@/lib/enum'
import { getUserEmployee } from '@/modules/user/user.action'
import { auth } from '@/modules/user/user.auth'

export default async function OnboardingPage() {
  const session = await auth()
  if (!session) {
    return redirect(RoutesRedirection.Unauthorized)
  }
  const { data: user } = await getUserEmployee(session.user?.email ?? void 0)
  if (user?.employee) {
    return redirect(Routes.Employee)
  }
  return <OnboardingClient />
}
