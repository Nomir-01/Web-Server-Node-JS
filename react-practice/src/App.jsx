import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useState, Fragment } from "react";

export const App = () => {
  const [counter, setCounter] = useState(0);

  const handleAddToCart = () => {
    setCounter(counter + 1);
  };
  return (
    <Fragment className="flex flex-col min-h-screen bg-gray-100">
      <Header counter={counter} />
      <Body onAddToCart={handleAddToCart} />
      <Footer />
    </Fragment>
  );
};
