import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="col-md-10 col-11 mx-auto text-center">
        <h1>404</h1>
        <br />
        <h2>Page Not Found.</h2>
        <br />
        <Link href="/" passHref>
          <button className="btn btn-secondary">
            <strong className="display-6">Go Home</strong>
          </button>
        </Link>
      </div>
    </>
  );
};
export default NotFound;
