import { FadeInUp } from "@/components/custom/ScrollAnimation";
import { tokenomics } from "@/lib/data";
import Image from "next/image";

const HomeTokenomics = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="space-y-6 md:space-y-10 p-6 md:p-20 py-15 relative">
        <h2 className="title md:text-[64px] text-3xl tracking-[-2px] font-fredoka font-semibold uppercase">
          Tokenomics
        </h2>

        <div className="grid sm:grid-cols-2 xl:gap-14 md:gap-10 gap-5">
          {tokenomics.map((token, index) => (
            <FadeInUp key={index} className="col-span-1">
              <Tokenmony token={token} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTokenomics;

interface TokenmonyProps {
  token: {
    // iconSrc: string;
    // iconAlt: string;
    title: string;
    distributions: { label: string; items: string[] }[];
  };
}

const Tokenmony: React.FC<TokenmonyProps> = ({ token }) => {
  return (
    <div className="tokenmony space-y-4 md:space-y-6">
      <div className="tile flex gap-4 items-center bg-[#FFC36C] text-black p-4 rounded-full">
        <Image
          //   src={token.iconSrc}
          src={"/images/man-icon.png"}
          className="border-3 border-black rounded-full min-w-[42px] min-h-[42px] overflow-hidden bg-black"
          //   alt={token.iconAlt}
          alt={"MetaDawgs Token"}
          width={42}
          height={42}
        />
        <p className="text-medium font-fredoka text-xl">{token.title}</p>
      </div>
      <div className="description space-y-4">
        {token.distributions.map((distribution, index) => (
          <div
            key={index}
            className="content rounded-2xl bg-white/6 text-white p-6"
          >
            <ul className="list-disc pl-5 space-y-2">
              <li className="space-y-3">
                <span className="font-medium black">{distribution.label}</span>
                <ul className="list-disc pl-5 space-y-2 pt-2">
                  {distribution.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
