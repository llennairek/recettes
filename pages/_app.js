import Layout from "../src/components/layout/Layout";

import "../styles/globals.css";
import "../styles/animations.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
