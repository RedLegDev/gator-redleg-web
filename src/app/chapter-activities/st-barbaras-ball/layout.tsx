import { SubNav } from "@/components/SubNav";
import { ST_BARBARAS_BALL_NAV } from "@/lib/nav";

export default function BallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNav items={ST_BARBARAS_BALL_NAV} />
      {children}
    </>
  );
}
