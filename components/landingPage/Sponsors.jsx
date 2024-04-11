import { motion } from "framer-motion";
import Image from "next/image";
import mu from "@/public/assets/landingPage/sponsors/mu.png"
export default function Sponsors() {
  return (
    <section className="px-10 md:px-20 bg-[#0E0E0E]">
      <div className="flex items-center pt-10 pb-5 text-center">
        <h1 className="uppercase w-full md:w-fit text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          sponsors
        </h1>
        <div className="hidden md:block w-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, delay: 0.5 }}
            className="hidden md:block h-0.5 w-full ml-8 bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]"
          ></motion.div>
        </div>
      </div>
      <div className="h-fit flex justify-center pt-20">
        <div>
          <Image className="h-14 w-auto" src={mu}/>
        </div>
      </div>
    </section>
  );
}
