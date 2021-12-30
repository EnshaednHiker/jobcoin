import { FC } from "react";

import { CustomSymbolTypes } from "./types";

export const CustomSymbol: FC<CustomSymbolTypes> = ({
  size,
  color,
  borderWidth,
  borderColor,
}) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);
