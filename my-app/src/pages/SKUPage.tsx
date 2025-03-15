import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

interface SKU {
  name: string;
  price: number;
  cost: number;
}

const SKUPage = () => {
  const [skus, setSKUs] = useState<SKU[]>([  
    { name: "Cotton Polo Shirt", price: 139.99, cost: 10.78 },
    { name: "Tassel Fringe Handbag", price: 134.99, cost: 20.79 },
    { name: "Minimalist Leather Watch", price: 49.99, cost: 49.89 },
    { name: "Retro-Inspired Sunglasses", price: 194.99, cost: 115.62 },
    { name: "Chunky Heel Sandals", price: 89.99, cost: 46.70 },
    { name: "Suede Fringe Vest", price: 184.99, cost: 159.65 },
    { name: "Relaxed Fit Cargo Pants", price: 149.99, cost: 7.20 },
    { name: "Corduroy A-Line Skirt", price: 129.99, cost: 48.62 },
    { name: "Formal Dress Shoes", price: 164.99, cost: 161.69 },
    { name: "Tailored Corduroy Blazer", price: 89.99, cost: 62.99 },
  ]);

  const [open, setOpen] = useState(false);
  const [currentSKU, setCurrentSKU] = useState<SKU | null>(null);

  const handleOpen = (sku: SKU | null) => {
    setCurrentSKU(sku);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentSKU(null);
    setOpen(false);
  };

  const handleSave = () => {
    if (!currentSKU) return;
    
    setSKUs((prevSKUs) =>
      prevSKUs.includes(currentSKU)
        ? prevSKUs.map((sku) => (sku === currentSKU ? currentSKU : sku))
        : [...prevSKUs, currentSKU]
    );
    
    handleClose();
  };

  const handleDelete = (skuToDelete: SKU) => {
    setSKUs((prevSKUs) => prevSKUs.filter((sku) => sku !== skuToDelete));
  };

  return (
    <Container sx={{ width: "100vw", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        SKU Management
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Cost ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skus.map((sku, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(sku)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(sku)}>
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>{sku.name}</TableCell>
                <TableCell>{sku.price.toFixed(2)}</TableCell>
                <TableCell>{sku.cost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: "#FD3DB5", marginTop:2 , marginBottom: 2 }} 
        startIcon={<Add />} 
        onClick={() => handleOpen(null)}
      >
        Add SKU
      </Button>

      {/* Dialog for Add/Edit SKU */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSKU ? "Edit SKU" : "Add SKU"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="SKU Name"
            value={currentSKU?.name || ""}
            onChange={(e) => setCurrentSKU((prev) => ({ ...prev!, name: e.target.value }))}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price ($)"
            type="number"
            value={currentSKU?.price || ""}
            onChange={(e) => setCurrentSKU((prev) => ({ ...prev!, price: parseFloat(e.target.value) }))}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Cost ($)"
            type="number"
            value={currentSKU?.cost || ""}
            onChange={(e) => setCurrentSKU((prev) => ({ ...prev!, cost: parseFloat(e.target.value) }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SKUPage;
