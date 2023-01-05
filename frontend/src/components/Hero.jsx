import React from "react";
import hero from "../images/hero.png";
import Steps from "./Steps";

const Hero = () => {
  return (


    <>
     
      <div class="p-10 mb-20">
        <div >
          <div class="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <h1 class="my-4 text-3xl md:text-5xl  font-bold leading-tight text-center md:text-left">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-blue-600 to-gray-500">
                  Get Your Portfolio to sell yourself!
                </span>
              </h1>
              <p class="leading-normal text-gray-400 md:text-2xl mb-8 text-center md:text-left">
                we build your portfolio page and provide a sharable link to it
                <br/>
                Your chances of getting HIRED will be 10X if you have an online
                portfolio to display your skills and projects.
              </p>
            </div>

            <div class="w-full xl:w-3/5 p-12 overflow-hidden">
              <img
                class="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
                src={hero}
              />
            </div>

            
          </div>
        </div>
        
      </div>
      <Steps />
    </>
   
  );
};

export default Hero;
