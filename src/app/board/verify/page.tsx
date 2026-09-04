import { redirect } from "next/navigation";

export const metadata = {
  title: "Confirm board sign-in",
  robots: { index: false, follow: false },
};

/** Magic links retired — OTP is entered on /board/login. */
export default async function BoardVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  redirect(token ? "/board/login?error=1" : "/board/login");
}
