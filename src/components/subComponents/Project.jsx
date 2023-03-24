import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../../features/filter/filterSlice";

function Project({ project: { projectName, colorClass } }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  function handleFilter(e) {
    setChecked(!checked);
    if (checked !== true) {


      dispatch(addFilter(e.target.value));
    } else {
      dispatch(removeFilter(e.target.value));
    }
  }
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        checked={checked}
        onChange={handleFilter}
        value={projectName}
      />
      <p className="label">{projectName}</p>
    </div>
  );
}

export default Project;
