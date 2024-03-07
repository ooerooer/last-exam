import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-[20px] p-24">
      <h1 className="text-[30px]">This Home page</h1>
      <Link href={"/auth"}>go to auth page click here</Link>
    </main>
  );
}