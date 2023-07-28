import React, { useState } from "react";
import {
  Paper,
  TextInput,
  Button,
  Card,
  useMantineTheme,
  Grid,
  Text,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const theme = useMantineTheme();
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  axios.defaults.baseURL = "http://localhost:8080";

  const handlePasswordReset = async () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    try {
      // Make an API call to the backend for password reset
      const response = await axios.post("/forgot-password", {
        email,
      });
      console.log("Password reset request sent successfully:", response.data);
      // Handle any success messages or redirection logic here
    } catch (error) {
      console.error("Password reset request failed:", error.message);
      // Handle any error messages or redirection logic here
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <Grid p="20px">
        <Grid.Col md={6} lg={2}></Grid.Col>
        <Grid.Col md={6} lg={4}>
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
                LMAS : Forgot password
              </Text>

              <TextInput
                label="Email"
                placeholder="Enter your email"
                style={{ marginBottom: "1rem" }}
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                required
              />
              <Button
                type="submit"
                radius="xl"
                ml="xl"
                onClick={handlePasswordReset}
              >
                Submit
              </Button>
            </Paper>
            <p>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </Card>
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <Image
            width="80%"
            height="100%"
            src="../src/assets/ManavLogo2021.png"
            align="center"
            p="xl"
          />
        </Grid.Col>
        <Grid.Col md={6} lg={2}></Grid.Col>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
