import React from "react";
import {
  useMantineTheme,
  Grid,
  TextInput,
  Button,
  Card,
  Textarea,
  Accordion,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { LoremIpsum } from "react-lorem-ipsum";

const GetInTouch = () => {
  const theme = useMantineTheme();

  // Style for the contact details side with gradient background
  const contactDetailsStyle = {
    padding: theme.spacing.lg,
    background:
      theme.colorScheme === "dark"
        ? "linear-gradient(45deg,#5f3dc4,#d0bfff)" // Dark mode gradient (light blue to violet)
        : "linear-gradient(45deg, #e7f5ff, #4dabf7)", // Light mode gradient (blue to light blue)
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  };

  return (
    <div>
      <Grid gutter="md">
        <Grid.Col md={2} lg={2}></Grid.Col>
        {/* Contact details side */}
        <Grid.Col span={12} md={4} lg={4}>
          <Card
            shadow="lg"
            padding="xl"
            radius="lg"
            style={contactDetailsStyle}
          >
            <h2>Contact Details</h2>
            <p>Address: 123 Main Street</p>
            <p>City: New York</p>
            <p>Country: USA</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Email: contact@example.com</p>
            <p>Working Hours: 9:00 AM - 5:00 PM</p>
          </Card>
        </Grid.Col>

        {/* Form side */}
        <Grid.Col span={12} md={4} lg={4}>
          <Card
            shadow="lg"
            padding="xl"
            radius="lg"
            style={{ padding: theme.spacing.lg }}
          >
            <h2>Contact Us</h2>
            <TextInput label="Name" placeholder="Enter your name" required />
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              type="email"
              required
            />
            <Textarea
              label="Message"
              placeholder="Enter your message"
              rows={4}
              required
            />
            <Button variant="gradient" radius="xl" compact mt="xl">
              Submit
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={8}>
          <Card
            shadow="lg"
            padding="xl"
            radius="lg"
            style={{ padding: theme.spacing.lg }}
          >
            <h1>FAQ'S</h1>
            <Accordion
              transitionDuration={1000}
              variant="contained"
              radius="xl"
              defaultValue="Question:1"
              chevron={<IconPlus size="1rem" />}
              styles={{
                chevron: {
                  "&[data-rotate]": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
            >
              <Accordion.Item value="Question:1">
                <Accordion.Control>Question:1</Accordion.Control>
                <Accordion.Panel>
                  {" "}
                  <LoremIpsum p={2} />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="Question:2">
                <Accordion.Control>Question:2</Accordion.Control>
                <Accordion.Panel>
                  {" "}
                  <LoremIpsum p={2} />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="Question:3">
                <Accordion.Control>Question:3</Accordion.Control>
                <Accordion.Panel>
                  {" "}
                  <LoremIpsum p={2} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Grid.Col>

        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col></Grid.Col>
      </Grid>
    </div>
  );
};

export default GetInTouch;
