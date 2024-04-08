import Timer from "./Timer";
import MoreButton from "./MoreButton";
import Loader from "@/components/Loader";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const HeroSection = ({scheduleRef, regOpen, setRegOpen}) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100svh] bg-[url('/assets/landingPage/heroImage.png')] bg-cover bg-center">
      <h6 className="uppercase font-poppins text-sm lg:text-xl font-light text-white">
        e-cell vit presents
      </h6>
      <h1 className="esummit uppercase text-4xl md:text-6xl lg:text-9xl font-bold">
        e-summit&apos;24
      </h1>
      <h1 className="uppercase font-poppins text-center text-sm lg:text-xl font-light px-2 mt-5 mb-8 text-white">
        The 7<sup className="lowercase">th</sup> edition of the biggest fest in South India
      </h1>
      <div className="w-full flex font-poppins flex-col items-center justify-between gap-6 ">
        <Timer regOpen={regOpen} setRegOpen={setRegOpen}/>
        <button
          onClick={() => {
            window.scrollTo({
              top: scheduleRef.current.offsetTop,
              behavior: "smooth",
            });
          }}
          className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-[#FEFAB7] bg-transparent hover:scale-105 transition-all"
        >
          register now!!!
        </button>
        {/* <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="bg-transparent text-white flex items-center space-x-2"
        >
          <span>Aceternity UI</span>
        </HoverBorderGradient> */}
      </div>
      <div className="absolute bottom-0">
        <MoreButton />
      </div>
    </section>
  );
};

export default HeroSection;
