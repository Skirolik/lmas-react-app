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
  Divider,
  Aside,
  Footer,
  Image,
} from "@mantine/core";
import { CiDark, CiLight } from "react-icons/ci";
import { createStyles, useMantineTheme } from "@mantine/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import {
  IconHome2,
  IconCalendar,
  IconActivityHeartbeat,
  IconPackage,
  IconLayoutKanban,
  IconAddressBook,
} from "@tabler/icons-react";

import { Logout } from "tabler-icons-react";
import { Notifications, notifications } from "@mantine/notifications";

import "./App.css";

import Home from "./Home";
import CalendarTab from "./CalendarTab";
import SmartEarthpit from "./SmartEarthpit";
import SmartProtection from "./SmartProtection";
import Maintenance from "./Maintenance";
import Contact from "./Contact";

import Login from "./Login";
import LogoutPage from "./Logout";
import RegistrationPage from "./components/Regestration";
import EmailConfirmation from "./components/EmailConfirmation";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordPage from "./ResetPassword";

import Settings from "./Settings";
import Users from "./Users";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  // Check if user is logged in (e.g., by checking session storage, authentication token, etc.)
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      // history("/login"); // Redirect to login page if not logged in
    } else {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (!isLoggedIn) {
      // history("/login"); // Redirect to login page if not logged in
    } else {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    const delay = 700; // Adjust the delay as needed
    setTimeout(() => {
      window.location.href = "/";
      sessionStorage.removeItem("isLoggedIn");
      setLoggedIn(false);
    }, delay);
    // Perform logout logic here...
    notifications.show({
      title: "Thank you",
      message: "Logout successful",
      color: "indigo",
    });
  };

  const views = [
    { path: "/", name: "Home", component: Home, logo: <IconHome2 /> },
    {
      path: "/CalenderTab",
      name: "Calendar",
      component: CalendarTab,
      exact: true,
      logo: <IconCalendar />,
    },
    {
      path: "/SmartEarthpit",
      name: "Smart Earthing",
      component: SmartEarthpit,
      exact: true,
      logo: <IconPackage />,
    },
    {
      path: "/SmartProtection",
      name: "Smart Protection",
      component: SmartProtection,
      exact: true,
      logo: <IconActivityHeartbeat style={{ fontSize: "12px" }} />,
    },
    {
      path: "/maintanance",
      name: "Maintance DB",
      component: Maintenance,
      exact: true,
      logo: <IconLayoutKanban />,
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact,
      exact: true,
      logo: <IconAddressBook />,
    },
  ];

  // mobile nav
  const [opened, setOpened] = useState(false);

  // Get the user's preferred color scheme from local storage or default to "light"
  const storedColorScheme = localStorage.getItem("colorScheme");
  const defaultColorScheme = storedColorScheme || "light";
  // console.log(defaultColorScheme);
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  const toggleColorScheme = (value) => {
    const newValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newValue);
    // Save the selected color scheme to local storage
    localStorage.setItem("colorScheme", newValue);
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
                    <NavLink
                      to={view.path}
                      key={index}
                      onClick={() => setOpened(false)}
                      className={`${classes.NavLink} ${classes.NavLinkActive}`}
                    >
                      <Group>
                        <span>{view.logo}</span>
                        <Text>{view.name}</Text>
                      </Group>
                    </NavLink>
                  ))}
                </Navbar.Section>
                <Navbar.Section>
                  <Divider size="lg" mb="xl" />
                  <Users />

                  <Button
                    leftIcon={<Logout />}
                    variant="outline"
                    color="red"
                    radius="md"
                    loaderPosition="right"
                    onClick={handleLogout}
                    loading={loading}
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
                  <Image
                    maw={60}
                    mx="auto"
                    radius="md"
                    src="src/assets/niju.png"
                    alt="Random image"
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
                <Route path="/settings" element={<Settings />} />
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
