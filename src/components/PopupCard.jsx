import React, { useState } from "react";
import { Button, Card, Text, Image } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const PopupCard = ({ title, paragraph, bulletPoints, subject }) => {
  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://49.204.77.190:7070";

  const userEmail = sessionStorage.getItem("userEmail");
  const userFirstname = sessionStorage.getItem("userFirstname");
  const userLastname = sessionStorage.getItem("userLastname");
  const userCompany = sessionStorage.getItem("userCompany");

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Send client info to the backend
    axios
      .post("/service-enquiry", {
        subject,
        email: userEmail,
        firstname: userFirstname,
        lastname: userLastname,
        company: userCompany,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          notifications.show({
            title: "Request Sent",
            message:
              "Thank you for your interest, one of our representatives will be in touch with you shortly",
            color: "teal",
            icon: <CircleCheck size={24} color="white" />,
          });

          console.log("Client details sent successfully!");
          // Handle any success notification if needed
        } else {
          notifications.show({
            title: "Request Failed",
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
        // Handle any error notification if needed
      });
  };

  return (
    <Card shadow="xl" style={{ padding: 20 }}>
      <Text size="xl" underline fw="bold">
        {title}
      </Text>
      <Text size={"md"} mt="xl">
        {paragraph}
      </Text>
      {bulletPoints.map((point, index) => (
        <Text key={index} style={{ marginBottom: 5 }} mt="xl">
          {point}
        </Text>
      ))}
      <Button
        mb="xl"
        mt="xl"
        radius="xl"
        variant="gradient"
        onClick={handleClick}
        loading={loading} // Show loading spinner while request is in progress
      >
        Register
      </Button>
    </Card>
  );
};

export default PopupCard;
