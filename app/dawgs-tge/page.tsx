import Claim from "@/components/custom/ClaimBtn";
import { FadeIn } from "@/components/custom/ScrollAnimation";
import PresaleForm from "@/views/PresaleForm";

export const metadata = {
  title: "Buy $MetaDawgs Token.",
  description:
    "Join the MetaDawgs Token Generation Event and secure your $MetaDawgs tokens today",
};

function page() {
  const isComingSoon = false;

  return (
    <div className="bg-black text-white">
      <div className="p-4 sm:p-6 md:p-15 py-5 flex flex-col gap-5 justify-center items-center">
        <FadeIn>
          {isComingSoon && (
            <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
              Metadawgs Token <br />
              Generation event <br />
              is coming...
            </h1>
          )}

          {!isComingSoon && (
            <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
              Buy $MetaDawgs
              <br />
              Token Now
            </h1>
          )}
        </FadeIn>
      </div>
      <div className="flex items-center justify-center">
        <Claim />
      </div>
      <div className="box md:p-[8%] p-6 md:pt-[5%] pt-10">
        <PresaleForm isComing={isComingSoon} />
      </div>
    </div>
  );
}

export default page;
