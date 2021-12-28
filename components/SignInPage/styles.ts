import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import AnchorIcon from "@mui/icons-material/Anchor";

export const StyledAnchorIcon = styled(AnchorIcon)`
  color: #333333;
  height: auto;
  margin: 64px 0 80px;
  width: 136px;
`;

export const StyledTypography = styled(Typography)`
  border-bottom: 0.0625rem solid #333333;
  color: #333333;
  padding: 1.875rem 1rem;
`;

export const StyledForm = styled.form`
  margin: 2.375rem auto 3rem;
  padding: 0 1rem;
  max-width: 18.75rem;
`;

export const SignInWrapper = styled.div`
  border-radius: 0.25rem;
  border: 0.0625rem solid #333333;
  margin: 0 1rem;
  max-width: 29.375rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
