import React from "react";
// import "../styles/global.css";
import {graphql} from "gatsby";
import {useI18next, useTranslation} from "gatsby-plugin-react-i18next";

import Layout from "../components/global/layout/Layout";
import SEO from "../components/seo";

const Contact = () => {
  const {languages, originalPath, language} = useI18next();
  const {t} = useTranslation();

  const langInfo = {
    languages,
    originalPath,
  };

  const seoTitle = language === "en" ? "Contact - sgw_studio" : "問い合わせ - sgw_studio";
  const seoDescription =
    language === "en"
      ? "Get in touch with Shuhei, a web developer based in Japan."
      : "お問い合わせはこちらから。";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} lang={language} />
      <Layout langInfo={langInfo}>
        <div className="font-bold font-header text-4xl lg:text-4xl">
          Contact
        </div>
        <p className="pt-6 font-body leading-relaxed text-grey-20">
          {t("contactPage")}
        </p>
      </Layout>
    </>
  );
};

export const indexLang = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
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

export default Contact;
