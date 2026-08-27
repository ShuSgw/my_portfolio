import React, { useState } from "react";
// import "../styles/global.css";
import { graphql } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/global/layout/Layout";
import SEO from "../components/seo";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjrwaj";

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

  // "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");

  const copy = {
    en: {
      send: "Send",
      sending: "Sending...",
      success: "Thanks! Your message has been sent.",
      error: "Something went wrong. Please try again or email me directly.",
    },
    ja: {
      send: "送信",
      sending: "送信中...",
      success: "送信しました。ありがとうございます。",
      error: "送信に失敗しました。時間をおいて再度お試しください。",
    },
  };
  const c = language === "en" ? copy.en : copy.ja;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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

            {status === "success" ? (
              <p className="mt-8 rounded-md border border-gray-300 bg-gray-50 px-4 py-3 font-body text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
                {c.success}
              </p>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_subject"
                  value="New contact from sgw.today"
                />

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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 font-body focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:border-gray-300"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 font-body focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:border-gray-300"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 font-body focus:border-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:border-gray-300"
                  />
                </div>

                {/* honeypot: bots fill this, humans don't */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <p className="font-body text-sm text-red-600 dark:text-red-400">
                    {c.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-md bg-gray-900 px-6 py-2 font-body font-bold text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-gray-900"
                >
                  {status === "submitting" ? c.sending : c.send}
                </button>
              </form>
            )}
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
