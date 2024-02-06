import { useState, useEffect, useMemo } from "react";
import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  Navbar,
  Text,
  ActionIcon,
  Header,
  MediaQuery,
  Button,
  Loader,
  Divider,
  Image,
  Aside,
  Footer,
  NavLink,
  ScrollArea,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { createStyles, useMantineTheme } from "@mantine/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import { Logout } from "tabler-icons-react";

import { Notifications, notifications } from "@mantine/notifications";

import "./App.css";
import Home from "./Home";
import Login from "./Login";
import RegistrationPage from "./components/Regestration";
import ForgotPassword from "./components/ForgotPassword";
import LogoutPage from "./Logout";
import ResetPasswordPage from "./ResetPassword";
import EmailConfirmation from "./components/EmailConfirmation";
import Submit_success from "./Submit_success";
import Lmas from "./Lmas";

//Layout for each repeter
import Repeter_1 from "./Repeter_1";
import Repeter_2 from "./repeters/Repeter_2";
import Repeter_3 from "./repeters/Repeter_3";
import Repeter_4 from "./repeters/Repeter_4";

//Maintenance Pages
import Board from "./maintenance/Board";
import Inventory from "./maintenance/Inventory";
import Summary from "./maintenance/Summary";
import Error_issues from "./maintenance/Error_issues";

import smart_earthpit from "./smart_earthpit";
import smart_protection from "./smart_protection";
import Settings from "./Settings";
import Users from "./Users";
import Contact from "./Contact";
import Rectractable from "./Rectractable";
import {
  IconHome2,
  IconActivityHeartbeat,
  IconPackage,
  IconHierarchy3,
  IconGeometry,
  IconAdjustmentsCog,
} from "@tabler/icons-react";

import Maintenance from "./Maintenance";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const errorSound = new Audio("../src/assets/alarm.mp3");

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:2000`);

    socket.onopen = () => {
      console.log("Websoclet connection established in App.jsx");
    };

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log("data from websocket", data);
      const [slaveId, masterValue, slaveValueData] = data;

      if (slaveValueData === "ERROR") {
        errorSound.pause();
        errorSound.currentTime = 0;
        errorSound.play();
        notifications.clean();
        notifications.show({
          title: "Error Occured!",
          message: `Error Occured in slave, check The plant overView`,
          color: "red",
        });
      }
    };
    socket.onclose = () => {
      console.log("websocket connection closed");
    };
    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
    };
  }, []);

  const handleLogin = () => {
    // Perform login logic here...
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here...
    notifications.show({
      title: "Thank you",
      message: "shahin is best!!!",
      color: "indigo",
    });
    setLoggedIn(false);
  };

  // const handleLogout = () => {
  //   // Perform logout logic here...
  //   notifications.show({
  //     title: "Thank you",
  //     message: "shahin is best!!!",
  //     color: "indigo",
  //   });

  //   sessionStorage.removeItem("isLoggedIn");
  //   setLoggedIn(false);

  //   window.location.href = "/"; // Redirect to login page if not logged in
  // };

  const views = [
    { path: "/", name: "Home", component: Home, logo: <IconHome2 /> },

    {
      path: "/smart_earthpit",
      name: "Smart Earthing",
      component: smart_earthpit,
      exact: true,
      logo: <IconPackage />,
    },
    {
      path: "/smart_protection",
      name: "Smart Protect",
      component: smart_protection,
      exact: true,
      logo: <IconActivityHeartbeat style={{ fontSize: "12px" }} />,
    },
    {
      path: "/Rectractable",
      name: "Plant Overview",
      component: Rectractable,
      exact: true,
      logo: <IconHierarchy3 />,
    },

    {
      path: "/Lmas",
      name: "Lmas",
      component: Lmas,
      exact: true,
      logo: <IconHierarchy3 />,
    },
  ];

  // mobile nav
  const [opened, setOpened] = useState(false);
  const defaultColorScheme = "dark";
  // console.log(defaultColorScheme);
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  const toggleColorScheme = (value) => {
    const newValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newValue);
  };

  // custom styles
  const useStyles = createStyles((theme) => ({
    NavLink: {
      display: "block",
      width: "100%",

      padding: theme.spacing.xs,

      borderRadius: theme.radius.md,
      color: colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      textDecoration: "none",
      "&:hover": {
        backgroundColor:
          colorScheme === "dark"
            ? theme.colors.violet[4]
            : theme.colors.blue[2],
        color: colorScheme === "dark" ? "white" : "white",
      },
    },
    NavLinkActive: {
      backgroundColor:
        colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    },
    Button: {
      "&:hover": {
        backgroundColor: colorScheme === "dark" ? "#ffc9c9" : "#ffc9c9",
        borderBlockColor: "#ffa8a8",
      },
    },
    NestedLink: {
      width: "100%",
      padding: theme.spacing.md,
      marginTop: "3px",
      borderRadius: theme.radius.md,
      color: colorScheme === "dark" ? "white" : "black",
      backgroundColor:
        colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
      textDecoration: "none",
      "&:hover": {
        backgroundColor:
          colorScheme === "dark"
            ? theme.colors.violet[4]
            : theme.colors.blue[2],
        color: colorScheme === "dark" ? "white" : "white",
      },
    },
    NestedLinkActive: {
      backgroundColor:
        colorScheme === "dark" ? theme.colors.violet[4] : theme.colors.blue[2],
    },
    LargeFont: {
      fontSize: "1rem", // Adjust the font size as needed
    },
    Largedata: {
      fontSize: "1rem", // Adjust the font size as needed
    },
  }));

  const { classes } = useStyles();

  return (
    <MantineProvider
      theme={{
        colorScheme: colorScheme,
        fontFamily: "Open Sans, sans-serif",
        loader: "bars",
      }}
      withGlobalStyles
    >
      <Notifications />
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          loggedIn && (
            <Navbar
              width={{ sm: 195 }}
              padding="xs"
              hidden={!opened}
              hiddenBreakpoint="sm"
            >
              <Navbar.Section mt="xs"></Navbar.Section>

              <Navbar.Section grow mt="md" component={ScrollArea}>
                {views.map((view, index) => (
                  <Link
                    to={view.path}
                    key={index}
                    onClick={() => setOpened(false)}
                    className={`${classes.NavLink} `}
                  >
                    <Group>
                      <span>{view.logo}</span>
                      <Text>{view.name}</Text>
                    </Group>
                  </Link>
                ))}
                <NavLink
                  label={<Text className={classes.Largedata}>Upkeep</Text>}
                  icon={<IconAdjustmentsCog stroke={2} />}
                  childrenOffset={25}
                  defaultClosed
                  className={` ${classes.NestedLink}   `}
                  mb="xs"
                >
                  <Link
                    to="/maintenance/Summary"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Summary</Text>
                  </Link>

                  <Link
                    to="/maintenance/Board"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Board</Text>
                  </Link>
                  <Link
                    to="/maintenance/Inventory"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Inventory</Text>
                  </Link>
                  <Link
                    to="/maintenance/Error_issues"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Error History</Text>
                  </Link>
                  <Link to="/maintanance" className={`${classes.NavLink} `}>
                    {" "}
                    <Text fz="md">EarthPit Data</Text>
                  </Link>
                </NavLink>
                <NavLink
                  label={<Text className={classes.Largedata}>Layout</Text>}
                  icon={<IconGeometry stroke={2} />}
                  childrenOffset={25}
                  defaultClosed
                  className={` ${classes.NestedLink}  `}
                >
                  <Link to="/repeter_1" className={`${classes.NavLink} `}>
                    {" "}
                    <Text fz="md">Repeter-1</Text>
                  </Link>
                  <Link
                    to="/repeters/Repeter_2"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Repeter-2</Text>
                  </Link>
                  <Link
                    to="/repeters/Repeter_3"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Repeter-3</Text>
                  </Link>
                  <Link
                    to="/repeters/Repeter_4"
                    className={`${classes.NavLink} `}
                  >
                    {" "}
                    <Text fz="md">Repeter-4</Text>
                  </Link>
                </NavLink>
              </Navbar.Section>

              <Navbar.Section>
                <Divider size="lg" mb="xl" mt="xl" /> <Users />
                <Button
                  leftIcon={<Logout />}
                  variant="outline"
                  color="red"
                  radius="md"
                  loaderPosition="right"
                  onClick={handleLogout}
                  className={`${classes.Button} `}
                  mb="xl"
                >
                  Logout
                </Button>
              </Navbar.Section>
            </Navbar>
          )
        }
        footer={loggedIn && <Footer height={5} p="sm"></Footer>}
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside
              p="sm"
              hiddenBreakpoint="sm"
              width={{ sm: 20, lg: 2 }}
            ></Aside>
          </MediaQuery>
        }
        header={
          <Header height={{ base: 60, md: 70 }} p="xs">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={useMantineTheme().colors.gray[6]}
                  mr="xl"
                  ml="xl"
                />
              </MediaQuery>

              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  width="20%"
                  // height="20%"
                  src="../src/assets/ManavLogo2021.png"
                />
                <Text
                  style={{
                    fontSize: "xl",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: colorScheme === "dark" ? "white" : "Black",
                  }}
                >
                  Yo YO Niju P.P Presents:
                </Text>
              </div>

              <div style={{ marginLeft: "auto" }}>
                <ActionIcon
                  variant="outline"
                  onClick={() => toggleColorScheme()}
                  size={30}
                  mr="md"
                  color={colorScheme === "dark" ? "grape" : "indigo"}
                >
                  {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
                </ActionIcon>
              </div>
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          },
        })}
      >
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPasswordPage />}
          />
          <Route path="/confirm/:token" element={<EmailConfirmation />} />
          {/* <Route path="/maintanance" element={<Maintenance />} /> */}

          {/* Public routes */}
          {!loggedIn && (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          )}

          {/* Private routes */}
          {loggedIn && (
            <>
              <Route path="/repeter_1" element={<Repeter_1 />} />
              <Route path="/repeters/Repeter_2" element={<Repeter_2 />} />
              <Route path="/repeters/Repeter_3" element={<Repeter_3 />} />
              <Route path="/repeters/Repeter_4" element={<Repeter_4 />} />
              <Route path="/maintenance/Board" element={<Board />} />
              <Route path="/maintenance/Inventory" element={<Inventory />} />
              <Route path="/maintenance/Summary" element={<Summary />} />
              <Route
                path="/maintenance/Error_issues"
                element={<Error_issues />}
              />
              <Route path="/maintanance" element={<Maintenance />} />

              <Route path="/settings" element={<Settings />} />
              {views.map((view, index) => (
                <Route
                  key={index}
                  exact={view.exact}
                  path={view.path}
                  element={<view.component />}
                />
              ))}
              <Route path="/submit_success" element={<Submit_success />} />
            </>
          )}

          {/* Redirect to login page if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
