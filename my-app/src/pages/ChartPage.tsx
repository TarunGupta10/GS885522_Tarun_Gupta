import { useState, useEffect } from "react";
import { Container, Typography, MenuItem, Select, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line } from "recharts";

const weeks = ["W01", "W02", "W03", "W04", "W05", "W06", "W07", "W08", "W09", "W10", "W11", "W12", "W13", "W14", "W15", "W16", "W17", "W18", "W19", "W20", "W21", "W22", "W23", "W24", "W25", "W26", "W27", "W28", "W29", "W30", "W31", "W32", "W33", "W34", "W35", "W36", "W37", "W38", "W39", "W40", "W41", "W42", "W43", "W44", "W45", "W46", "W47", "W48", "W49", "W50", "W51", "W52"];

const ChartPage = () => {
  const [selectedStore, setSelectedStore] = useState("San Francisco Bay Trends");
  const [chartData, setChartData] = useState<{ week: string; gmDollars: number; gmPercent: number }[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("planningData");
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    const storeData = parsedData.filter((row: { store: string; [key: string]: any }) => row.store === selectedStore);

    const aggregatedData = weeks.map((week) => {
      let totalGMDollars = 0;
      let totalSalesDollars = 0;

      storeData.forEach((row: { [key: string]: any }) => {
        totalGMDollars += row[`${week}-GMDollars`] || 0;
        totalSalesDollars += row[`${week}-SalesDollars`] || 0;
      });

      return {
        week,
        gmDollars: totalGMDollars,
        gmPercent: totalSalesDollars > 0 ? (totalGMDollars / totalSalesDollars) * 100 : 0,
      };
    });

    setChartData(aggregatedData);
  }, [selectedStore]);

  return (
    <Container sx={{ backgroundColor: "#333", padding: 3, borderRadius: 2, minHeight: "100vh", minWidth: "100vw", color: "white", display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
        <Select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          sx={{ backgroundColor: "white", color: "black", borderRadius: 1 }}
        >
          <MenuItem value="San Francisco Bay Trends">San Francisco Bay Trends</MenuItem>
          <MenuItem value="Los Angeles Trends">Los Angeles Trends</MenuItem>
          <MenuItem value="New York Trends">New York Trends</MenuItem>
        </Select>
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        Gross Margin
      </Typography>

      <Box sx={{ flexGrow: 1, height: 500 }}>
  <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="week" stroke="white" />
            <YAxis yAxisId="left" stroke="white" label={{ value: "GM Dollars", angle: -90, position: "insideLeft", fill: "white" }} />
            <YAxis yAxisId="right" orientation="right" stroke="white" label={{ value: "GM %", angle: 90, position: "insideRight", fill: "white" }} />
            <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} contentStyle={{ backgroundColor: "#222", color: "white" }} />
            <Legend wrapperStyle={{ color: "white" }} />
            <Bar yAxisId="left" dataKey="gmDollars" fill="#4A90E2" name="GM Dollars" />
            <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#FF7300" name="GM %" strokeWidth={2} dot={false} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default ChartPage; 