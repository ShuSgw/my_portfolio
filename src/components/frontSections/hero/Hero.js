import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { PiHandWavingFill } from "react-icons/pi";
import { motion } from "motion/react";
import { fadeUp, staggerParent } from "../frontMotion";

const Hero = ({ subHead }) => {
  return (
    <>
      <motion.div
        className="flex flex-col items-center md:flex-row md:justify-between md:space-x-10"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex-initial w-4/5 max-w-xs md:w-2/5 md:max-w-none"
          variants={fadeUp}
        >
          <StaticImage
            src="../../../../content/images/face.png"
            width={600}
            alt="profile"
            placeholder="blurred"
            quality="40"
          />
        </motion.div>
        <motion.div
          className="w-full flex-initial mt-5 md:mt-0 md:w-3/5"
          variants={staggerParent}
        >
          <motion.div
            className="flex gap-2 text-5xl font-extrabold leading-tighter tracking-tighter mb-1 md:text-6xl"
            variants={fadeUp}
          >
            Hello
            <PiHandWavingFill
              className="block animate-wave text-[#F9DCBD]"
              stroke="#000000"
              strokeWidth={6}
              role="img"
              aria-label="waving hand"
            />
          </motion.div>
          <motion.div
            className="text-5xl font-extrabold leading-tighter tracking-tighter mb-2 md:text-6xl md:mb-5"
            variants={fadeUp}
          >
            I'm Shuhei,
          </motion.div>
          <motion.div
            className="max-w-3xl mb-3 text-2xl font-bold"
            variants={fadeUp}
          >
            a web developer based in Japan.
          </motion.div>
          <motion.p variants={fadeUp}>{subHead}</motion.p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Hero;
