import { FC, useContext, useMemo } from "react";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from "@nivo/line";
import { useRouter } from "next/router";
import { format } from "date-fns";

import { AddressContext } from "context";

import { CustomSymbol } from "./CustomSymbol";
import { HistoryChartWrapper, Wrapper } from "./styles";

const SCOPE = "@jobcoin/components/HistoryChart";

export const HISTORY_CHART_TEST_IDS = {
  CHART: `${SCOPE}/Chart`,
} as const;

export const HistoryChart: FC = () => {
  const { address } = useContext(AddressContext);
  const { query } = useRouter();
  const addressName = query?.address?.toString();

  const data = useMemo(() => {
    const { transactions } = address;

    if (transactions.length === 0 || addressName === undefined) {
      return undefined;
    }

    let initialAmount = parseInt(address.transactions[0].amount, 10);

    const dataPoints = transactions.map((transaction, index) => {
      const { amount, toAddress } = transaction;
      const amountNumber = parseInt(amount, 10);

      const position = index + 1;
      // the first transaction is always the initial amount
      if (index === 0) {
        return { x: position, y: initialAmount };
      } else if (toAddress === addressName && index > 0) {
        initialAmount = initialAmount + amountNumber;
        return { x: position, y: initialAmount };
      } else {
        initialAmount = initialAmount - amountNumber;
        return { x: position, y: initialAmount };
      }
    });

    return dataPoints;
  }, [address, addressName]);

  if (data === undefined) {
    return (
      <Typography
        component="h2"
        textAlign="center"
        sx={{ mt: "2rem", color: "#333333" }}
        variant="h5"
      >
        No Jobcoin Transaction History
      </Typography>
    );
  }

  return (
    <Wrapper data-testid={HISTORY_CHART_TEST_IDS.CHART}>
      <Typography
        component="h2"
        textAlign="center"
        sx={{ mt: "2rem", color: "#333333" }}
        variant="h5"
      >
        Jobcoin Transaction History
      </Typography>
      <HistoryChartWrapper>
        {/* TODO: add pagination for larger transaction sets */}
        <ResponsiveLine
          margin={{ top: 50, right: 40, bottom: 60, left: 50 }}
          animate
          enableSlices={false}
          data={[
            {
              id: "Jobcoin owner",
              data,
            },
          ]}
          xScale={{ type: "point" }}
          xFormat={(value) => {
            const transaction =
              address.transactions[parseInt(value.toString(), 10) - 1];
            const { timestamp, toAddress, fromAddress, amount } = transaction;

            const date = new Date(timestamp);

            const formattedDate = format(date, "P p");

            const xFormatValue = `${value.toString()}: ${toAddress} received ${amount} coins on ${formattedDate}`;
            if (fromAddress) {
              return `${xFormatValue} from ${fromAddress}`;
            }

            return xFormatValue;
          }}
          yFormat={(value) => `${value} coins`}
          yScale={{
            min: "auto",
            max: "auto",
            type: "linear",
            stacked: false,
          }}
          axisLeft={{
            legend: "Jobcoin total",
            legendOffset: -40,
          }}
          axisBottom={{
            tickSize: 5,
            legend: "Transactions",
            legendOffset: 30,
          }}
          curve="stepAfter"
          enablePointLabel={true}
          pointSymbol={CustomSymbol}
          pointSize={16}
          pointLabelYOffset={-12}
          pointBorderWidth={1}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]],
          }}
          // TODO: make a custom tooltip that does not obscure info when hovering on the edges of the screen
          // https://github.com/plouc/nivo/tree/master/packages/tooltip/src
          // https://www.npmjs.com/package/@nivo/tooltip
          // tooltip={(props) => {
          //   console.log("props", props);
          //   return <div>foo</div>;
          // }}
          useMesh={true}
          motionConfig="stiff"
        />
      </HistoryChartWrapper>
    </Wrapper>
  );
};
