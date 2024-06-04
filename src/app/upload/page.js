"use client";
import React, { useRef, useEffect, useState } from "react";
import MenuLayout from "../components/layout";
import { ApiError } from "next/dist/server/api-utils";

export default function Upload() {
  const fileRef = useRef()
  const API_URL = "http://127.0.0.1:8000/api"
  const [batchId, setBatchId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [batchDetail, setBatchDetail] = useState({})


  function handleForm(e) {
    e.preventDefault();
    if (isLoading) return
    const inputFile = fileRef.current
    const file = inputFile.files[0]
    if (!file) return;

    const formData = new FormData()
    formData.append('mycsv', file)

    setIsLoading(true)
    fetch(`${API_URL}/upload`, {method:'post', body:formData})
      .then(res => res.json())
      .then(data => {
        setBatchId(data.id)
        setIsLoading(false)
      })
  }

  function batchDetails(id = null) {
    const  currentId = id ?? batchId
    fetch(`${API_URL}/batch?id=${currentId}`)
      .then(res => res.json())
      .then(data => {
        setBatchDetail(data)
        console.log(progressInterval.current);
        if (data.progress > 100) {
          clearInterval(progressInterval.current)
        }
      })
  }

  const progressInterval = useRef("")

  function updateProgress() {
    if (progressInterval.current !== "") return;
    progressInterval.current = setInterval(() => {
      batchDetails()
    }, 2000);
  }

  useEffect(() => {
    if (batchId != null) {
      updateProgress()
    }
  }, [batchId]);

  useEffect(() => {
    fetch(`${API_URL}/batch/progress`)
      .then(res => res.json())
      .then(data => setBatchId(data.id))
  }, []);

  return (
    <MenuLayout>
      {typeof batchDetail.progress !== "undefined" && 
      <section>
        <div>
          <p className="flex justify-center mb-2">Upload is in Progress</p>
          <div className="w-full h-4 rounded-lg shadow-inner border mb-2">
            <div className="bg-blue-800 w-full h-4 rounded-lg" style={{width:`${batchDetail.progress}%`}}></div>
          </div>  
          <p className="flex justify-center">{batchDetail.progress} % Complete</p>
        </div>
      </section>
      }

{typeof batchDetail.progress === "undefined" && 
      <section>
      <div className="mx-auto my-4">
        <h1 className="text-xl text-gray-800 text-center mb-5">Upload Your file</h1>
        <form className="border rounded p-4" onSubmit={handleForm}>
            <input type="file" ref={fileRef}/>
          <input type="submit" value="Upload" className={`px-4 py-2 bg-gray-700 rounded text-white ${isLoading ? `bg-gray-400 outline-none` : `bg-gray-700`}`}/>
        </form>
      </div>
      </section>
      }
    </MenuLayout>
  );
}
