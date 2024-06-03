import Card from "@/app/components/card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Notifications</div>
      <Link href="/comple-dashboard/archived">Archived</Link>
    </Card>
  )
}