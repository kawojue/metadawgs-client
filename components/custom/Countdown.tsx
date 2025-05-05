import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string | number | Date;
  isComing: boolean;
}

const CountdownTimer = ({ targetDate, isComing }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    interface ParsedDateInput {
      dateInput: string | number | Date | undefined;
    }

    const parseTargetDate = (dateInput: ParsedDateInput["dateInput"]): Date => {
      if (!dateInput) return new Date();

      const parsedDate = new Date(dateInput);

      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }

      if (/^\d{10}$/.test(dateInput.toString())) {
        return new Date(parseInt(dateInput.toString()) * 1000);
      }

      if (/^\d{13}$/.test(dateInput.toString())) {
        return new Date(parseInt(dateInput.toString()));
      }

      return new Date();
    };

    const targetDateTime = parseTargetDate(targetDate);

    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDateTime.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const padWithZero = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  if (isComing) {
    return (
      <div className="text-center p-4">
        <p className="text-xl font-bold capitalize font-fredoka">TO BE ANNOUNCED</p>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="text-center p-4">
        <p className="text-xl font-bold capitalize font-fredoka">Countdown timeout!</p>
      </div>
    );
  }

  return (
    <div className="countdown grid grid-cols-4 gap-4">
      <div className="grid col-span-1 rounded-2xl p-4 space-y-1 text-center shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] pool after:rounded-2xl">
        <span className="font-semibold text-xl font-fredoka sm:text-lg">
          {padWithZero(timeRemaining.days)}
        </span>
        <span className="text-sm sm:hidden">D</span>
        <span className="text-sm hidden sm:inline">Days</span>
      </div>
      <div className="grid col-span-1 rounded-2xl p-4 space-y-1 text-center shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] pool after:rounded-2xl">
        <span className="font-semibold text-xl font-fredoka sm:text-lg">
          {padWithZero(timeRemaining.hours)}
        </span>
        <span className="text-sm sm:hidden">H</span>
        <span className="text-sm hidden sm:inline">Hours</span>
      </div>
      <div className="grid col-span-1 rounded-2xl p-4 space-y-1 text-center shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] pool after:rounded-2xl">
        <span className="font-semibold text-xl font-fredoka sm:text-lg">
          {padWithZero(timeRemaining.minutes)}
        </span>
        <span className="text-sm sm:hidden">M</span>
        <span className="text-sm hidden sm:inline">Minutes</span>
      </div>
      <div className="grid col-span-1 rounded-2xl p-4 space-y-1 text-center shadow-[inset_0px_-4px_3px_0px_rgba(0,0,0,0.4)] pool after:rounded-2xl">
        <span className="font-semibold text-xl font-fredoka sm:text-lg">
          {padWithZero(timeRemaining.seconds)}
        </span>
        <span className="text-sm sm:hidden">S</span>
        <span className="text-sm hidden sm:inline">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
