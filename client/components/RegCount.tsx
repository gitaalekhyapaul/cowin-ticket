import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import APIService from "../utils/api";

const RegCount = () => {
  const countTickets = async (currentCount: number) => {
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
      try {
        const { data } = await API.get(`/api/v1/tickets/get?date=${date}`);
        return (data.tickets as Array<any>).length;
      } catch (err) {
        if (err.response && typeof err.response.data === "string") {
          toast.error(err.response.data);
        } else if (
          err.response &&
          typeof err.response.data.success !== "undefined"
        ) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Cannot Connect to Backend API!");
        }
        return currentCount;
      }
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
          const newCount = await countTickets(count);
          setCount(newCount);
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
