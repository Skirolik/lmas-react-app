import React, { useState } from "react";
import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";
// import Calendar_tab from "../Calendar_tab";
import Submit_success from "../Submit_success";
import {
  Grid,
  TextInput,
  Button,
  Box,
  Card,
  Text,
  Group,
  Modal,
  Timeline,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Earthpit_component from "./Earthpit_component";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const api = {
  key: "a637bc8ded805a3c49a86ab76bd20f34",
  base: "https://api.openweathermap.org/data/2.5/",
};

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2tpcm8iLCJhIjoiY2w1aTZjN2x2MDI3ODNkcHp0cnhuZzVicSJ9.HMjwHtHf_ttkh_aImSX-oQ";

const Ssrmap = () => {
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [showEarthpitSuccess, setShowEarthpitSuccess] = useState(false);

  const [newPlace, setNewPlace] = useState({ lat: 0, lng: 0 });
  const [data, setData] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);
  //latitude and longitude
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  //temperature, moisture, name (openWeather)
  const [tempt, setTempt] = useState([]);
  const [hum, setHum] = useState([]);
  const [name, setName] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Earthpi Page");
    setShowEarthpitSuccess(true);
  };

  const handleAddClick = async (e) => {
    console.log(e.lngLat);
    const { lng, lat } = e.lngLat;

    setLat(lat);
    setLong(lng);
    setNewPlace({
      lat,
      lng,
    });

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lng}&units=metric&APPID=${api.key}`
    );
    const response = await api_call.json();
    // console.log("response:", response);
    // setData(response);
    setTempt(response?.main?.temp);
    console.log("Temperature is:", tempt);
    setHum(response?.main?.humidity);
    console.log("Humidity is:", hum);
    setName(response?.name);
    // console.log("data:", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    console.log(lat);

    if (!/^(?:6[0-9]|7[0-9]|8[0-9]|90)(?:\.\d+)?$/.test(long)) {
      notifications.show({
        title: "Invalid Input",
        message: "Please enter a valid number between 79 and 90.",
        color: "red",
      });
    } else if (!/^-?((90(\.0+)?)|([0-8]?[0-9](\.\d+)?))$/.test(lat)) {
      console.log("error");
    } else {
      const blog = { long, lat, tempt, hum };
      try {
        const map_call = await fetch(
          `http://localhost:4000/customapi?lat=${lat}&long=${long}&tempt=${tempt}&hum=${hum}`
        );

        const responce_data = await map_call.json();
        console.log("value", responce_data[0]);
        console.log(responce_data[1]);
        console.log("ionization gradeint", responce_data[2]);
        const sr = responce_data[1];
        const ion_gradient = responce_data[2];

        // window.location.href = "/submit_success";

        localStorage.setItem("soil", sr);
        localStorage.setItem("temp", tempt);
        localStorage.setItem("hum", hum);
        localStorage.setItem("long", long);
        localStorage.setItem("lat", lat);
        localStorage.setItem("ion", ion_gradient);

        //soil_charateristics
        localStorage.setItem("cal", responce_data[0][0]);
        localStorage.setItem("erosion", responce_data[0][1]);
        localStorage.setItem("Soil_depth", responce_data[0][2]);
        localStorage.setItem("salinity", responce_data[0][3]);
        localStorage.setItem("surface_texture", responce_data[0][4]);
        localStorage.setItem("sodacity", responce_data[0][5]);
        localStorage.setItem("flooding", responce_data[0][6]);
        localStorage.setItem("drainage", responce_data[0][7]);
        localStorage.setItem("surface_stoniness", responce_data[0][8]);
        localStorage.setItem("slope", responce_data[0][9]);
        localStorage.setItem("cal1", responce_data[0][10]);
        localStorage.setItem("erosion1", responce_data[0][11]);
        localStorage.setItem("Soil_depth1", responce_data[0][12]);
        localStorage.setItem("salinity1", responce_data[0][13]);
        localStorage.setItem("surface_texture1", responce_data[0][14]);
        localStorage.setItem("sodacity1", responce_data[0][15]);
        localStorage.setItem("flooding1", responce_data[0][16]);
        localStorage.setItem("drainage1", responce_data[0][17]);
        localStorage.setItem("surface_stoniness1", responce_data[0][18]);
        localStorage.setItem("slope1", responce_data[0][19]);

        notifications.show({
          title: "Success !!",
          message:
            "Just view or Download the report. Contact us for further clarification",
          color: "teal",
          icon: <CircleCheck size={24} color="white" />,
        });

        setShowSubmitSuccess(true);
      } catch (error) {
        notifications.show({
          title: "Request Failed",
          message:
            "Check your Latitude and logitude , it looks like you are out of india",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      }
    }
  };

  return (
    <div>
      <Text ta="center" tt="uppercase" mb="xl" fz="lg" fw={700}>
        Smart Earthing
      </Text>
      {showSubmitSuccess ? (
        <Submit_success
          setShowSubmitSuccess={setShowSubmitSuccess}
          setShowEarthpitSuccess={setShowEarthpitSuccess}
        />
      ) : showEarthpitSuccess ? (
        <Earthpit_component
          setShowEarthpitSuccess={setShowEarthpitSuccess}
          soilres={50}
        />
      ) : (
        <Grid>
          <Grid.Col md={2} lg={2}></Grid.Col>

          <Grid.Col xs={12} sm={6} md={6} lg={4}>
            <Modal
              opened={opened}
              onClose={close}
              //title="Instructions"
              centered
            >
              <Timeline active={2} bulletSize={24} lineWidth={3} color="green">
                <Timeline.Item title="Step - 1">
                  <Text size="sm" mt={4}>
                    CLick on MAP or Enter Longitude, Latitude, Temperature and
                    Humidity
                  </Text>
                </Timeline.Item>

                <Timeline.Item title="Step - 2">
                  <Text size="sm" mt={4}>
                    Click Submit and get the predicted live surface Soil
                    Resistivity Value
                  </Text>
                </Timeline.Item>

                <Timeline.Item title="Further Questions" lineVariant="dashed">
                  <Text color="dimmed" size="sm"></Text>
                  <Text size="sm" mt={4}>
                    Feel Free to contact us for assistance. Click on contact
                    page
                  </Text>
                </Timeline.Item>
              </Timeline>
            </Modal>

            <Group position="center">
              <Button
                onClick={open}
                mb="xl"
                radius="xl"
                size="lg"
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
              >
                Instructions
              </Button>
            </Group>

            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[2],
                textAlign: "center",
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                shadow: "xl",
              })}
              component="form"
              maw={600}
              mx="auto"
              onSubmit={handleSubmit}
            >
              <Text mb="xl"> Soil Resitivity Prediction</Text>
              <TextInput
                label="Longitude"
                type="number"
                id="longitude"
                name="longitude"
                placeholder="Longitude"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                error={!/^(?:6[0-9]|7[0-9]|8[0-9]|90)(?:\.\d+)?$/.test(long)}
                labelProps={{
                  style: {
                    fontSize: "16px",
                    fontWeight: 600,
                  },
                }}
                required
              />

              <TextInput
                label="Latitude"
                type="text" // Use type="text" to allow for custom validation
                id="latitude"
                name="latitude"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                error={
                  !/^-?((90(\.0+)?)|([0-8]?[0-9](\.\d+)?))$/.test(lat) // Check if lat is within the range -90 to 90
                }
                labelProps={{
                  style: {
                    fontSize: "16px",
                    fontWeight: 600,
                  },
                }}
                step="0.0001"
                required
              />

              <TextInput
                label="Temperature"
                type="number"
                id="temperature"
                name="temperature"
                placeholder="Temperature"
                value={tempt}
                onChange={(e) => setTempt(e.target.value)}
                required
              />

              <TextInput
                label="Humidity"
                type="number"
                id="humidity"
                name="humidity"
                placeholder="Humidity"
                value={hum}
                onChange={(e) => setHum(e.target.value)}
                required
              />
              <Button
                mt="xl"
                radius="xl"
                variant="gradient"
                type="submit"
                mb="xl"
                // onClick={() => router.push("/landing_page")}
                // onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                compact
                mt="xl"
                radius="xl"
                mr="xl"
                ml="xl"
                variant="outline"
                // onClick={() => router.push("/landing_page")}
                onClick={handleClick}
              >
                Earthpit Calculator
              </Button>
            </Box>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} md={6} lg={4} style={{ flex: 2 }}>
            {!showSubmitSuccess && !showEarthpitSuccess && (
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Map
                  initialViewState={{
                    latitude: 24.1195,
                    longitude: 81.115802,
                    zoom: 3.5,
                  }}
                  style={{ width: "100%", height: 650 }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken={MAPBOX_TOKEN}
                  onClick={handleAddClick}
                  onRender={(event) => event.target.resize()}
                >
                  {newPlace && lat >= -90 && lat <= 90 && (
                    <Marker longitude={long} latitude={lat} color="blue" />
                  )}
                  <GeolocateControl position="top-left" />
                  <NavigationControl position="top-left" />
                </Map>
              </Card>
            )}
          </Grid.Col>
        </Grid>
      )}

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Ssrmap;
