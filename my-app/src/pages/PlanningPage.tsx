import { useState } from "react";
import { Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type RowData = {
  store: string;
  sku: string;
  salesUnits: number;
  price: number;
  cost: number;
};

const PlanningScreen = () => {
  const [rowData] = useState<RowData[]>([
    { store: "Nashville Melody Music Store", sku: "Rugged Utility Jacket", salesUnits: 200, price: 45, cost: 30 },
    { store: "Chicago Charm Boutique", sku: "Floral Chiffon Wrap Dress", salesUnits: 100, price: 60, cost: 25 },
    { store: "LA Urban Outfitters", sku: "Vintage Denim Jacket", salesUnits: 150, price: 70, cost: 40 },
    { store: "New York Trend Hub", sku: "Graphic Cotton T-Shirt", salesUnits: 220, price: 25, cost: 10 },
    { store: "Dallas Fashion Point", sku: "Slim Fit Chinos", salesUnits: 180, price: 50, cost: 35 },
    { store: "Seattle Outdoor Gear", sku: "Waterproof Hiking Boots", salesUnits: 90, price: 120, cost: 80 },
    { store: "San Francisco Casual Wear", sku: "Soft Knit Sweater", salesUnits: 130, price: 55, cost: 30 },
    { store: "Miami Summer Styles", sku: "Beach Linen Shirt", salesUnits: 160, price: 35, cost: 18 },
    { store: "Boston Classic Attire", sku: "Tailored Wool Blazer", salesUnits: 75, price: 150, cost: 95 },
    { store: "Denver Adventure Store", sku: "Insulated Winter Jacket", salesUnits: 85, price: 180, cost: 120 },
  ]);

  const columnDefs: ColDef<RowData>[] = [
    { field: "store", headerName: "Store", pinned: "left" },
    { field: "sku", headerName: "SKU", pinned: "left" },
    { field: "salesUnits", headerName: "Sales Units", editable: true },
    {
      headerName: "Sales Dollars",
      valueGetter: (params) =>
        params.data ? `$ ${(params.data.salesUnits * params.data.price).toFixed(2)}` : "$ 0.00",
    },
    {
      headerName: "GM Dollars",
      valueGetter: (params) =>
        params.data
          ? `$ ${((params.data.salesUnits * params.data.price) - (params.data.salesUnits * params.data.cost)).toFixed(2)}`
          : "$ 0.00",
    },
    {
      headerName: "GM %",
      valueGetter: (params) => {
        if (!params.data) return "0.00 %";
        const salesDollars = params.data.salesUnits * params.data.price;
        const gmDollars = salesDollars - params.data.salesUnits * params.data.cost;
        return salesDollars ? `${((gmDollars / salesDollars) * 100).toFixed(2)} %` : "0.00 %";
      },
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Planning Management
      </Typography>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="ag-theme-alpine" style={{ flex: 1, width: "100%" }}>
          <AgGridReact rowData={rowData} columnDefs={columnDefs} domLayout="autoHeight" suppressRowClickSelection />
        </div>
      </div>
    </div>
  );
};

export default PlanningScreen;
