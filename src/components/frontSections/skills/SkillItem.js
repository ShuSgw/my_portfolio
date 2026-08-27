import React from "react";

const SkillItem = ({ icon: Icon, color, label, iconClass }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Icon className={`${iconClass || ""} text-6xl ${color}`} />
      <strong className="text-slate-900 text-xs font-medium dark:text-slate-200">
        {label}
      </strong>
    </div>
  );
};

export default SkillItem;
