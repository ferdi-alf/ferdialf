import React, { memo } from "react";

const Filters = memo(() => (
  <defs>
    <filter id="co_glow_beam" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="co_glow_stub" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
));

Filters.displayName = "Filters";
export default Filters;
