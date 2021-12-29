import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

import {
  BORDER,
  BORDER_RADIUS,
  SEND_PAGE_MOBILE_BREAKPOINT,
} from "../constants";

export const Wrapper = styled.div`
  display: flex;
  margin: 2.75rem 0.875rem 4rem 2.125rem;
  flex-direction: column;

  @media screen and (min-width: ${SEND_PAGE_MOBILE_BREAKPOINT}) {
    flex-direction: inherit;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  &:nth-child(2) {
    margin-left: 0;
    width: inherits;

    @media screen and (min-width: ${SEND_PAGE_MOBILE_BREAKPOINT}) {
      margin-left: 3.375rem;
      width: 100%;
    }
  }
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

export const BoxWrapper = styled.div`
  border-radius: ${BORDER_RADIUS};
  border: ${BORDER};
  max-width: inherit;
  margin-bottom: 1.75rem;
  min-width: 14.75rem;
  width: 100%;

  @media screen and (min-width: ${SEND_PAGE_MOBILE_BREAKPOINT}) {
    max-width: 22.25rem;
    min-width: 18.75rem;
    width: inherit;
  }
`;

export const HistoryChartWrapper = styled.div`
  border-radius: ${BORDER_RADIUS};
  border: ${BORDER};
  height: 50rem;
  min-width: 14.75rem;
`;
