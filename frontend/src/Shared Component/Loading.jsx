import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center ">
      <span className=" text-6xl loading loading-infinity loading-xl text-black"></span>
      <div>আরেহ একটু অপেক্ষা করো না ...</div>
    </div>
  );
}
