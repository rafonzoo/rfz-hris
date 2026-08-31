import type { RC } from '@/lib/types'
import { redirect } from 'next/navigation'
import { RoutesRedirection } from '@/lib/enum'
import { auth } from '@/modules/user/user.auth'

export default async function ProtectedLayout({ children }: RC) {
  const session = await auth()
  if (!session) {
    return redirect(RoutesRedirection.Unauthorized)
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
