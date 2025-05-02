import Image from "next/image";

const Feature = ({
  feature,
}: {
  feature: {
    title: string;
    description: string;
    icon: string;
  };
}) => {
  return (
    <div className="min-w-[250px] max-w-sm rounded-2xl text-center pool col-span-1 sm:aspect-square after:rounded-2xl text-white p-6 md:p-8 flex flex-col gap-4 justify-center items-center">
      <div className="icon mx-auto">
        <Image src={feature.icon} width={100} height={100} alt="icon" />
      </div>
      <h3 className="title font-semibold font-fredoka text-2xl">
        {feature.title}
      </h3>
      <p className="text-[#ACACAC] text-xl">{feature.description}</p>
    </div>
  );
};

export default Feature;
