import React from "react";
import {motion} from "motion/react";
import {
  PiStarFill,
  PiUserGearFill,
  PiCodeFill,
  PiToolboxFill,
} from "react-icons/pi";

const COMPANY_ICON_OVERRIDES = {
  "HRC Education Canada": PiToolboxFill,
};

const getJobIcon = (eachExp) => {
  if (COMPANY_ICON_OVERRIDES[eachExp.company]) {
    return COMPANY_ICON_OVERRIDES[eachExp.company];
  }
  const jobTitle = eachExp.jobTitle || "";
  if (/リード|lead/i.test(jobTitle)) return PiStarFill;
  if (/管理|admin|担当/i.test(jobTitle)) return PiUserGearFill;
  return PiCodeFill;
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const TimelineItem = ({ eachExp }) => {
  const JobIcon = getJobIcon(eachExp);
  return (
    <motion.div className="py-10 border-b border-gray-300" variants={item}>
      <span className="block font-body font-bold text-grey-40">
        {eachExp.company}
      </span>
      <div className="flex items-center gap-2 pt-1">
        <JobIcon className="text-primary shrink-0" size={22} />
        <span className="block font-header text-xl font-bold text-primary">
          {eachExp.jobTitle}
        </span>
      </div>
      <div className="text-slate-500 font-bod pt-2">
        <span className="">{eachExp.area}</span>
      </div>
      <div className="text-slate-500 font-bod pt-1">
        <span className="">{eachExp.period}</span>
      </div>
      <div className="pt-2">
        <span className="block font-body">{eachExp.description}</span>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
