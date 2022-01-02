import { FC, useCallback, useContext, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "context";
import { StyledLink } from "./StyledLink";
import { StyledAccountCircleRoundedIcon, StyledTypography } from "./styles";

const MOBILE_BREAKPOINT = "31.25rem";

const SCOPE = "@jobcoin/components/NavigationBar";

export const NAVIGATION_BAR_TEST_IDS = {
  SIGN_OUT_BUTTON: `${SCOPE}/SignOutButton`,
} as const;

export const NavigationBar: FC = () => {
  const router = useRouter();
  const value = useContext(AddressContext);

  const addressName = useMemo(() => {
    return value.address?.transactions[0]
      ? value.address.transactions[0].toAddress
      : "";
  }, [value]);

  const handleLogoutClick = useCallback(() => {
    router.push("/");
    value.setAddress(DEFAULT_ADDRESS_VALUE);
  }, [router, value]);

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
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {addressName}
          </Typography>
          <StyledAccountCircleRoundedIcon
            fontSize="large"
            mobilebreakpoint={MOBILE_BREAKPOINT}
            sx={{ mr: "0.5rem" }}
          />
          {/* TODO: add logic looking at whether it's logged in */}
          {/* Added margin bottom because Buttons in MaterialUI are not vertically centered depending on which font you use, https://github.com/mui-org/material-ui/issues/13926 */}
          <StyledTypography
            mobilebreakpoint={MOBILE_BREAKPOINT}
            sx={{ mb: "0.125rem", mr: "1rem" }}
            variant="body1"
          >
            Signed in
          </StyledTypography>

          <Button
            color="inherit"
            data-testid={NAVIGATION_BAR_TEST_IDS.SIGN_OUT_BUTTON}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
