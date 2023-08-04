import React, { useState, useEffect } from "react";
import { Card, Button, Text, Grid, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import ResetPasswordPage from "./ResetPassword";

const Settings = () => {
  const theme = useMantineTheme();
  const cardColor = theme.colorScheme === "dark" ? "#25262b" : "#dbe4ff";
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
      <Grid>
        <Grid.Col md={2} lg={3}></Grid.Col>
        <Grid.Col md={2} lg={5}>
          <Card shadow="xl" padding="lg" radius="md" withBorder bg={cardColor}>
            <Text fz="lg" fw={800} align="center" mb="md">
              Subscription Detials
            </Text>
            <Text align="center">
              Subscription Start Date:{subscriptionStartDate.toDateString()}
            </Text>
            <Text align="center">
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
              onClick={handleRenewSubscription}
              style={{ marginTop: "1rem" }}
              variant="gradient"
            >
              Renew
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col md={2} lg={11}>
          <ResetPasswordPage />
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
      </Grid>
    </div>
  );
};

export default Settings;
