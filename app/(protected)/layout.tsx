import type { RC } from '@/lib/types'
import { RedirectType, redirect } from 'next/navigation'
import { Routes, RoutesRedirection } from '@/lib/enum'
import { getUserEmployee } from '@/modules/user/user.action'
import { auth } from '@/modules/user/user.auth'

export default async function ProtectedLayout({ children }: RC) {
  const session = await auth()
  if (!session) {
    return redirect(RoutesRedirection.Unauthorized)
  }
  const { data: user } = await getUserEmployee(session.user?.email ?? void 0)
  if (!user?.employee) {
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
