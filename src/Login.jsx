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

import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const theme = useMantineTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://localhost:8080";

  const handleLogin = async () => {
    // Here, you can perform the login logic with the entered username and password

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      // console.log(response.data.message);

      if (response.data.message === "Login successful") {
        const userEmail = response.data.email;
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userEmail", userEmail); // Store the email in session storage
        window.location.href = "/";
        notifications.show({
          title: "Login Success",
          message: "Login Successful: Welcome back!",
          color: "teal",
        });
        onLogin();
      } else {
        // You can show an error message here or handle unsuccessful login
        console.log("Invalid credentials");
        notifications.show({
          title: "Invalid Credentials",
          message: "Please check your username and password.",
          color: "Red",
        });
      }
    } catch (error) {
      console.error("Login failed:");
    }
    onLogin();
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
                placeholder="Enter your email"
                style={{ marginBottom: "1rem" }}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your Password"
                style={{ marginBottom: "1rem" }}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Paper>
            <Button type="submit" radius="xl" ml="xl" onClick={handleLogin}>
              Login!
            </Button>
            <p>
              Dont have an account? <Link to="/register">Register</Link>
            </p>
            <p>
              Forgot password? <Link to="/forgot-password">Click Here!</Link>
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
