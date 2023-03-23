import React from "react";

function TeamMember({ member: { name, avatar } }) {
  return (
    <div className="checkbox-container">
      <img
        src={require(`../../assets${avatar}`)}
        className="team-avater"
        alt="Avatar"
      />
      <p className="label">{name}</p>
    </div>
  );
}

export default TeamMember;
