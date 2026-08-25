import React from "react";
// import "../styles/global.css";
import SEO from "../components/seo";

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404 Not Found - sgw_studio" description="お探しのページは見つかりませんでした。" />
      <h1>このページは404ページです</h1>
      <p>アクセスしたURLに記事はありません</p>
    </>
  );
};

export default NotFoundPage;
