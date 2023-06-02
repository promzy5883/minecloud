"use client";
import { usePathname } from "next/navigation";
import { databases } from "../appwrite/appwriteConfig";
import { useState, useEffect } from "react";

export default function FolderModal({ createFolder, canceled }: any) {
  const [folderName, setFolderName] = useState("");
  const [error, setError]: any = useState("");
  const invalidCharacters = "!@#$%^&*()";
  const [sibilings, setSiblings]: any = useState([]);
  const [transform, setTransform] = useState("translateY(-8px)");
  const [opacity, setOpacity] = useState(0);
  const pathname = usePathname();

  const checkSiblings = () => {
    return sibilings.find((item: any) => item.folder[0] === folderName)
      ? false
      : true;
  };

  const handleCreateFolder = () => {
    let myString = "";
    if (folderName === "") {
      setError("Field Cannot be empty");
      return;
    }
    for (let character of invalidCharacters) {
      if (folderName.includes(character)) {
        setError("Invalid Character");
        return;
      }
    }
    if (!checkSiblings()) {
      setError("Folder already exist");
      return;
    }
    for (let a of folderName) {
      if (a !== " ") {
        myString += a;
      }
    }
    createFolder(myString);
    setFolderName("");
  };

  useEffect(() => {
    setError("");
  }, [folderName]);

  useEffect(() => {
    setOpacity(1);
    setTimeout(() => {
      setTransform("translateY(0px)");
    }, 300);
  }, []);

  useEffect(() => {
    const promise = databases.listDocuments(
      "64748082e458885cc1dd",
      "64748089ef99c41ad0b2"
    );
    promise.then(
      (response) =>
        setSiblings(
          response.documents.filter((item) => item.folder[1] === pathname)
        ),
      (err) => console.log(err)
    );
  }, [pathname]);

  return (
    <div className="w-full z-50 h-screen absolute top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.1)]">
      <div
        style={{ transform: transform, opacity: opacity }}
        className="flex flex-col gap-2 duration-700 rounded bg-white w-[250px] p-3"
      >
        <p className="text-xs text-[rgba(0,0,0,0.8)] font-medium">
          Folder Name
        </p>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full py-2 outline-none pl-2 rounded bg-white border border-solid border-[rgba(0,0,0,0.1)] text-xs text-[rgba(0,0,0,0.8)]"
        />
        {error !== "" && (
          <p style={{ color: "red" }} className="text-xs">
            {error}
          </p>
        )}
        <div className=" flex justify-between w-full items-center">
          <button
            onClick={() => {
              setFolderName("");
              canceled();
            }}
            className="w-[48%] py-2 border border-solid hover:scale-105 border-[rgba(0,0,0,0.1)] text-[rgba(0,0,0,0.8)] text-xs rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateFolder}
            className="w-[48%] py-2 bg-blue-700 hover:scale-105 border-none text-white text-xs rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}