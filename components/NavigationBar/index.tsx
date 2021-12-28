import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import { useRouter } from "next/router";

import { StyledLink } from "./StyledLink";

export const NavigationBar = () => {
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
            <StyledLink />
          </Link>
          {/* TODO: Make Jobcoin Sender dynamic from API call */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jobcoin Sender
          </Typography>
          <AccountCircleRoundedIcon fontSize="large" sx={{ mr: "1rem" }} />
          {/* TODO: add logic looking at whether it's logged in */}
          {/* Added margin bottom because Buttons in MaterialUI are not vertically centered depending on which font you use, https://github.com/mui-org/material-ui/issues/13926 */}
          <Typography variant="body1" sx={{ mb: "2px", mr: "2rem" }}>
            Signed in
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
