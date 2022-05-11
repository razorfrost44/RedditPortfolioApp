import React from "react";

export function SubReddit({ className, displayName, handleClick, icon }) {
  return (
    <article className={className}>
      <button type="button" onClick={handleClick}>
        <img src={icon} alt={displayName} className="icon" />
        {displayName}
      </button>
    </article>
  );
}
