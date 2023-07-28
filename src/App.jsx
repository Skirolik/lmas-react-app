import { useState, useEffect } from "react";
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
} from "@mantine/core";
import { CiDark, CiLight } from "react-icons/ci";
import { createStyles, useMantineTheme } from "@mantine/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import { Logout } from "tabler-icons-react";

import { Notifications, notifications } from "@mantine/notifications";

import "./App.css";
import Home from "./Home";
import Login from "./Login";
import RegistrationPage from "./components/Regestration";
import Forgot_password from "./components/Forgot_password";

import Calendar_tab from "./Calendar_tab";
import smart_earthpit from "./smart_earthpit";
import smart_protection from "./smart_protection";
import LandingPage from "./LandingPage";
import Maintenance from "./Maintenance";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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

  const views = [
    { path: "/", name: "Home", component: Home },
    {
      path: "/calender_tab",
      name: "Calendar",
      component: Calendar_tab,
      exact: true,
    },
    {
      path: "/smart_earthpit",
      name: "Smart Earthing",
      component: smart_earthpit,
      exact: true,
    },
    {
      path: "/smart_protection",
      name: "Smart Protection",
      component: smart_protection,
      exact: true,
    },
    {
      path: "/maintanance",
      name: "Maintance DB",
      component: Maintenance,
      exact: true,
    },
  ];

  // mobile nav
  const [opened, setOpened] = useState(false);
  const defaultColorScheme = "light";
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
      padding: theme.spacing.md,
      marginTop: "5px",
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
  }));

  const { classes } = useStyles();

  return (
    <Router>
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
                width={{ sm: 200 }}
                padding="xs"
                hidden={!opened}
                hiddenBreakpoint="sm"
              >
                <Navbar.Section mt="xs"></Navbar.Section>

                <Navbar.Section grow mt="md">
                  {views.map((view, index) => (
                    <Link
                      to={view.path}
                      key={index}
                      onClick={() => setOpened(false)}
                      className={`${classes.NavLink} ${classes.NavLinkActive}`}
                    >
                      <Group>
                        <Text>{view.name}</Text>
                      </Group>
                    </Link>
                  ))}
                </Navbar.Section>
                <Navbar.Section>
                  <Divider size="lg" mb="xl" />

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
            <Header height={80} padding="sm">
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
                  />
                </MediaQuery>

                <div style={{ marginLeft: "auto" }}>
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
                    color={colorScheme === "dark" ? "yellow" : "indigo"}
                  >
                    {colorScheme === "dark" ? <CiLight /> : <CiDark />}
                  </ActionIcon>
                </div>
              </div>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[1],
            },
          })}
        >
          <Routes>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/passwordreset" element={<Forgot_password />} />

            {/* Public routes */}
            {!loggedIn && (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            )}

            {/* Private routes */}
            {loggedIn && (
              <>
                {views.map((view, index) => (
                  <Route
                    key={index}
                    exact={view.exact}
                    path={view.path}
                    element={<view.component />}
                  />
                ))}
              </>
            )}

            {/* Redirect to login page if route not found */}
            <Route path="*" element={<Navigate to="/landingpage" />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </Router>
  );
}

export default App;
