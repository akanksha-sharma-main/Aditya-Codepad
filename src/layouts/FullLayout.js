import React, { useState } from "react";
import Link from "next/link"
import {
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
  experimentalStyled,
  useMediaQuery,
  Container,
  Box, Input, Drawer, AppBar, IconButton, Toolbar
} from "@mui/material";
import userimg from "../../assets/images/users/user2.jpg";
import { useRouter } from 'next/router'
import Footer from "./footer/Footer";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ logout, children, user }) => {
  const [key, setKey] = React.useState(Math.random())
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const router = useRouter()
  const [showDrawer2, setShowDrawer2] = useState(false);

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <MainWrapper>
      <AppBar className="" sx={{ backgroundColor: "#fbfbfb", }} position={'fixed'} elevation={0}>
        <Toolbar>
          <>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              aria-controls="search-menu"
              aria-haspopup="true"
              onClick={() => setShowDrawer2(true)}
              size="large"
            >
              <FeatherIcon icon="search" width="20" height="20" />
            </IconButton>
            <Drawer
              anchor="top"
              open={showDrawer2}
              onClose={() => setShowDrawer2(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  padding: "15px 30px",
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <Input placeholder="Search here" aria-label="description" fullWidth />
                <Box
                  sx={{
                    ml: "auto",
                  }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      color: (theme) => theme.palette.grey.A200,
                    }}
                    onClick={handleDrawerClose2}
                  >
                    <FeatherIcon icon="x-circle" />
                  </IconButton>
                </Box>
              </Box>
            </Drawer>
          </>

          <Box flexGrow={1} />
          {!user.value && <Link href={'http://localhost:3000/auth/login'}><Button variant="contained" >Login</Button></Link>}
          {user.value && <>
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Box display="flex" alignItems="center">
                <Image
                  src={userimg}
                  alt={userimg}
                  width="30"
                  height="30"
                  className="roundedCircle"
                />
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    variant="h5"
                    fontWeight="400"
                    sx={{ ml: 1 }}
                  >
                    Hi,
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="700"
                    sx={{
                      ml: 1,
                    }}
                  >
                    "Julia"
                  </Typography>
                  <FeatherIcon icon="chevron-down" width="20" height="20" />
                </Box>
              </Box>
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl4}
              keepMounted
              open={Boolean(anchorEl4)}
              onClose={handleClose4}
              sx={{
                "& .MuiMenu-paper": {
                  width: "385px",
                },
              }}
            >
              <Box>
                <Box p={2} pt={0}>
                  <List
                    component="nav"
                    aria-label="secondary mailbox folder"
                    onClick={handleClose4}
                  >
                    <ListItemButton>
                      <ListItemText primary="My Account" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="Change Password" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="My Settings" />
                    </ListItemButton>
                  </List>
                </Box>
                <Divider />
                <Box p={2}>

                  <Button fullWidth variant="contained" color="primary" onClick={logout}>
                    Logout
                  </Button>

                </Box>
              </Box>
            </Menu>
          </>}
        </Toolbar>
      </AppBar>
      <PageWrapper>
        <Container
          maxWidth={false}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
