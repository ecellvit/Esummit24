import Image from "next/image";
import { motion } from "framer-motion";
const IIACard = ({img, title, description}) => {
  return (
    <motion.div 
    initial={{y: 100, opacity: 0}}
    whileInView={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    viewport={{once: true}}
    className="flex text-white h-auto items-center gap-4 w-60 lg:w-80 my-10">
      <Image className="h-10 w-auto" src={img} />
      <div>
        <h1 className="text-2xl font-bold font-poppins bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">{title}</h1>
        <p className="font-light font-poppins">
         {description}
        </p>
      </div>
    </motion.div>
  );
};

export default IIACard;
