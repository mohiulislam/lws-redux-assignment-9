import React from "react";

function Project({ project: { projectName, colorClass } }) {
  return (
    <div className="checkbox-container">
      <input type="checkbox" className={colorClass} />
      <p className="label">{projectName}</p>
    </div>
  );
}

export default Project;
