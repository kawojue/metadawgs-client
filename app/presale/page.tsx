import { FadeIn } from "@/components/custom/ScrollAnimation";
import PresaleForm from "@/views/PresaleForm";

function Page() {
  return (
    <div className="bg-black text-white">
      <div className="p-4 sm:p-6 md:p-15 py-5 flex flex-col gap-5 justify-center items-center">
        <FadeIn>
          <h1 className="title md:text-[76px] sm:text-6xl text-4xl tracking-[-2px] font-fredoka font-bold uppercase text-center">
            Buy $MetaDawgs
            <br />
            Token Now
          </h1>
        </FadeIn>
      </div>
      <div className="box md:p-[10%] p-6 md:pt-[5%] pt-10">
        <PresaleForm />
      </div>
    </div>
  );
}

export default Page;
