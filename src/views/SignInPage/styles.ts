import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import AnchorIcon from "@mui/icons-material/Anchor";

import { BORDER, BORDER_RADIUS } from "../../constants";

export const StyledAnchorIcon = styled(AnchorIcon)`
  color: #333333;
  height: auto;
  margin: 4rem 0 5rem;
  width: 8.5rem;
`;

export const StyledTypography = styled(Typography)`
  border-bottom: ${BORDER};
  color: #333333;
  padding: 1.875rem 1rem;
`;

export const StyledForm = styled.form`
  margin: 2.375rem auto 3rem;
  padding: 0 1rem;
  max-width: 18.75rem;
`;

export const SignInWrapper = styled.div`
  border-radius: ${BORDER_RADIUS};
  border: ${BORDER};
  margin: 0 1rem;
  max-width: 29.375rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
