import React, { Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Loading from "../components/Layouts/Loading";
import Navbar from "../components/Navbar";
import Preview from "../components/Preview";

import Pricing from "../components/Pricing";
import Steps from "../components/Steps";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  
  
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
       
          <Navbar />
          <Hero />
          <Preview />
          <Footer />
        </>
      )}
    </Fragment>
  );
};

export default Home;
