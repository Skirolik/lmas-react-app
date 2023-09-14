import React, { useState } from "react";
import {
  useMantineTheme,
  Grid,
  TextInput,
  Button,
  Card,
  Textarea,
  Select,
  Accordion,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { LoremIpsum } from "react-lorem-ipsum";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import axios from "axios";

const GetInTouch = () => {
  axios.defaults.baseURL = "http://49.204.77.190:7070";

  const theme = useMantineTheme();

  const userEmail = sessionStorage.getItem("userEmail");
  const userFirstname = sessionStorage.getItem("userFirstname");
  const userLastname = sessionStorage.getItem("userLastname");
  const userCompany = sessionStorage.getItem("userCompany");

  const [message, setMessage] = useState("");
  const [product, setProduct] = useState("select");
  const [messageError, setMessageError] = useState("");
  const [productError, setProductError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageError("");
  };
  const handleProductChange = (selectedValue) => {
    setProduct(selectedValue);
    console.log(selectedValue);
    setProductError("");
  };
  // Style for the contact details side with gradient background
  const contactDetailsStyle = {
    padding: theme.spacing.lg,
    background:
      theme.colorScheme === "dark"
        ? "linear-gradient(45deg,#5f3dc4,#d0bfff)" // Dark mode gradient (light blue to violet)
        : "linear-gradient(45deg, #e7f5ff, #4dabf7)", // Light mode gradient (blue to light blue)
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  };

  const handleSubmit = async () => {
    if (message !== "") {
      if (product === "select") {
        setProductError("Please select a product");
        return; // Exit the function early if product is not selected
      } else {
        setLoading(true);
        // Send client info to the backend
        axios
          .post("/contact-us", {
            email: userEmail,
            firstname: userFirstname,
            lastname: userLastname,
            company: userCompany,
            product,
            message,
          })
          .then((response) => {
            setLoading(false);
            if (response.status === 200) {
              setMessage("");
              setProduct("select");
              setMessageError("");
              notifications.show({
                title: "Enquiry Sent",
                message:
                  "One of our representatives will be in touch with you shortly. Thank you!",
                color: "teal",
                icon: <CircleCheck size={24} color="white" />,
              });

              console.log("Client details sent successfully!");
              // Handle any success notification if needed
            } else {
              notifications.show({
                title: "Enquiry Failed",
                message: "Please contact the support team. Thank you!",
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
              title: "Enquiry Failed",
              message: "Please contact the support team. Thank you!",
              color: "red",
              icon: <AlertCircle size={24} color="white" />,
            });
            // Handle any error notification if needed
          });
      }
    } else {
      setMessageError("Please enter message");
      return;
    }
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
            <h4>Manav Energy Pvt. Ltd.</h4>
            <p>
              Address: #28 Punarvasu, 1st & 2nd Floor, 32nd F Cross Road, East
              End Main Road, Jayanagar 4th T Block
            </p>
            <p>City: Bangalore</p>
            <p>Country: India</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Email: contact@manavenergy.com</p>
            <p>Working Hours: 9:30 AM - 6:30 PM</p>
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
            <TextInput
              label="Full Name"
              value={`${userFirstname} ${userLastname}`}
              required
              disabled
            />
            <TextInput
              label="Email"
              value={userEmail}
              type="email"
              disabled
              required
            />
            <Select
              dropdownPosition="top"
              label="Product"
              placeholder="Select"
              searchable
              value={product}
              error={productError}
              onChange={(selectedValue) => {
                // Update the state with the selected value
                handleProductChange(selectedValue);
              }}
              defaultValue={{ value: "select", label: "Select One" }}
              nothingFound="No options"
              dropdownComponent="div"
              data={[
                { value: "select", label: "Select One" },
                { value: "lmas", label: "LMAS" },
                { value: "smart_earthing", label: "Smart Earthing" },
                { value: "rferm", label: "RFERM" },
                { value: "maintanance", label: "Maintenance Assistance" },
                { value: "order", label: "Place Order" },
                { value: "other", label: "Other" },
              ]}
              required
              styles={(theme) => ({
                item: {
                  // applies styles to selected item

                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.violet[4]
                          : theme.colors.blue[2],

                      color:
                        theme.colorScheme === "dark"
                          ? theme.white
                          : theme.white,
                    },
                  },

                  // applies styles to hovered item (with mouse or keyboard)

                  "&[data-hovered]": {},
                },
              })}
            />
            <Textarea
              label="Message"
              placeholder="Enter your message"
              value={message}
              style={{ marginBottom: "1rem" }}
              onChange={handleMessageChange}
              required
              error={messageError}
            />
            <Button
              type="submit"
              radius="xl"
              ml="xl"
              mb="md"
              onClick={handleSubmit}
              loading={loading}
            >
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
