// "use client";

// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

// const pages = ["Lab-Tests", "Appointments", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [anchorElAppointments, setAnchorElAppointments] = useState(null); // State for Appointments menu

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleOpenAppointmentsMenu = (event) => {
//     setAnchorElAppointments(event.currentTarget);
//   };

//   const handleCloseAppointmentsMenu = () => {
//     setAnchorElAppointments(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       color="success"
//       sx={{
//         height: "80px",
//         backgroundColor: "#033069",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar
//           disableGutters
//           sx={{
//             minHeight: "80px",
//             alignItems: "center",
//           }}
//         >
//           {/* Logo and Title */}
//           <MedicalServicesIcon
//             sx={{
//               display: { xs: "none", md: "flex" },
//               fontSize: "36px",
//               mr: 1,
//             }}
//           />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             HealthEase
//           </Typography>

//           {/* Mobile Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => {
//                 if (page === "Appointments") {
//                   return (
//                     <MenuItem key={page} onClick={handleOpenAppointmentsMenu}>
//                       <Typography sx={{ textAlign: "center" }}>
//                         {page}
//                       </Typography>
//                     </MenuItem>
//                   );
//                 }
//                 return (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography sx={{ textAlign: "center" }}>{page}</Typography>
//                   </MenuItem>
//                 );
//               })}
//             </Menu>
//           </Box>

//           {/* Logo and Title for Mobile */}
//           <MedicalServicesIcon
//             sx={{
//               display: { xs: "flex", md: "none" },
//               fontSize: "32px",
//               mr: 1,
//             }}
//           />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             HealthEase
//           </Typography>

//           {/* Page Names */}
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => {
//               if (page === "Appointments") {
//                 return (
//                   <Button
//                     key={page}
//                     onClick={handleOpenAppointmentsMenu}
//                     sx={{
//                       my: 2,
//                       color: "white",
//                       display: "block",
//                       fontSize: "16px",
//                     }}
//                   >
//                     {page}
//                   </Button>
//                 );
//               }
//               return (
//                 <Button
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   sx={{
//                     my: 2,
//                     color: "white",
//                     display: "block",
//                     fontSize: "16px",
//                   }}
//                 >
//                   {page}
//                 </Button>
//               );
//             })}
//           </Box>

//           {/* Appointments Menu */}
//           <Menu
//             id="appointments-menu"
//             anchorEl={anchorElAppointments}
//             open={Boolean(anchorElAppointments)}
//             onClose={handleCloseAppointmentsMenu}
//             MenuListProps={{
//               "aria-labelledby": "appointments-menu-button",
//             }}
//           >
//             <MenuItem onClick={handleCloseAppointmentsMenu}>
//               All Appointments
//             </MenuItem>
//             <MenuItem onClick={handleCloseAppointmentsMenu}>
//               Pending Appointments
//             </MenuItem>
//             <MenuItem onClick={handleCloseAppointmentsMenu}>
//               Approved Appointments
//             </MenuItem>
//             <MenuItem onClick={handleCloseAppointmentsMenu}>
//               Cancelled Appointments
//             </MenuItem>
//             <MenuItem onClick={handleCloseAppointmentsMenu}>
//               Completed Appointments
//             </MenuItem>
//           </Menu>

//           {/* User Avatar and Menu */}
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: "center" }}>
//                     {setting}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;

"use client";

import React, { useState } from "react";

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

const pages = ["Lab-Tests", "Appointments", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElAppointments, setAnchorElAppointments] = useState(null); // State for Appointments menu

  const router = useRouter();

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
    handleCloseAppointmentsMenu(); // Close the menu before navigating
    router.push(path); // Navigate to the specified path
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
                return (
                  <MenuItem
                    key={page}
                    // onClick={handleCloseNavMenu}
                    onClick={() => handleNavigateTo("/labtest")}
                  >
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                );
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
              return (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
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
              All Appointment
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
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
