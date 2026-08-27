import React from "react";
import { Link } from "gatsby";
import { motion } from "motion/react";
import CardImage from "./CardImage";

const MotionLink = motion(Link);

const Card = ({ ttl, excerpt, featuredImage, uri, date, tags }) => {
  const tagColor = (tech) => {
    const colors = {
      blue: "bg-blue-200 text-blue-700",
      green: "bg-green-200 text-green-700",
      orange: "bg-orange-200 text-orange-700",
      red: "bg-red-200 text-red-700",
      white: "bg-slate-300 text-gray-700",
    };

    tech = tech.toLowerCase();
    let result = "";
    if (tech == "html") {
      result = colors.white;
    } else if (tech == "css") {
      result = colors.red;
    } else if (tech == "scss") {
      result = colors.red;
    } else if (tech == "php") {
      result = colors.blue;
    } else if (tech == "wordpress") {
      result = colors.blue;
    } else if (tech == "javascript") {
      result = colors.orange;
    } else if (tech == "jquery") {
      result = colors.orange;
    } else if (tech == "react") {
      result = colors.orange;
    } else {
      result = colors.blue;
    }

    return result;
  };
  return (
    <>
      <MotionLink
        to={`/works${uri}`}
        className="w-full mt-5 mx-auto max-w-lg flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-none hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CardImage featuredImage={featuredImage} />
        <div className="flex flex-col p-4 leading-normal md:w-full">
          <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ttl}
          </h5>
          <div className="flex items-center space-x-2 text-sm">{date}</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${tagColor(
                  tag.name,
                )} rounded-full`}
                key={tag.name}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <p
            className="mb-3 mt-3 font-normal text-gray-700 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </MotionLink>
    </>
  );
};

export default Card;
