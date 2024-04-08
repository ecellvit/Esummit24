import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import Marq from "./Marq";

export const Footer = () => {
  return (
    <>
      <footer className="flex flex-col-reverse md:flex-row bg-[url('/assets/landingPage/footer/bg.png')] bg-cover items-center gap-10 md:gap-0 px-5 sm:px-10 ms:px-20 justify-between py-5">
        <div className="flex gap-10">
          <ul className="hidden md:flex uppercase flex-col gap-2">
            <Link href={"/"}><li>home</li></Link>
            <Link href={"/#about"}><li>about</li></Link>
            <Link href={"/#schedule"}><li>schedule</li></Link>
            <Link href={"/#speakers"}><li>speaker</li></Link>
          </ul>
          <div className="uppercase flex flex-col gap-2">
            <p className="text-lg font-semibold m-0">community</p>
            <div className="flex flex-col gap-2">
              <Link
                href={"https://instagram.com/ecell_vit/"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <RiInstagramFill />
                <p className="text-sm">Instagram</p>
              </Link>
              <Link
                href={"https://twitter.com/ecell_vit"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaSquareXTwitter />
                <p className="text-sm">Twitter</p>
              </Link>
              <Link
                href={"https://www.linkedin.com/company/ecellvitvellore"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaLinkedin />
                <p className="text-sm">Linkedin</p>
              </Link>
              <Link
                href={"https://www.facebook.com/ecellvit/"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaSquareFacebook />
                <p className="text-sm">Facebook</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h1 className="text-5xl sm:text-7xl font-bold">E-CELL</h1>
            <p className="font-semibold">#WeBreedBusiness</p>
          </div>
          <div>
            <div className="flex flex-col text-sm gap-1">
              <Link
                className="flex items-center gap-2 justify-center"
                href={"tel:+916306311799"}
              >
                <span>
                  <BiSolidPhoneCall />
                </span>
                +91 6306311799
              </Link>
              <Link
                className="flex items-center gap-2 justify-center"
                href={"mailto:ecell@vit.ac.in"}
              >
                <span>
                  <IoMdMail />
                </span>
                ecell@vit.ac.in
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Marq />
    </>
  );
};
