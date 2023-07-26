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

const Forgot_password = () => {
  const theme = useMantineTheme();
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const handleRegistration = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    // Handle registration logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Confirm Key:", key);
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
      <Grid
        p="80px"
        justify="center"
        align="center"
        style={{ height: "100vh" }}
      >
        <Grid.Col md={6} lg={3}></Grid.Col>
        <Grid.Col md={6} lg={5}>
          <Center>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Paper
                padding="sm"
                style={{
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[0],
                }}
              >
                <Text fz="lg" fw={800} align="center" mb="md">
                  Password Reset
                </Text>
                <TextInput
                  label="Email"
                  size="md"
                  p="5px"
                  radius="md"
                  placeholder="Enter Your email"
                  style={{ marginBottom: "1rem" }}
                  onChange={handleEmailChange}
                  // error={emailError}

                  required
                />
                {emailError && (
                  <Text color="red" size="sm">
                    {emailError}
                  </Text>
                )}
                <Button
                  type="submit"
                  mb="xl"
                  radius="xl"
                  ml="xl"
                  onClick="/confirmation"
                >
                  Submit
                </Button>
              </Paper>

              <p>
                {" "}
                Dont have an account? <Link to="/login">Register</Link>
              </p>
            </Card>
          </Center>
        </Grid.Col>
        <Grid.Col md={6} lg={2}></Grid.Col>
        <Grid.Col md={6} lg={2}></Grid.Col>
      </Grid>
    </div>
  );
};

export default Forgot_password;
