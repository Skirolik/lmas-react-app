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
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { Link } from "react-router-dom";
import axios from "axios";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const Login = ({ onLogin }) => {
  const theme = useMantineTheme();
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();

  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://52.172.4.41:7070";

  // const handleLogin = async () => {
  //   // Here, you can perform the login logic with the entered username and password
  //   setIsLoading(true);
  //   notifications.show({
  //     title: "Login Success",
  //     message: "Login Successful: Welcome back!",
  //     color: "teal",
  //   });
  //   try {
  //     const response = await axios.post("/login", {
  //       email,
  //       password,
  //     });

  //     // console.log(response.data.message);

  //     if (response.data.message === "Login successful") {
  //       const userEmail = response.data.email;
  //       sessionStorage.setItem("isLoggedIn", "true");
  //       sessionStorage.setItem("userEmail", userEmail); // Store the email in session storage
  //       window.location.href = "/";
  //       notifications.show({
  //         title: "Login Success",
  //         message: "Login Successful: Welcome back!",
  //         color: "teal",
  //       });
  //     } else {
  //       // You can show an error message here or handle unsuccessful login
  //       console.log("Invalid credentials");
  //       notifications.show({
  //         title: "Invalid Credentials",
  //         message: "Please check your username and password.",
  //         color: "Red",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  //   setIsLoading(false);
  //   onLogin();
  // };

  //local login
  const handleLogin = () => {
    setIsLoading(true);
    // Here, you can perform the login logic with the entered username and password
    // For demonstration purposes, we will use a simple check to simulate a successful login
    if (username === "admin" && password === "Mepl@123") {
      // Call the onLogin function to indicate successful login
      notifications.show({
        title: "Login Successful",
        message: "Welcome back!",
        color: "teal",
        icon: <CircleCheck size={24} color="white" />,
      });
      onLogin();
    } else {
      // You can show an error message here or handle unsuccessful login
      // console.log("Invalid credentials");
      notifications.show({
        title: "Invalid Credentials",
        message: "Please Check",
        color: "red",
        icon: <AlertCircle size={24} color="black" />,
      });
    }
    {
      setIsLoading(false);
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
              <Image
                width="30%"
                height="45%"
                align="left"
                src="../src/assets/ManavLogo2021.png"
              />
              <Text fz="lg" fw={800} align="center" mb="md">
                LMAS : Login
              </Text>
              {/* <TextInput
                label="Name"
                placeholder="Enter your email"
                style={{ marginBottom: "1rem" }}
                onChange={(event) => setEmail(event.target.value)}
                required
              /> */}
              <TextInput
                label="Name"
                placeholder="Enter Your name"
                style={{ marginBottom: "1rem" }}
                onChange={(event) => setUsername(event.target.value)}
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
            {isLoading ? (
              <Loader
                size="md"
                style={{ display: "inline-block", marginLeft: "8px" }}
              />
            ) : null}
            <Button
              type="submit"
              radius="xl"
              ml="xl"
              onClick={handleLogin}
              variant="gradient"
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
