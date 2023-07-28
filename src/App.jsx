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

import CalendarTab from "./CalendarTab";
import SmartEarthpit from "./SmartEarthpit";
import SmartProtection from "./SmartProtection";
import Maintenance from "./Maintenance";

import Login from "./Login";
import LogoutPage from "./Logout";
import RegistrationPage from "./components/Regestration";
import EmailConfirmation from "./components/EmailConfirmation";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordPage from "./ResetPassword";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const history = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., by checking session storage, authentication token, etc.)
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // history("/login"); // Redirect to login page if not logged in
    } else {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Perform logout logic here...

    sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    window.location.href = "/"; // Redirect to login page if not logged in

    notifications.show({
      title: "Thank you",
      message: "Please Check",
      color: "Red",
    });
  };

  const views = [
    { path: "/", name: "Home", component: Home },
    {
      path: "/CalenderTab",
      name: "Calendar",
      component: CalendarTab,
      exact: true,
    },
    {
      path: "/SmartEarthpit",
      name: "Smart Earthing",
      component: SmartEarthpit,
      exact: true,
    },
    {
      path: "/SmartProtection",
      name: "Smart Protection",
      component: SmartProtection,
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
  const defaultColorScheme = "dark";
  console.log(defaultColorScheme);
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
          navbarOffsetBreakpoint="sm fixed"
          navbar={
            loggedIn && (
              <Navbar
                width={{ sm: 200 }}
                padding="xs"
                hidden={!opened}
                hiddenBreakpoint="sm"
              >
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
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    width: "100%",
                  }}
                >
                  <Divider size="lg" mt="xl" />

                  <Button
                    leftIcon={<Logout />}
                    variant="outline"
                    color="red"
                    radius="md"
                    loaderPosition="right"
                    onClick={handleLogout}
                    className={`${classes.Button} `}
                    mt="xl"
                  >
                    Logout
                  </Button>
                </div>
              </Navbar>
            )
          }
          header={
            <Header height={70} padding="md">
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
                    LMAS Dashboard | Manav Energy Pvt. Ltd.
                  </Text>
                </div>

                <div style={{ marginLeft: "auto" }}>
                  <ActionIcon
                    variant="outline"
                    onClick={() => toggleColorScheme()}
                    size={30}
                    color={"dark" ? "yellow" : "blue"}
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
                  : theme.colors.gray[0],
            },
          })}
        >
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPasswordPage />}
            />
            <Route path="/confirm/:token" element={<EmailConfirmation />} />
            <Route path="/maintanance" element={<Maintenance />} />
            {/* Public routes */}
            {!loggedIn && <Route path="/" element={<Login />} />}
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </Router>
  );
}

export default App;
