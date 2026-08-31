import { redirect } from 'next/navigation'
import { OnboardingClient } from '@/app/(public)/onboarding/client'
import { Routes } from '@/lib/enum'
import { getCurrentEmployee } from '@/modules/user/user.action'

export default async function OnboardingPage() {
  const { data: employee } = await getCurrentEmployee()
  if (employee) {
    return redirect(Routes.Employee)
  }
  return <OnboardingClient />
}
