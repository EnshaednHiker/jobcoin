import { FC } from "react";
import { ResponsiveLine } from "@nivo/line";

import { CustomSymbol } from "./CustomSymbol";
import { HistoryChartWrapper } from "./styles";

export const HistoryChart: FC = () => {
  return (
    <HistoryChartWrapper>
      <ResponsiveLine
        margin={{ top: 50, right: 40, bottom: 60, left: 50 }}
        animate
        enableSlices={false}
        data={[
          {
            id: "Jobcoin owner",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
              { x: "2018-01-08", y: 13 },
            ],
          },
        ]}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yFormat={(value) => `${value} coins`}
        yScale={{
          type: "linear",
          stacked: false,
        }}
        axisLeft={{
          legend: "Jobcoin total",
          legendOffset: -30,
        }}
        axisBottom={{
          format: "%b %d",
          tickValues: "every 2 days",
          legend: "time scale",
          legendOffset: 30,
        }}
        curve="linear"
        enablePointLabel={true}
        pointSymbol={CustomSymbol}
        pointSize={16}
        pointLabelYOffset={-12}
        pointBorderWidth={1}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        useMesh={true}
        motionConfig="stiff"
      />
    </HistoryChartWrapper>
  );
};
