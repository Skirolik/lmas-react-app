import React, { useState } from "react";
import {
  Paper,
  Text,
  Button,
  useMantineTheme,
  Grid,
  Popover,
} from "@mantine/core";
import { RiCalendarEventFill } from "react-icons/ri";
import Globe from "./components/Globe";
import { Canvas } from "@react-three/fiber";
import PopupCard from "./components/PopupCard";

const ComingSoonPage = ({ title, paragraph, bulletPoints }) => {
  const theme = useMantineTheme();
  const [showPopover, setShowPopover] = useState(false);

  const rootStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: theme.colorScheme === "dark" ? "#212121" : "#f9f9f9",
  };

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px",
    maxWidth: "100%",

    backgroundColor: theme.colorScheme === "dark" ? "#343a40" : "#e9ecef",
    boxShadow:
      theme.colorScheme === "dark"
        ? "0px 0px 20px rgba(0, 0, 0, 0.3)"
        : "0px 0px 20px rgba(0, 0, 0, 0.1)",
  };

  const iconStyle = {
    color: theme.colorScheme === "dark" ? "#ff79c6" : "#ff5252",
    width: "60px",
    height: "60px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: theme.colorScheme === "dark" ? "#ff79c6" : "#ff5252",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    boxShadow:
      theme.colorScheme === "dark"
        ? "0px 2px 8px rgba(255, 121, 198, 0.5)"
        : "0px 2px 8px rgba(255, 82, 82, 0.5)",
  };

  const handleButtonHover = (event) => {
    event.target.style.transform = "scale(1.1)";
  };

  const handleButtonLeave = (event) => {
    event.target.style.transform = "scale(1)";
  };
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <>
      <Grid>
        <Grid.Col md={2} lg={3}></Grid.Col>
        <Grid.Col md={2} lg={6}>
          <Paper shadow="lg" style={paperStyle}>
            <RiCalendarEventFill style={iconStyle} />
            <Canvas camera={{ position: [3, 1, 5], fov: 90 }}>
              <Globe />
            </Canvas>

            <Text
              size="xl"
              align="center"
              style={{
                marginBottom: "20px",
                color: theme.colorScheme === "dark" ? "#ffffff" : "#000000",
              }}
            >
              We are working hard to bring you something very interesting and
              helpful!
            </Text>
            <Button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              style={buttonStyle}
              onClick={togglePopover}
            >
              More Enquiry
            </Button>
            {showPopover && (
              <Popover
                opened={showPopover}
                onClose={() => setShowPopover(false)}
                withArrow
                position="top"
                transition="slide-up"
                targetOffset={10}
                placement="center"
                spacing={20}
              >
                <PopupCard
                  title={title}
                  paragraph={paragraph}
                  bulletPoints={bulletPoints}
                />
              </Popover>
            )}
          </Paper>
        </Grid.Col>
        <Grid.Col md={2} lg={3}></Grid.Col>
      </Grid>
    </>
  );
};

export default ComingSoonPage;
