import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { motion } from "motion/react";
import { fadeUp, staggerParent, viewportOnce } from "../frontMotion";

const About = ({ aboutMe }) => {
  return (
    <motion.div
      className="flex flex-col items-center pt-16 md:pt-20 md:flex-row"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <motion.div className="w-full md:w-3/5" variants={fadeUp}>
        <div className="font-bold font-header text-4xl lg:text-4xl">
          About Me
        </div>
        <p className="pt-6 font-body leading-relaxed text-grey-20">{aboutMe}</p>
      </motion.div>
      <motion.div
        className="hidden pl-0 pt-10 md:w-2/5 md:pl-12 md:pt-0 md:block"
        variants={fadeUp}
      >
        <StaticImage
          src="../../../../content/images/charles-deluvio-DgoyKNgPiFQ-unsplash.jpg"
          width={600}
          alt="codingImage"
          placeholder="blurred"
          quality="40"
          className="w-2/4 md:w-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default About;
