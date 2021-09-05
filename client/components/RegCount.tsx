import React, { useEffect, useState } from "react";
import APIService from "../utils/api";

const RegCount = () => {
  const countTickets = async () => {
    if (typeof window !== "undefined") {
      const API = APIService();
      const day = new window.Date();
      const date = `${
        day.getDate() < 10 ? "0" + day.getDate() : day.getDate()
      }/${
        day.getMonth() + 1 < 10
          ? "0" + (day.getMonth() + 1)
          : day.getMonth() + 1
      }/${
        day.getFullYear() < 10 ? "0" + day.getFullYear() : day.getFullYear()
      }`;
      const { data } = await API.get(`/api/v1/tickets/get?date=${date}`);
      return (data.tickets as Array<any>).length;
    } else {
      return 0;
    }
  };
  const [count, setCount] = useState(0);
  const [inter, setInter] = useState<any>(null);
  useEffect(() => {
    if (!inter) {
      setInter(
        setInterval(async () => {
          const count = await countTickets();
          setCount(count);
        }, 1000)
      );
    }
  }, [inter]);
  return (
    <button className="btn btn-info mx-2">
      <strong>{count}</strong>
    </button>
  );
};

export default RegCount;
