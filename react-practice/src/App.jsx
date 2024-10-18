import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Fragment } from "react";

export const App = () => {
  return (
    <Fragment className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Body />
      <Footer />
    </Fragment>
  );
};
