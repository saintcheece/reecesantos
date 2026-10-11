// import Navbar from "./Navbar";
import Vertigo from "../effects/Vertigo";

/** Fixed title screen. The page content scrolls over it like a curtain. */
export default function Hero() {
  return (
    <header id="top" className="fixed inset-0 -z-10 flex justify-center overflow-hidden">
      <Vertigo />
      <div className="relative flex w-full max-w-[calc(914px+2.5rem)] flex-col px-5">
        {/* <Navbar /> */}
        <div className="flex h-[59.5vh] flex-col justify-end">
          <h1 className="text-5xl leading-[1.2] font-black text-dark sm:text-7xl md:text-[5rem]">reece santos</h1>
          <p className="text-xl text-dark sm:text-[2rem]">development / graphic design</p>
        </div>
      </div>
    </header>
  );
}
