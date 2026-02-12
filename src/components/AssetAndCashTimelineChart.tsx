

import { AddonContext } from "@wealthfolio/addon-sdk";
import { Card, CardContent, CardHeader, CardTitle, ChartConfig, ChartContainer, EmptyPlaceholder } from "@wealthfolio/ui";
import { useState } from "react";
import { Area, AreaChart, Tooltip, YAxis } from "recharts";
import { HistoryChartData, TooltipBaseProps } from "../types";
import { CustomTooltip } from "./customTooltip";

interface AssetAndCashTimelineChartProps {
  ctx: AddonContext;
  classname: string;
  HeaderTilte: string;
  data: HistoryChartData[];
  isBalanceHidden : boolean;
  RawDataLengteEmpty: boolean;
}

export function AssetAndCashTimelineChart({ctx, classname, HeaderTilte, data, isBalanceHidden, RawDataLengteEmpty }: AssetAndCashTimelineChartProps) {

    const [isChartHovered, setIsChartHovered] = useState(false);

    const chartConfig = {
        totalValue: {
          label: "Total Value",
        },
        netContribution: {
          label: "Net Contribution",
        },
      } satisfies ChartConfig;

    if ((!data || data.length === 0) && !RawDataLengteEmpty){
        return (
            <Card className={classname}>
                <CardContent className="px-4 pt-4 pb-2">
                    <EmptyPlaceholder className="mx-auto flex max-w-[420px] items-center justify-center">
                        <EmptyPlaceholder.Icon name="Clock" />
                        <EmptyPlaceholder.Title>No transactions found within selected time range</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            Please select a different time range to see data.
                        </EmptyPlaceholder.Description>
                    </EmptyPlaceholder>
                </CardContent>
            </Card>)
    }


    if (!data || data.length === 0){
        return (
            <Card className={classname}>
                <CardContent className="px-4 pt-4 pb-2">
                    <EmptyPlaceholder className="mx-auto flex max-w-[420px] items-center justify-center">
                        <EmptyPlaceholder.Icon name="Wallet" />
                        <EmptyPlaceholder.Title>No holding selected</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            Please select a different holding or create a new one to see data.
                        </EmptyPlaceholder.Description>
                    </EmptyPlaceholder>
                </CardContent>
            </Card>)
    }


    return (
    <Card className={classname}>
        <CardHeader>
            <CardTitle className="text-xl">{HeaderTilte}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
        <div className="w-full p-0">
            <div className="flex w-full flex-col">
                <div className="h-[380px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <AreaChart
                        data={data}
                        stackOffset="sign"
                        margin={{
                        top: 40,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        }}
                        onMouseEnter={() => setIsChartHovered(true)}
                        onMouseLeave={() => setIsChartHovered(false)}
                        >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--success)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="var(--success)" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <Tooltip
                        position={{ y: 0 }}
                        content={(props) => (
                            <CustomTooltip
                                {...(props as TooltipBaseProps)}
                                isBalanceHidden={isBalanceHidden}
                                isChartHovered={isChartHovered}
                            />
                    )}
                    />
                    <YAxis hide type="number" domain={["auto", "auto"]} />
                    <Area
                        isAnimationActive={true}
                        animationDuration={300}
                        animationEasing="ease-out"
                        connectNulls={true}
                        type="monotone"
                        dataKey="totalValue"
                        stroke="var(--success)"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                    <Area
                        isAnimationActive={true}
                        animationDuration={300}
                        animationEasing="ease-out"
                        connectNulls={true}
                        type="monotone"
                        dataKey="netContribution"
                        stroke="var(--muted-foreground)"
                        fill="transparent"
                        strokeDasharray="5 5"
                        strokeOpacity={isChartHovered ? 0.8 : 0}
                    />
                    </AreaChart>
                </ChartContainer>
                </div>
            </div>
        </div>
        </CardContent>
    </Card>
    );
}
