"use client";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useRouter } from "next/navigation";
import { localStorageCheck } from "@/utils/localstorage.check";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const pages = ["Lab-Tests", "Appointments"];

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElAppointments, setAnchorElAppointments] = useState(null); // State for Appointments menu

  const router = useRouter();

  // Check login status and user name on mount and when localStorage changes
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorageCheck();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const name = localStorage.getItem("firstName") || "User";
        setUserName(name);
      } else {
        setUserName("");
      }
    };

    // Listen for both "storage" (other tabs) and our custom event (this tab)
    window.addEventListener("storage", checkLogin);
    window.addEventListener("localStorageChanged", checkLogin);

    checkLogin();

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("localStorageChanged", checkLogin);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenAppointmentsMenu = (event) => {
    setAnchorElAppointments(event.currentTarget);
  };

  const handleCloseAppointmentsMenu = () => {
    setAnchorElAppointments(null);
  };

  const handleNavigateTo = (path) => {
    handleCloseNavMenu(); // Close nav menu for mobile
    handleCloseAppointmentsMenu(); // Close the appointments menu
    router.push(path); // Navigate to the specified path
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.clear();
    setIsLoggedIn(false); // update state
    setUserName("");
    router.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="success"
      sx={{
        height: "80px",
        backgroundColor: "#033069",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "80px",
            alignItems: "center",
          }}
        >
          {/* Logo and Title */}
          <MedicalServicesIcon
            sx={{
              display: { xs: "none", md: "flex" },
              fontSize: "36px",
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => handleNavigateTo("/")}
          >
            HealthEase
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => {
                if (page === "Appointments") {
                  return (
                    <MenuItem key={page} onClick={handleOpenAppointmentsMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  );
                }
                if (page === "Lab-Tests") {
                  return (
                    <MenuItem
                      key={page}
                      onClick={() => handleNavigateTo("/labtest")}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  );
                }
                if (page === "Blog") {
                  return (
                    <MenuItem
                      key={page}
                      onClick={() => handleNavigateTo("/blog")}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Menu>
          </Box>

          {/* Logo and Title for Mobile */}
          <MedicalServicesIcon
            sx={{
              display: { xs: "flex", md: "none" },
              fontSize: "32px",
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HealthEase
          </Typography>

          {/* Page Names */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              if (page === "Appointments") {
                return (
                  <Button
                    key={page}
                    onClick={handleOpenAppointmentsMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    {page}
                  </Button>
                );
              }
              if (page === "Lab-Tests") {
                return (
                  <Button
                    key={page}
                    onClick={() => handleNavigateTo("/labtest")}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    {page}
                  </Button>
                );
              }
              if (page === "Blog") {
                return (
                  <Button
                    key={page}
                    onClick={() => handleNavigateTo("/blog")}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    {page}
                  </Button>
                );
              }
              return null;
            })}
          </Box>

          {/* Appointments Menu */}
          <Menu
            id="appointments-menu"
            anchorEl={anchorElAppointments}
            open={Boolean(anchorElAppointments)}
            onClose={handleCloseAppointmentsMenu}
            MenuListProps={{
              "aria-labelledby": "appointments-menu-button",
            }}
          >
            <MenuItem onClick={() => handleNavigateTo("/appointment/list")}>
              All Appointments
            </MenuItem>
            <MenuItem onClick={() => handleNavigateTo("/appointment/pending")}>
              Pending Appointments
            </MenuItem>
            <MenuItem onClick={() => handleNavigateTo("/appointment/approved")}>
              Approved Appointments
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigateTo("/appointment/cancelled")}
            >
              Cancelled Appointments
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigateTo("/appointment/completed")}
            >
              Completed Appointments
            </MenuItem>
          </Menu>

          {/* User Avatar and Menu */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#033069", width: 48, height: 48 }}>
                    <AccountCircleSharpIcon sx={{ fontSize: 36 }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography sx={{ textAlign: "center" }}>
                    Hi, {userName}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box className="flex ">
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  fontSize: "16px",
                }}
                onClick={() => {
                  router.push("/register");
                }}
              >
                Signup
              </Button>
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  fontSize: "16px",
                }}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
