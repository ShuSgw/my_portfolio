import React from "react";
// import "../styles/global.css";
import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

import Hero from "../components/frontSections/hero/Hero";
import Layout from "../components/global/layout/Layout";
import Skills from "../components/frontSections/skills/Skills";
import About from "../components/frontSections/about/About";
import SEO from "../components/seo";

import Experience from "../components/frontSections/experience/Experience";

const IndexPage = ({ data }) => {
  const { languages, originalPath, language } = useI18next();
  const { t } = useTranslation();

  const langInfo = {
    languages,
    originalPath,
  };

  const seoTitle = language === "en" ? "sgw_studio" : "sgw_studio";
  const seoDescription =
    language === "en"
      ? "My Portfolio website"
      : "ワードプレスが得意なフロントエンド開発者。";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} lang={languages} />
      <Layout langInfo={langInfo}>
        <Hero
          subHead={t("frontPage.subHead")}
          cvLabel={t("frontPage.viewCv")}
        />
        <About aboutMe={t("frontPage.aboutMe")} />
        <Skills />
        <Experience
          timelines={t("frontPage.timeline", { returnObjects: true })}
        />
      </Layout>
    </>
  );
};

export const indexLang = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default IndexPage;
