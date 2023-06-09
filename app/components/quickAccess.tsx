"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { databases } from "@/lib/appwriteConfig";
import config from "@/config";

export default function QuickAccess({ changed, email }: any) {
  const [allFolders, setAllFolders]: any = useState(null);

  const listFolders = () => {
    const promise = databases.listDocuments(
      config.databaseId,
      config.collectionId
    );
    promise.then(
      (response: any) => {
        setAllFolders(
          response.documents.filter(
            (item: any) => item.folder[1] === "/" && item.folder[2] === email
          )
        );
      },
      (err: any) => console.log(err)
    );
  };

  useEffect(() => {
    listFolders();
  }, [changed]);

  return (
    <>
      <div
        id="quickAccess"
        className="pt-3.5 flex gap-3.5 overflow-x-scroll h-[19vh]"
      >
        {allFolders &&
          allFolders.map((item: any) => {
            return (
              <Link href={`/${item.folder[0]}`} key={item.folder[0]}>
                <div className="box-border w-40 p-3.5 rounded-md border border-solid border-black/10">
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="w-4 h-4 text-blue-700"
                  />
                  <p className="pt-3.5 text-xs font-semibold">
                    {item.folder[0].length !== 19 && item.folder[0]}
                    {item.folder[0].length >= 19 &&
                      item.folder[0].slice(0, 19) + "..."}
                  </p>
                </div>
              </Link>
            );
          })}
        {!allFolders ||
          (allFolders.length === 0 && (
            <p className="text-sm font-medium text-black/70">No Folder</p>
          ))}
      </div>
    </>
  );
}
