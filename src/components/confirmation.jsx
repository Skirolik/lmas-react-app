import React from "react";
import {
  Paper,
  TextInput,
  Button,
  Card,
  useMantineTheme,
  Grid,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";

const confirmation = () => {
  return (
    <div>
      <Grid p="80px">
        <Grid.Col md={6} lg={3}>
          Forgot Password
        </Grid.Col>
        <Grid.Col md={6} lg={5}>
          <Card hadow="sm" padding="lg" radius="md" withBorder>
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
                Check your Email Id for reseting your Password!
              </Text>

              <Button
                type="submit"
                radius="xl"
                ml="xl"
                onClick={handleRegistration}
              >
                Submit
              </Button>
            </Paper>
          </Card>
        </Grid.Col>
        <Grid.Col md={6} lg={2}></Grid.Col>
        <Grid.Col md={6} lg={2}></Grid.Col>
      </Grid>
    </div>
  );
};

export default confirmation;
