import { redirect } from 'next/navigation'
import { RoutesRedirection } from '@/lib/enum'
import { verifyUser } from '@/modules/user/user.action'
import { auth } from '@/modules/user/user.auth'

export default async function SigninPage() {
  const session = await auth()
  if (session) {
    return redirect(RoutesRedirection.Authorized)
  }
  return (
    <form action={verifyUser}>
      <label>
        Email
        <input name="email" type="email" autoComplete="off" />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="off" />
      </label>
      <button type="submit">Sign In</button>
    </form>
  )
}
