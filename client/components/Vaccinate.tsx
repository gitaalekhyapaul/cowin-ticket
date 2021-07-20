import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";

import { DBSchema } from "../utils/schema";
import { LeftTab, RightTab } from "./Tabbed";
import { TabContext } from "./Stores/TabContext";

const Vaccinate = () => {
  const tabContext = useContext(TabContext);
  const currDate = (() => {
    if (typeof window !== "undefined") {
      const day = new window.Date();
      return `${day.getDate() < 10 ? "0" + day.getDate() : day.getDate()}/${
        day.getMonth() + 1 < 10
          ? "0" + (day.getMonth() + 1)
          : day.getMonth() + 1
      }/${
        day.getFullYear() < 10 ? "0" + day.getFullYear() : day.getFullYear()
      }`;
    } else {
      return "";
    }
  })();

  const fetchTickets = async () => {
    try {
      tabContext.setAction("");
      tabContext.setTicket({});
      const { data } = (await API.get(
        `/api/v1/tickets/get?vaccinated=false&date=${currDate}`
      )) as {
        data: { success: boolean; tickets: DBSchema[] };
      };
      tabContext.setCards(data.tickets);
      toast.success("Data fetched successfully!");
    } catch (err) {
      console.dir(err.response);
      if (err.response && typeof err.response.data === "string") {
        toast.error(err.response.data);
      } else if (
        err.response &&
        typeof err.response.data.success !== "undefined"
      ) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error in fetching Tickets!");
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <div className="col-md-10 col-11">
        <div className="row mx-auto mb-5">
          <div className="col my-auto mx-auto justify-content-end d-flex">
            <div className="row">
              <h1 className="m-0">
                <strong>Vaccinate</strong>
              </h1>
            </div>
          </div>
          <div className="col my-auto">
            <button
              className="btn btn-success d-flex"
              onClick={() => fetchTickets()}
            >
              <div className="spinner-grow spinner-grow-sm text-light my-auto mx-1"></div>
              <div className="my-auto mx-1">
                <span>
                  <strong>Refresh</strong>
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="row mx-auto">
          <div
            className="col-12 col-md-8 d-flex"
            style={{
              height: "65vh",
              overflowY: "auto",
            }}
          >
            <div className="row mx-auto my-auto">
              <LeftTab />
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex mt-5 mt-md-0">
            <div className="row mx-auto my-auto w-100">
              <RightTab resetTab={fetchTickets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vaccinate;
