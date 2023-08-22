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
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://localhost:8080";

  const handleLogin = async () => {
    // Here, you can perform the login logic with the entered username and password
    setLoading(true);

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      // console.log(response.data.message);

      if (response.data.message === "Login successful") {
        const {
          userEmail,
          userFirstname,
          userLastname,
          userCompany,
          userStartDate,
          userEndDate,
        } = response.data.user;

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userEmail", userEmail); // Store the email in session storage
        sessionStorage.setItem("userFirstname", userFirstname);
        sessionStorage.setItem("userLastname", userLastname);
        sessionStorage.setItem("userCompany", userCompany);
        sessionStorage.setItem("userStartDate", userStartDate);
        sessionStorage.setItem("userEndDate", userEndDate);

        console.log(userEmail, userFirstname);

        notifications.show({
          title: "Login Success",
          message: "Login Successful: Welcome back! ",
          color: "teal",
        });
        const delay = 700; // Adjust the delay as needed
        setTimeout(() => {
          window.location.href = "/";
        }, delay);
        onLogin();
      } else {
        setLoading(false);
        // You can show an error message here or handle unsuccessful login
        console.log("Invalid credentials");
        notifications.show({
          title: "Invalid Credentials",
          message: "Please check your username and password.",
          color: "Red",
        });
      }
    } catch (error) {
      setLoading(false);
      notifications.show({
        title: "Request Failed",
        message: "Sorry server not responding, please try again",
        color: "Red",
      });
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
            <Button
              type="submit"
              radius="xl"
              ml="xl"
              onClick={handleLogin}
              loading={loading}
            >
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
