import Countdown from "react-countdown";
const time = new Date("April 11, 2024 11:59:59").getTime();
function convertToDoubleDigit(number) {
  // Check if the number is less than 10
  if (number < 10) {
    // Prefix '0' to the number and return it as a string
    return "0" + number;
  } else {
    // If the number is already double-digit, return it as a string
    return "" + number;
  }
}
const Timer = ({regOpen, setRegOpen}) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setRegOpen(false);
      // Render a completed state
      return <span className="text-2xl font-bold">Registrations Closed</span>;
    }
    // Render a countdown
    return (
      <div className="flex w-full gap-5 justify-center uppercase text-white">
        <span className="flex flex-col items-center">
          <p className="text-2xl font-bold"> {convertToDoubleDigit(days)}</p>
          <p>days</p>
        </span>
        <span>:</span>
        <span className="flex flex-col items-center">
          <p className="text-2xl font-bold"> {convertToDoubleDigit(hours)}</p>
          <p>hours</p>
        </span>
        <span>:</span>
        <span className="flex flex-col items-center">
          <p className="text-2xl font-bold"> {convertToDoubleDigit(minutes)}</p>
          <p>minutes</p>
        </span>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={`${regOpen ? "" : "hidden"} capitalize text-2xl font-bold`}>
        Registration closes in
      </h1>
      <Countdown className="text-5xl" date={time} renderer={renderer} />
    </div>
  );
};

export default Timer;
