"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignInBtn from "./SignInBtn";
import logo from "@/public/assets/logos/esummitLogo.svg";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0  || direction === 1) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      {showHamburger ? (
        <Hamburger
          showHamburger={showHamburger}
          setShowHamburger={setShowHamburger}
        />
      ) : (
        <>
          <motion.nav
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed top-0 bg-[#0E0E0E] bg-opacity-0 z-10 backdrop-blur-md  w-full py-5 px-5 h-16  justify-between "
          >
            <RxHamburgerMenu
              onClick={() => {
                setShowHamburger(true);
              }}
              className="text-white text-3xl font-bold block md:hidden"
            />
          </motion.nav>
          <motion.nav
            initial={{
              opacity: 1,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed top-0 bg-[#0E0E0E] bg-opacity-0 z-10 backdrop-blur-md hidden md:flex w-full py-5 px-10 h-16 items-center justify-between"
          >
            <Link href={"/"} className="h-full flex items-center">
              <Image className="h-10 w-auto px-10" src={logo} />
            </Link>
            <div>
              <ul className="flex gap-10 capitalize items-center font-semibold">
                <Link
                  href={"/"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">home</li>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"/#about"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">about</li>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"/mySchedule"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">my schedule</li>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"/ourPatrons"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">our  patrons</li>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <Link
                  href={"/#speakers"}
                  className="group text-white transition duration-300"
                >
                  <li className="cursor-pointer">speakers</li>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                </Link>
                <SignInBtn />
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
