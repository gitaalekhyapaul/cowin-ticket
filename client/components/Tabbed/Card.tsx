import React from "react";
import { DBSchema } from "../../utils/schema";

interface ComponentProps {
  color: "warning" | "danger" | "success";
  ticket: DBSchema;
  setTicket: (t: DBSchema) => void;
  setAction: (a: string) => void;
  [x: string]: any;
}

const Card = ({
  color,
  ticket,
  setAction,
  setTicket,
  ...props
}: ComponentProps) => {
  const executeCard = (action: "vaccination" | "registration") => {
    setAction(action);
    setTicket(ticket);
  };
  return (
    <div className="col-12 col-md-6">
      <div
        className={`card ${
          color === "warning" ? "text-dark" : "text-white"
        } bg-${color} mb-3`}
      >
        <div className="card-header d-flex justify-content-between">
          <strong>{ticket.id}</strong>
          <strong>
            {color === "danger"
              ? "Non-Registered"
              : color === "success"
              ? "Vaccinated"
              : "Non-Vaccinated"}
          </strong>
        </div>
        <div
          className="card-body row w-100 m-0"
          style={{ height: "25vh", overflowY: "auto" }}
        >
          <span className="col-12">
            <p className="card-text">
              <strong>
                Name:
                <br />
              </strong>
              {ticket.name}
            </p>
          </span>
          <span className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Vaccine:
                    <br />
                  </strong>
                  {ticket.vaccine}
                </p>
              </div>
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Dose:
                    <br />
                  </strong>
                  {ticket.dose === "I" ? "1ST" : "2ND"}
                </p>
              </div>
            </div>
          </span>
          <span className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Age:
                    <br />
                  </strong>
                  {ticket.age}
                </p>
              </div>
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Gender:
                    <br />
                  </strong>
                  {ticket.gender}
                </p>
              </div>
            </div>
          </span>
          <span className="col-12">
            <p className="card-text">
              <strong>
                Address:
                <br />
              </strong>
              {ticket.address}
            </p>
          </span>
          <span className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Post Office:
                    <br />
                  </strong>
                  {ticket.po}
                </p>
              </div>
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Police Station:
                    <br />
                  </strong>
                  {ticket.ps}
                </p>
              </div>
            </div>
          </span>
          <span className="col-12">
            <div className="row">
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Pincode:
                    <br />
                  </strong>
                  {ticket.pincode}
                </p>
              </div>
              <div className="col-12 col-md-6">
                <p className="card-text">
                  <strong>
                    Mobile:
                    <br />
                  </strong>
                  {ticket.mobile}
                </p>
              </div>
            </div>
          </span>
        </div>
        <div className="card-footer d-flex justify-content-end">
          {color === "warning" ? (
            <button
              className="btn btn-success"
              onClick={() => executeCard("vaccination")}
            >
              Complete Vaccination
            </button>
          ) : (
            <button
              className="btn btn-warning"
              onClick={() => executeCard("registration")}
            >
              Complete Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
