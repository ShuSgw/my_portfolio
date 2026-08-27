import React from "react";
import TimelineItem from "../../timeline/TimelineItem";
import { v4 as uuidv4 } from "uuid";
import { motion } from "motion/react";
import { fadeUp, staggerParent } from "../frontMotion";

const Experience = ({ timelines }) => {
  return (
    <motion.section
      className="relative rounded-xl overflow-hidden pt-16 md:pt-20"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className="font-bold font-header text-4xl lg:text-4xl"
        variants={fadeUp}
      >
        Experiences
      </motion.h2>
      {timelines.map((eachExp) => (
        <TimelineItem key={uuidv4()} eachExp={eachExp} />
      ))}
    </motion.section>
  );
};

export default Experience;
