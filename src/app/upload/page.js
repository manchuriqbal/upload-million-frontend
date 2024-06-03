import React from "react";
import MenuLayout from "../components/layout";

export default function Upload() {
  return (
    <MenuLayout>
      <div className="mx-auto my-4">
        <h1 className="text-xl text-gray-800 text-center mb-5">Upload Your file</h1>
        <form className="border rounded p-4">
            <input type="file" name=""/>
          <input type="submit" value="Upload" className="px-4 py-2 bg-gray-700 rounded text-white"/>
        </form>
      </div>
    </MenuLayout>
  );
}
