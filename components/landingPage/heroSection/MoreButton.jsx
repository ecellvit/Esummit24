import { FaAngleDoubleDown } from "react-icons/fa";

const MoreButton = () => {
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: window.scrollY + window.innerHeight,
          behavior: "smooth",
        })
      }
    >
      <div className=" flex flex-col items-center mb-4 font-poppins">
        <FaAngleDoubleDown className="animate-bounce text-2xl" />
        <h1 className="uppercase underline text-lg underline-offset-4 text-white">learn more</h1>
      </div>
    </button>
  );
};

export default MoreButton;
