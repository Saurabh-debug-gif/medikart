import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/Context/StoreContext";

const Navbar = ({ setShowLogin, showLogin }) => {
  const [type, setType] = useState("home");
  const { getCartCount, user, logout } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to a section smoothly
  const handleScroll = (e, id, newType) => {
    e.preventDefault();
    setType(newType);
    const doScroll = () => {
      if (id === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const section = document.querySelector(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      // allow route transition before querying DOM
      setTimeout(doScroll, 50);
    } else {
      doScroll();
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", color: "black", boxShadow: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={assets.logo}
              alt="Logo"
              style={{ height: 40, marginRight: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              Clitoria Life Science
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            color={type === "home" ? "primary" : "inherit"}
            onClick={(e) => handleScroll(e, "#home", "home")}
          >
            Home
          </Button>
          <Button
            color={type === "type" ? "primary" : "inherit"}
            onClick={(e) => handleScroll(e, "#explore-type", "type")}
          >
            Type
          </Button>
          <Button
            color={type === "mobile-app" ? "primary" : "inherit"}
            onClick={(e) => handleScroll(e, "#app-download", "mobile-app")}
          >
            Mobile App
          </Button>
          <Button
            color={type === "contact-us" ? "primary" : "inherit"}
            onClick={(e) => handleScroll(e, "#footer", "contact-us")}
          >
            Contact Us
          </Button>
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <SearchIcon />
          </IconButton>

          <Link to="/cart">
            <IconButton>
              <Badge badgeContent={getCartCount()} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </Link>

          {!showLogin && !user && (
            <Button
              onClick={() => setShowLogin(true)}
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
          {user && (
            <Button
              onClick={logout}
              variant="outlined"
              color="primary"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
