import AddressButton from "@/components/custom/AddressButton";
import Pool from "@/components/custom/Pool";
import { FadeInUp } from "@/components/custom/ScrollAnimation";

function page() {
  return (
    <div className="bg-black text-white p-4 sm:p-6 md:p-10 space-y-8 md:space-y-16 min-h-dch">
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
          Dawg Pools
        </h1>
        <p className="text-xl text-[#ACACAC] md:leading-[35px] max-w-[560px] text-center">
          This is for all the dwags, this is for all the grinders on X,
          spreading good vibes and energy, believing in a brighter day and a
          brighter future.
        </p>
        <AddressButton />
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:gap-12 max-w-screen-lg mx-auto">
        {[1, 2, 3, 4].map((_, index) => (
          <FadeInUp key={index}>
            <Pool />
          </FadeInUp>
        ))}
      </div>
    </div>
  );
}

export default page;
