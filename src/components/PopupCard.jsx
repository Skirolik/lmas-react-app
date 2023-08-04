import React from "react";
import { Button, Card, Text, Image } from "@mantine/core";

const PopupCard = ({ title, paragraph, bulletPoints }) => {
  const handleClick = () => {
    console.log("Register Clicked");
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
          • {point}
        </Text>
      ))}
      <Button
        mb="xl"
        mt="xl"
        radius="xl"
        variant="gradient"
        onClick={handleClick}
      >
        Register
      </Button>
    </Card>
  );
};

export default PopupCard;
