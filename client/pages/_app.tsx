import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="container home-wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
