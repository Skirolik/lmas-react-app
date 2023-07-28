import React, { useState } from "react";
import {
  TextInput,
  Button,
  NumberInput,
  Grid,
  Card,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const DeviceForm = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [resistance, setResistance] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [dateCollected, setDateCollected] = useState(null);
  const [nextCollection, setNextCollection] = useState(null);
  const [description, setDescription] = useState("");

  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://localhost:9000";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDateCollected =
      dateCollected && dateCollected.toISOString().substr(0, 10);
    const formattedNextCollection =
      nextCollection && nextCollection.toISOString().substr(0, 10);

    // Form data to be sent to the backend
    const formData = {
      latitude,
      longitude,
      resistance,
      name,
      title,
      dateCollected: formattedDateCollected,
      nextCollection: formattedNextCollection,
      description,
    };

    // Send the form data to the backend server
    axios
      .post("/submit-form", formData)
      .then((response) => {
        console.log(response.data.message); // Success message from the backend
        // Reset form fields after successful submission
        setLatitude("");
        setLongitude("");
        setResistance(0);
        setName("");
        setTitle("");
        setDateCollected(null);
        setNextCollection(null);
        setDescription("");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error here, show error message to the user, etc.
        notifications.show({
          title: "Form not submitted",
          message: "Check all fields",
          color: "red",
        });
      });
  };

  return (
    <Grid mt="xl">
      <Grid.Col md={4} lg={2}></Grid.Col>
      <Grid.Col md={4} lg={4}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <TextInput
              value={latitude}
              onChange={(e) => setLatitude(e.currentTarget.value)}
              label="Latitude"
              placeholder="Latitude"
              required
            />
            <TextInput
              value={longitude}
              onChange={(e) => setLongitude(e.currentTarget.value)}
              label="Longitude"
              placeholder="Longitude"
              required
            />
            <NumberInput
              value={resistance}
              onChange={(value) => setResistance(value)}
              label="Resistance"
              withAsterisk
            />
            <TextInput
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              label="Pit Name/Number"
              placeholder="Pit Name/Number"
              required
            />
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              label="Title"
              placeholder="Title"
              required
            />

            <DateInput
              value={dateCollected}
              onChange={setDateCollected}
              label="Date Collected"
              required
            />

            <DateInput
              value={nextCollection}
              onChange={setNextCollection}
              label="Next Collection"
              required
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              required
            />

            <Button type="submit" mt="xl">
              Submit
            </Button>
          </form>
        </Card>{" "}
      </Grid.Col>
      <Grid.Col md={4} lg={4}></Grid.Col>
      <Grid.Col md={4} lg={2}></Grid.Col>
    </Grid>
  );
};

export default DeviceForm;
