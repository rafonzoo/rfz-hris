import type { RC } from '@/lib/types'
import { RedirectType, redirect } from 'next/navigation'
import { Routes } from '@/lib/enum'
import { getCurrentEmployee } from '@/modules/user/user.action'

export default async function ProtectedLayout({ children }: RC) {
  const { data: employee } = await getCurrentEmployee()
  if (!employee) {
    return redirect(Routes.Onboarding, RedirectType.replace)
  }
  return (
    <>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr]">
        <aside className="hidden md:flex md:flex-col">sad</aside>
        <main>{children}</main>
      </div>
      <nav className="sticky h-11 md:hidden flex w-full items-center">nav</nav>
    </>
  )
}
