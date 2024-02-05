import React, { useState, useEffect } from "react";
import { Card, Button, Text, Grid, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import Reset_pwd from "./components/Reset_pwd";
import GetInTouch from "./components/GetInTouch";

const Settings = () => {
  const theme = useMantineTheme();
  const cardColor = theme.colorScheme === "dark" ? "#25262b" : "#dbe4ff";

  const contactDetailsStyle = {
    padding: theme.spacing.lg,
    background:
      theme.colorScheme === "dark"
        ? "linear-gradient(45deg,#5f3dc4,#d0bfff)" // Dark mode gradient (light blue to violet)
        : "linear-gradient(45deg, #e7f5ff, #4dabf7)", // Light mode gradient (blue to light blue)
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  };
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(
    new Date("2023-07-15")
  );
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(
    new Date("2023-08-15")
  );
  const [daysRemaining, setDaysRemaining] = useState(0);

  const calculateDaysRemaining = () => {
    const currentTime = new Date();
    const remaingTime = subscriptionEndDate - currentTime;
    const remaingDays = Math.floor(remaingTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(remaingDays);
  };
  useEffect(() => {
    calculateDaysRemaining();
  }, []);

  const handleRenewSubscription = () => {
    notifications.show({
      title: "Request Sent ",
      message: "Thank You for, your subsription will be renewed",
      color: "teal",
      icon: <CircleCheck size={24} color="white" />,
    });
    console.log("Renew clicked");
  };
  return (
    <div>
      <Grid mb="xl" mt="xl">
        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col md={2} lg={5}>
          <Card
            shadow="xl"
            padding="lg"
            radius="md"
            withBorder
            style={contactDetailsStyle}
          >
            <Text
              fz="xl"
              fw={800}
              td="underline"
              align="center"
              mb="md"
              mt="xl"
              tt="uppercase"
            >
              Subscription Detials
            </Text>
            <Text align="center" mt="xl" mb="xl">
              Subscription Start Date:{subscriptionStartDate.toDateString()}
            </Text>
            <Text align="center" mt="xl" mb="xl">
              Subscription End Date:{subscriptionEndDate.toDateString()}
            </Text>
            <Text
              align="center"
              style={{
                color: daysRemaining < 30 ? "red" : "inherit",
              }}
            >
              Days Remaining for Subscription: {daysRemaining}
            </Text>
            <Button
              type="submit"
              radius="xl"
              ml="xl"
              mt="xl"
              onClick={handleRenewSubscription}
              style={{ marginTop: "1rem" }}
              variant="gradient"
            >
              Renew
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={5}>
          <Reset_pwd />
        </Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
      </Grid>

      <GetInTouch />
    </div>
  );
};

export default Settings;
