import Image from "next/image";
import { Inter } from "next/font/google";
import { HomeLogin } from "@/components/home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // <main className={`flex h-screen w-screen flex-col items-center justify-between p-24 border border-cyan-600`}>
    <main className={`h-screen w-screen flex items-center justify-center bg-gray-800`}>
      <HomeLogin />
    </main>
  );
}
