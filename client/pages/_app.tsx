import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContextProvider } from "../components/Stores/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Head>
          <title>Eve&apos;s Clinic Portal</title>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
        </Head>
        <ToastContainer
          position={"top-right"}
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
        <Navbar />
        <div className="container home-wrapper">
          <Component {...pageProps} />
        </div>
        <Footer />
      </AuthContextProvider>
    </>
  );
}
export default MyApp;
