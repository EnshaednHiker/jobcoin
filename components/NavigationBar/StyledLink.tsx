import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import AnchorIcon from "@mui/icons-material/Anchor";

// need this abstraction because Next Links can only take one child, not nested children
export const StyledLink: FC = () => (
  <IconButton
    aria-label="home"
    color="inherit"
    edge="start"
    LinkComponent={"a"}
    size="large"
    sx={{ mr: 2 }}
  >
    <AnchorIcon />
  </IconButton>
);
