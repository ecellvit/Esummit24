import Image from "next/image";

const Card = ({ image, name, pos }) => {
  return (
    <div className=" h-72 w-56 m-4 bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] rounded-lg ">
      <div className="overflow-hidden h-2/3 rounded-lg">
        <Image className="h-full w-full" src={image} />
      </div>
      <div className="text-black h-1/3 flex flex-col justify-center">
        <h1 className="text-center text-2xl font-bold leading-tight">{name}</h1>
        <h1 className="text-center text-xl font-semibold leading-tight">{pos}</h1>
      </div>
    </div>
  );
};

export default Card;
