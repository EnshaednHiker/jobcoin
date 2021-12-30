import { FC, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import { useRouter } from "next/router";

import { StyledLink } from "./StyledLink";
import { StyledAccountCircleRoundedIcon, StyledTypography } from "./styles";
import { NavigationBarProps } from "./types";
export const NavigationBar: FC<NavigationBarProps> = ({ mobileBreakpoint }) => {
  const router = useRouter();

  const handleLogoutClick = useCallback(() => {
    router.push("/");
    // TODO: execute logout logic
  }, [router]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link aria-label="home" href="/" passHref>
            {/* Wrapped in a div as a hack to silence a ref forwarding error: https://github.com/vercel/next.js/issues/7915 */}
            <div>
              <StyledLink />
            </div>
          </Link>
          {/* TODO: Make Jobcoin Sender dynamic from API call */}
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Jobcoin Sender
          </Typography>
          <StyledAccountCircleRoundedIcon
            fontSize="large"
            mobilebreakpoint={mobileBreakpoint}
            sx={{ mr: "0.5rem" }}
          />
          {/* TODO: add logic looking at whether it's logged in */}
          {/* Added margin bottom because Buttons in MaterialUI are not vertically centered depending on which font you use, https://github.com/mui-org/material-ui/issues/13926 */}
          <StyledTypography
            mobilebreakpoint={mobileBreakpoint}
            sx={{ mb: "0.125rem", mr: "1rem" }}
            variant="body1"
          >
            Signed in
          </StyledTypography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
