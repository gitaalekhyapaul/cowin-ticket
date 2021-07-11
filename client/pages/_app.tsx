import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer 
      position={"top-right"}
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      />
      <div className="container home-wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
