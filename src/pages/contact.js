import React from "react";
// import "../styles/global.css";
import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/global/layout/Layout";
import SEO from "../components/seo";

const Contact = () => {
  const { languages, originalPath, language } = useI18next();
  const { t } = useTranslation();

  const langInfo = {
    languages,
    originalPath,
  };

  const seoTitle =
    language === "en" ? "Contact - sgw_studio" : "問い合わせ - sgw_studio";
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
        <div className="pt-6 flex flex-col md:flex-row md:items-start md:gap-12">
          <div className="w-full md:max-w-lg">
            <p className="font-body leading-relaxed text-grey-20">
              {t("contactPage")}
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-body font-bold mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-body focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-body font-bold mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-body focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-body font-bold mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 font-body focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                />
              </div>

              <button
                type="submit"
                className="rounded-md bg-primary px-6 py-2 font-body font-bold text-white transition hover:opacity-90"
              >
                Send
              </button>
            </form>
          </div>

          <div className="hidden md:block md:w-2/5">
            <StaticImage
              src="../../content/images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg"
              width={500}
              aspectRatio={0.72}
              alt="contact"
              placeholder="blurred"
              quality="40"
              className="rounded-lg"
            />
          </div>
        </div>
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

export default Contact;
