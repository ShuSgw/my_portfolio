import React from "react";
import SideNavItem from "./SideNavItem";
import SideNavISocial from "./SideNavISocial";

import { AiOutlineCloseSquare } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const SideNav = ({ slideToggle }) => {
  const lniks = [
    {
      route: `/`,
      title: `Home`,
    },
    {
      route: `/worklist/1`,
      title: `Works`,
    },
    {
      route: `/contact`,
      title: `Contact`,
    },
  ];
  const exLniks = [
    {
      url: `https://github.com/ShuSgw`,
      title: `Github`,
    },
    ,
    {
      url: `https://www.linkedin.com/in/shusgw/`,
      title: `LinkedIn`,
    },
    {
      url: `https://twitter.com/shusgw`,
      title: `X (Twitter)`,
    },
  ];

  return (
    <div className="bg-white h-full z-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-[250px] md:w-[400px] overflow-y-auto text-center">
        <div className="text-xl">
          <div className="p-2.5 mt-1 flex items-center justify-end">
            <AiOutlineCloseSquare
              className="text-4xl cursor-pointer"
              onClick={() => {
                slideToggle(false);
              }}
            />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <ul className="">
          {lniks.map((link) => (
            <SideNavItem key={uuidv4()} link={link} />
          ))}
        </ul>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
        <ul className="">
          {exLniks.map((exLink) => (
            <SideNavISocial key={uuidv4()} link={exLink} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
