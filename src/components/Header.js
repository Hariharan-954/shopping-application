import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

export default function Header({setIsBlurred}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  const isActive = (path) => location.pathname === path;

  const handleLogOut = () => {
    localStorage.removeItem("isAuthenticated");
    setIsLogoutDialogOpen(false); 
    setIsBlurred(false)
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setIsLogoutDialogOpen(false); 
    setIsBlurred(false)
  };

  const openLogoutDialog = () => {
    setIsBlurred(true)
    setIsLogoutDialogOpen(true); 
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // backgroundColor: isLogoutDialogOpen ? "rgba(0, 0, 0, 0.5)" : "#F7F7F7", // Add a dim effect when dialog is open
        filter: isLogoutDialogOpen ? "blur(5px)" : "none", // Blur effect for background
        transition: "filter 0.3s ease-in-out",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => navigate("/products")}
              sx={{
                textTransform: "none",
                backgroundColor: isActive("/products") ? "#5506bb" : "inherit",
                color: isActive("/products") ? "white" : "black",
                "&:hover": {
                  backgroundColor: "lightgray",
                  color: "black",
                },
              }}
            >
              Products
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => navigate("/cart")}
              sx={{
                textTransform: "none",
                backgroundColor: isActive("/cart") ? "#5506bb" : "inherit",
                color: isActive("/cart") ? "white" : "black",
                "&:hover": {
                  backgroundColor: "lightgray",
                  color: "black",
                },
              }}
            >
              Cart
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => navigate("/wishList")}
              sx={{
                textTransform: "none",
                backgroundColor: isActive("/wishList") ? "#5506bb" : "inherit",
                color: isActive("/wishList") ? "white" : "black",
                "&:hover": {
                  backgroundColor: "lightgray",
                  color: "black",
                },
              }}
            >
              WishList
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={openLogoutDialog} // Open the confirmation dialog
              sx={{
                textTransform: "none",
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#5506bb",
                  color: "white",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={isLogoutDialogOpen}
        onClose={handleCancelLogout}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}
            sx={{
              textTransform: "none",
              backgroundColor: "#5506bb",
              color: "white",
              "&:hover": {
                backgroundColor: "lightgray",
                color: "black",
              },
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleLogOut}
            sx={{
              textTransform: "none",
              backgroundColor: "#5506bb",
              color: "white",
              "&:hover": {
                backgroundColor: "lightgray",
                color: "black",
              },
            }}
            autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
