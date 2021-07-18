import React, { useEffect, useState } from "react";

const Clock = () => {
  const findTime = () => {
    if (typeof window !== "undefined") {
      const day = new window.Date();
      return `${day.getHours() < 10 ? "0" + day.getHours() : day.getHours()}:${
        day.getMinutes() < 10 ? "0" + day.getMinutes() : day.getMinutes()
      }:${day.getSeconds() < 10 ? "0" + day.getSeconds() : day.getSeconds()}`;
    } else {
      return "";
    }
  };
  const [time, setTime] = useState(findTime());
  const [inter, setInter] = useState<any>(null);
  useEffect(() => {
    if (!inter) {
      setInter(setInterval(() => setTime(findTime()), 1000));
    }
  }, [inter]);
  return (
    <button className="btn btn-warning">
      <strong>{time}</strong>
    </button>
  );
};

export default Clock;
