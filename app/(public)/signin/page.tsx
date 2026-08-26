import { auth } from "@/auth";
import { verifyUser } from "@/server/api/user";
import { RoutesRedirection } from "@/shared/enum";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await auth();
  if (session) {
    return redirect(RoutesRedirection.Authorized);
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
      <button>Sign In</button>
    </form>
  );
}
