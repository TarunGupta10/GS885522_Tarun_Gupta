import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { Home, Store, Package, BarChart2 } from "lucide-react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import logo from "../assets/GsynergyLogo.svg";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 250, flexShrink: 0 }}>
      <Box sx={{ textAlign: "center", padding: "16px" }}>
        {/* Make sure the logo path is correct */}
        <img src={logo} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/stores">
            <ListItemIcon>
              <Store size={20} />
            </ListItemIcon>
            <ListItemText primary="Stores" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/sku">
            <ListItemIcon>
              <Package size={20} />
            </ListItemIcon>
            <ListItemText primary="SKUs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/planning">
            <ListItemIcon>
              <Home size={20} />
            </ListItemIcon>
            <ListItemText primary="Planning" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/chart">
            <ListItemIcon>
              <BarChart2 size={20} />
            </ListItemIcon>
            <ListItemText primary="Chart Analysis" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
