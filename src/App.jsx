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
  NavLink,
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
import Fault_info from "./Fault_info";
import Fault_detection from "./Fault_detection";
import Fault_managment from "./Fault_managment";

import Calendar_tab from "./Calendar_tab";
import smart_earthpit from "./smart_earthpit";
import smart_protection from "./smart_protection";
import Settings from "./Settings";
import Users from "./Users";
import Contact from "./Contact";
import {
  IconHome2,
  IconCalendar,
  IconActivityHeartbeat,
  IconPackage,
  IconLayoutKanban,
  IconAddressBook,
} from "@tabler/icons-react";

import Maintenance from "./Maintenance";
import { IconGauge, IconFingerprint } from "@tabler/icons-react";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

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
      path: "/calender_tab",
      name: "Calendar",
      component: Calendar_tab,
      exact: true,
      logo: <IconCalendar />,
    },
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
      path: "/maintanance",
      name: "Maintance",
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
      padding: theme.spacing.sm,
      marginTop: "8px",
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
      marginTop: "4px",
      borderRadius: theme.radius.md,
      color: colorScheme === "dark" ? "white" : "black",
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
      fontSize: "1.4rem", // Adjust the font size as needed
    },
    Largedata: {
      fontSize: "1.1rem", // Adjust the font size as needed
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
                      <span>{view.logo}</span>
                      <Text>{view.name}</Text>
                    </Group>
                  </Link>
                ))}
              </Navbar.Section>
              <Navbar.Section grow mt="md">
                <NavLink
                  label={<Text className={classes.Largedata}>Fault</Text>}
                  icon={<IconFingerprint stroke={2} />}
                  childrenOffset={25}
                  defaultClosed
                  className={` ${classes.NestedLink} ${classes.NestedLinkActive} ${classes.LargeFont} `}
                >
                  <Link
                    to="/fault_info"
                    className={`${classes.NavLink} ${classes.NavLinkActive}`}
                  >
                    {" "}
                    <Text fz="lg">Fault Info</Text>
                  </Link>
                  <Link
                    to="/fault_detection"
                    className={`${classes.NavLink} ${classes.NavLinkActive}`}
                  >
                    <Text fz="lg">Fault Detection</Text>
                  </Link>
                </NavLink>
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
              <Route path="/fault_info" element={<Fault_info />} />
              <Route path="/fault_detection" element={<Fault_detection />} />
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
