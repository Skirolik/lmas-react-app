import React from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "@mantine/core";

const LandingPage = () => {
  return (
    <div>
      <Text size="xl" style={{ marginBottom: "1rem" }}>
        Welcome to the Landing Page!
      </Text>
      <Link to="/">
        <Button color="blue" fullWidth size="lg">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
