import React, { useState, useEffect } from "react";
import { Card, Button, Text, Grid, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import ChangePassword from "./ChangePassword";
import axios from "axios";

const Settings = () => {
  const theme = useMantineTheme();
  const cardColor = theme.colorScheme === "dark" ? "#25262b" : "#dbe4ff";

  axios.defaults.baseURL = "http://localhost:8080";

  const userEmail = sessionStorage.getItem("userEmail");
  const userFirstname = sessionStorage.getItem("userFirstname");
  const userLastname = sessionStorage.getItem("userLastname");
  const userCompany = sessionStorage.getItem("userCompany");
  const userStartDate = sessionStorage.getItem("userStartDate");
  const userEndDate = sessionStorage.getItem("userEndDate");

  const [loading, setLoading] = useState(false);

  const [subscriptionStartDate, setSubscriptionStartDate] = useState(
    new Date(userStartDate)
  );
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(
    new Date(userEndDate)
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
    setLoading(true);

    // Send client info to the backend
    axios
      .post("/renew-enquiry", {
        email: userEmail,
        firstname: userFirstname,
        lastname: userLastname,
        company: userCompany,
        startDate: userStartDate,
        endDate: userEndDate,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          notifications.show({
            title: "Renewal Request Sent",
            message:
              "One of our representatives will be in touch with you shortly. Thank you!",
            color: "teal",
            icon: <CircleCheck size={24} color="white" />,
          });

          console.log("Client details sent successfully!");
          // Handle any success notification if needed
        } else {
          notifications.show({
            title: "Renewal Request Failed",
            message:
              "Request failed, please contact the support team. Thank you!",
            color: "red",
            icon: <AlertCircle size={24} color="white" />,
          });

          console.log("Failed to send client details.");
          // Handle any error notification if needed
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error sending client details:", error);
        notifications.show({
          title: "Renewal Request Failed",
          message:
            "Request failed, please contact the support team. Thank you!",
          color: "red",
          icon: <AlertCircle size={24} color="white" />,
        });
        // Handle any error notification if needed
      });
  };

  return (
    <div>
      <Grid>
        <Grid.Col md={2} lg={3}></Grid.Col>
        <Grid.Col md={2} lg={6}>
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
        <Grid.Col md={2} lg={3}></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={2} lg={12}>
          <ChangePassword />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Settings;
