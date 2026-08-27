import React, {useEffect, useRef} from "react";
import {animate, useInView} from "motion/react";

import { FaSass, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript, IoPaperPlane } from "react-icons/io5";
import { SiJquery, SiPhp } from "react-icons/si";
import { DiReact } from "react-icons/di";

import { GrGatsbyjs } from "react-icons/gr";

import { FaLaravel } from "react-icons/fa";
import { BsWordpress, BsGit } from "react-icons/bs";

import SkillItem from "./SkillItem";

const skillItems = [
  { icon: FaHtml5, color: "text-orange-400", iconClass: "w-12", label: "HTML" },
  { icon: FaCss3Alt, color: "text-blue-400", iconClass: "w-12", label: "CSS" },
  { icon: IoLogoJavascript, color: "text-yellow-400", label: "JS-ES6" },
  { icon: FaSass, color: "text-pink-300", label: "SCSS" },
  {
    icon: SiJquery,
    color: "text-blue-400",
    iconClass: "w-12",
    label: "jQuery",
  },
  { icon: SiPhp, color: "text-blue-400", label: "PHP" },
  { icon: DiReact, color: "text-blue-400", label: "React.js" },
  {
    icon: GrGatsbyjs,
    color: "text-purple-400",
    iconClass: "w-11",
    label: "Gatsby",
  },
  {
    icon: FaLaravel,
    color: "text-red-400",
    iconClass: "w-12",
    label: "Laravel",
  },
  {
    icon: BsWordpress,
    color: "text-blue-400",
    iconClass: "w-12",
    label: "WordPress",
  },
  { icon: BsGit, color: "text-orange-400", iconClass: "w-12", label: "Git" },
];

const Skills = () => {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !scrollRef.current) return;
    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const controls = animate(0, [0, maxScroll, 0], {
      duration: 1.5,
      ease: "easeInOut",
      onUpdate: (v) => {
        el.scrollLeft = v;
      },
    });
    return () => controls.stop();
  }, [isInView]);

  return (
    <section className="relative rounded-xl overflow-hidden pt-16 md:pt-20">
      <h2 className="font-bold font-header text-4xl lg:text-4xl">Skills</h2>
      <div className="pt-6 mx-auto bg-white min-w-0 dark:bg-black dark:highlight-white/5">
        <div
          ref={scrollRef}
          className="overflow-x-auto flex gap-8 pb-3"
        >
          {skillItems.map((item) => (
            <SkillItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
