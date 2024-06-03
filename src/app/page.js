import React from "react";
import MenuLayout from "./components/layout.js";

export default function Index() {
  return (
      <MenuLayout>
        <div className="mx-auto my-4">
          <h1 className="text-3xl text-center my-4">Laravel Job Batching</h1>
          <h2 className="text-xl text-gray-500 text-center ">Welcome to Upload Million Records</h2>
        </div>
      </MenuLayout>
  )
}