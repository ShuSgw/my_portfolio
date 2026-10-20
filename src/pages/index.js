import React from "react";
// import "../styles/global.css";
import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

import Hero from "../components/frontSections/hero/Hero";
import Layout from "../components/global/layout/Layout";
import Skills from "../components/frontSections/skills/Skills";
import About from "../components/frontSections/about/About";
import WorksCarousel from "../components/frontSections/works/WorksCarousel";
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
        <WorksCarousel posts={data.allWpPost?.edges ?? []} lang={language} />
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
    allWpPost(limit: 10, sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          uri
          date
          tags {
            nodes {
              name
            }
          }
          english {
            englishTitle
            englishExcerpt
          }
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 80
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    width: 600
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
