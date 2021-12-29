import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
export const StyledAccountCircleRoundedIcon = styled(AccountCircleRoundedIcon)<{
  mobilebreakpoint: string;
}>`
  display: none;
  @media screen and (min-width: ${(props) => props.mobilebreakpoint}) {
    display: inherit;
  }
`;

export const StyledTypography = styled(Typography)<{
  mobilebreakpoint: string;
}>`
  display: none;
  @media screen and (min-width: ${(props) => props.mobilebreakpoint}) {
    display: inherit;
  }
`;
