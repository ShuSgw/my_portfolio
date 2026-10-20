import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import formatDate from "../../../utils/formatDate";

const tagColor = (tech) => {
  const colors = {
    blue: "bg-blue-200 text-blue-700",
    green: "bg-green-200 text-green-700",
    orange: "bg-orange-200 text-orange-700",
    red: "bg-red-200 text-red-700",
    white: "bg-slate-300 text-gray-700",
  };
  const t = (tech || "").toLowerCase();
  if (t === "html") return colors.white;
  if (t === "css" || t === "scss") return colors.red;
  if (t === "php" || t === "wordpress") return colors.blue;
  if (t === "javascript" || t === "jquery" || t === "react")
    return colors.orange;
  return colors.blue;
};

const SlideCard = ({ post, lang }) => {
  const title =
    lang === "en" && post.english?.englishTitle
      ? post.english.englishTitle
      : post.title;
  const excerpt =
    lang === "en" && post.english?.englishExcerpt
      ? post.english.englishExcerpt
      : post.excerpt;
  const date = formatDate(post.date, lang);
  const tags = post.tags?.nodes?.slice(0, 3) ?? [];
  const image =
    post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData;

  return (
    <Link
      to={`/works${post.uri}`}
      className="block h-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      {image && (
        <GatsbyImage
          image={image}
          alt={post.featuredImage?.node?.altText || title}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="flex flex-col p-4">
        <h3
          className="text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {date}
        </div>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 ${tagColor(
                  tag.name,
                )} rounded-full`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        {excerpt && (
          <p
            className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
      </div>
    </Link>
  );
};

export default SlideCard;
