import { motion } from "framer-motion";
const Temp = () => {
  return (
    <section id="speakers" className="sm:px-5 md:px-20 w-full flex bg-[#0E0E0E] flex-col items-center justify-center">
      <div className="flex items-center w-full pt-10 pb-5 text-center">
        <h1 className="uppercase w-full text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          meet our speakers
        </h1>
        <div className="hidden md:block w-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, delay: 0.5 }}
            className="hidden md:block h-0.5 w-full bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]"
          ></motion.div>
        </div>
      </div>
      <div className="min-h-72 w-4/5 flex items-center justify-center rounded-lg bg-gradient-to-b from-[#ffffff00] via-[#fefab730] to-[#d69a3f20] p-1 border-2 border-[#D6993F] m-12">
        <h1 className="uppercase mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center">
          coming soon!
        </h1>
      </div>
    </section>
  );
};

export default Temp;
