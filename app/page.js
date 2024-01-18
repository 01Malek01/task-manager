import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="main flex flex-col items-center justify-center relative top-[200px] w-[50%] mx-auto">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-3xl text-center">
          Welcome to the Task Manager
        </h1>
          <Link className="btn btn-primary w-[100%] mt-5 text-xl md:h-[60px] md:text-2xl lg:text-xl lg:h-[60px] md:w-[50%]" href="/Tasks">
            Get Started
          </Link>
      </div>
    </main>
  );
}
