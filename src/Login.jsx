import React, { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Card,
  useMantineTheme,
  Grid,
  Image,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import RegistrationPage from "./components/Regestration";

const Login = ({ onLogin }) => {
  const theme = useMantineTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here, you can perform the login logic with the entered username and password
    // For demonstration purposes, we will use a simple check to simulate a successful login
    if (username === "admin" && password === "password") {
      // Call the onLogin function to indicate successful login
      notifications.show({
        title: "Login Successful",
        message: "Welcome back!",
        color: "teal",
      });
      onLogin();
    } else {
      // You can show an error message here or handle unsuccessful login
      console.log("Invalid credentials");
      notifications.show({
        title: "Invalid Credentials",
        message: "Please Check",
        color: "Red",
      });
    }
  };
  return (
    <div>
      <Grid>
        <Grid.Col md={2} lg={4}></Grid.Col>
        <Grid.Col md={2} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Paper
              padding="lg"
              style={{
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
              }}
            >
              <Text fz="lg" fw={800} align="center" mb="md">
                LMAS : Login
              </Text>
              <TextInput
                label="Name"
                placeholder="Enter Your name"
                style={{ marginBottom: "1rem" }}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Enter Your Password"
                style={{ marginBottom: "1rem" }}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Paper>
            <Button type="submit" radius="xl" ml="xl" onClick={handleLogin}>
              Login!
            </Button>
            <p>
              {" "}
              Dont have an account? <Link to="/registration">Register</Link>
            </p>
            <p>
              {" "}
              Forgot Password? <Link to="/passwordreset">Click Here!</Link>
            </p>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
      </Grid>
    </div>
  );
};

export default Login;
