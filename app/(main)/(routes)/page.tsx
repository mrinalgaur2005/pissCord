import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <p className="text-3xl font-bold text-red-600">
      <UserButton afterSwitchSessionUrl="/"/>
      <ModeToggle/>
    </p>
  );
}
