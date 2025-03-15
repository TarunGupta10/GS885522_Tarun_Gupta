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

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const StoresPage = () => {
  const [stores, setStores] = useState<Store[]>([
    { id: 1, name: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { id: 2, name: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { id: 3, name: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
    { id: 4, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: 5, name: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
    { id: 6, name: "Seattle Outdoor Gear", city: "Seattle", state: "WA" },
    { id: 7, name: "Denver Mountain Goods", city: "Denver", state: "CO" },
    { id: 8, name: "Miami Beachwear", city: "Miami", state: "FL" },
    { id: 9, name: "Chicago Sports Hub", city: "Chicago", state: "IL" },
    { id: 10, name: "Boston Tech Zone", city: "Boston", state: "MA" },
  ]);

  const [open, setOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

  const handleOpen = (store: Store | null) => {
    setCurrentStore(store || { id: stores.length + 1, name: "", city: "", state: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentStore(null);
    setOpen(false);
  };

  const handleSave = () => {
    if (!currentStore) return;

    setStores((prevStores) =>
      prevStores.some((store) => store.id === currentStore.id)
        ? prevStores.map((store) => (store.id === currentStore.id ? currentStore : store))
        : [...prevStores, { ...currentStore, id: prevStores.length + 1 }]
    );

    handleClose();
  };

  const handleDelete = (id: number) => {
    setStores((prevStores) => prevStores.filter((store) => store.id !== id));
  };

  return (
    <Container sx={{ width: "100vw", height: "100vh", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stores Management
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(store)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(store.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>{store.id}</TableCell>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.city}</TableCell>
                <TableCell>{store.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        onClick={() => handleOpen(null)}
        sx={{
          marginTop: 2,
          marginBottom: 2,
          backgroundColor: "#FD3DB5", // Light Pink
          color: "black",
          "&:hover": { backgroundColor: "#FFB6C1" }, // Slightly darker pink on hover
        }}
        startIcon={<Add />}
      >
        Add Store
      </Button>

      {/* Dialog for Add/Edit Store */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentStore?.id ? "Edit Store" : "Add Store"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Store Name"
            value={currentStore?.name || ""}
            onChange={(e) => setCurrentStore((prev) => ({ ...prev!, name: e.target.value }))}
          />
          <TextField
            fullWidth
            margin="dense"
            label="City"
            value={currentStore?.city || ""}
            onChange={(e) => setCurrentStore((prev) => ({ ...prev!, city: e.target.value }))}
          />
          <TextField
            fullWidth
            margin="dense"
            label="State"
            value={currentStore?.state || ""}
            onChange={(e) => setCurrentStore((prev) => ({ ...prev!, state: e.target.value }))}
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

export default StoresPage;
