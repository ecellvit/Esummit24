import Link from "next/link";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const Hamburger = ({ setShowHamburger, showHamburger }) => {
  useLockBodyScroll();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        className="h-screen fixed z-20 top-0 flex flex-col items-center w-full bg-black bg-opacity-10 backdrop-blur-md"
      >
        <div className="absolute top-0 left-0 p-5 font-bold text-4xl">
          <RxCross2
            onClick={() => {
              setShowHamburger(false);
            }}
          />
        </div>
        <ul className="flex flex-col h-full items-center justify-around my-20 gap-5 uppercase text-4xl">
          <Link href={"/"}>
            <li className="cursor-pointer">home</li>
          </Link>
          <Link href={"/"}>
            <li>about</li>
          </Link>
          <Link href={"/"}>
            <li>schedule</li>
          </Link>
          <Link href={"/"}>
            <li>speakers</li>
          </Link>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hamburger;
