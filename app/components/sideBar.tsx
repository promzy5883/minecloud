"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { sideBarLinks } from "./data";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Logo from "./logo";

export default function SideBar({ left, onClick }: any) {
  const pathname = usePathname();

  const checkPath = (path: any) => {
    let value = true;
    if (path === "/about" && pathname === "/about") return value;
    if (path === "/favourite" && pathname === "/favourite") return value;
    if (path === "/" && pathname !== "/about" && pathname !== "/favourite")
      return value;
  };

  return (
    <div
      style={{ left: left }}
      className="w-twoFifteen h-[80vh] max-[670px]:h-[77vh] duration-300 max-[670px]:absolute max-[670px]:z-50 bg-white rounded-lg border border-solid border-black/10 flex flex-col justify-between p-3.5"
    >
      <div className="w-full flex flex-col gap-1">
        <div className=" gap-1.5 w-twoFifteen max-[670px]:flex hidden pb-2 items-center">
          <Logo />
          <p className="font-medium text-sm pt-2">minecloud</p>
        </div>
        {sideBarLinks.map((item) => {
          return (
            <Link
              onClick={onClick}
              href={item.path}
              key={item.name}
              className="p-[8px] flex justify-between items-center rounded"
              style={{
                color: `${
                  checkPath(item.path) ? "rgb(29,78,216)" : "rgba(0,0,0,0.89)"
                }`,
                backgroundColor: `${
                  checkPath(item.path) ? "rgba(125,211,252,0.2)" : "transparent"
                }`,
              }}
            >
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-inherit w-3.5 h-3.5"
                />
                <p className="text-sm ">{item.name}</p>
              </div>
              {item.iconTwo && (
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={item.iconTwo}
                    className="w-3 h-3 text-black/70"
                  />
                </div>
              )}
            </Link>
          );
        })}
        <Link
          onClick={onClick}
          href={"/about"}
          className="p-[8px] max-[770px]:flex justify-between items-center rounded hidden"
          style={{
            color: `${
              checkPath("/about") ? "rgb(29,78,216)" : "rgba(0,0,0,0.89)"
            }`,
            backgroundColor: `${
              checkPath("/about") ? "rgba(125,211,252,0.2)" : "transparent"
            }`,
          }}
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-inherit w-3.5 h-3.5"
            />
            <p className="text-sm ">About</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
