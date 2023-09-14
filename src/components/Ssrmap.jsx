import React, { useEffect, useState } from "react";

import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";

// import Calendar_tab from "../Calendar_tab";

import SubmitSuccess from "./SubmitSuccess";

import {
  Grid,
  TextInput,
  Button,
  Box,
  Card,
  Text,
  Popover,
} from "@mantine/core";

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

  const [newPlace, setNewPlace] = useState({ lat: 0, lng: 0 });

  const [data, setData] = useState([]);

  //latitude and longitude

  const [lat, setLat] = useState([]);

  const [long, setLong] = useState([]);

  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");

  //temperature, moisture, name (openWeather)

  const [tempt, setTempt] = useState([]);

  const [hum, setHum] = useState([]);

  const [name, setName] = useState([]);

  const handleLatChange = (e) => {
    const newLat = e.target.value;
    setLat(newLat);
    if (!isValidLatitude(newLat)) {
      setLatError("Invalid latitude");
    } else {
      setLatError("");
    }
  };

  const handleLongChange = (e) => {
    const newLong = e.target.value;
    setLong(newLong);
    if (!isValidLongitude(newLong)) {
      setLongError("Invalid longitude");
    } else {
      setLongError("");
    }
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

  const handleLatLong = async (e) => {
    if (!/^(?:6[0-9]|7[0-9]|8[0-9]|90)(?:\.\d+)?$/.test(long)) {
      notifications.show({
        title: "Invalid Input",

        message: "Please enter a valid longitude of India",

        color: "red",
      });
    } else if (!/^-?((90(\.0+)?)|([0-8]?[0-9](\.\d+)?))$/.test(lat)) {
      notifications.show({
        title: "Invalid Input",

        message: "Please enter a valid latitude of India",

        color: "red",
      });
    } else if (long != "" && lat != "") {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`
      );

      const response = await api_call.json();

      // console.log("response:", response);

      // setData(response);

      setTempt(response?.main?.temp);

      console.log("Temperature is:", tempt);

      setHum(response?.main?.humidity);

      console.log("Humidity is:", hum);

      setName(response?.name);
    }
    // console.log("data:", data);
  };

  const handleInputBlur = () => {
    handleLatLong(); // Trigger on blur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit");

    console.log(lat);

    if (!/^(?:6[0-9]|7[0-9]|8[0-9]|90)(?:\.\d+)?$/.test(long)) {
      notifications.show({
        title: "Invalid Input",

        message: "Please enter a valid longitude of India",

        color: "red",
      });
    } else if (!/^-?((90(\.0+)?)|([0-8]?[0-9](\.\d+)?))$/.test(lat)) {
      notifications.show({
        title: "Invalid Input",

        message: "Please enter a valid latitude of India",

        color: "red",
      });
    } else {
      const blog = { long, lat, tempt, hum };

      try {
        const map_call = await fetch(
          `http://49.204.77.190:9000/customapi?lat=${lat}&long=${long}&tempt=${tempt}&hum=${hum}`
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
        <SubmitSuccess setShowSubmitSuccess={setShowSubmitSuccess} />
      ) : (
        <Grid>
          <Grid.Col md={2} lg={2}></Grid.Col>

          <Grid.Col xs={12} sm={6} md={6} lg={4}>
            <Popover
              width={200}
              position="bottom"
              withArrow
              shadow="md"
              mt="xl"
              mb="xl"
            >
              <Popover.Target>
                <Button mt="xl" radius="xl" variant="gradient">
                  Toggle popover
                </Button>
              </Popover.Target>

              <Popover.Dropdown>
                <Text size="md">
                  1.Click on Map or Enter Lat , Lon, Tmeperature and Humidity
                </Text>

                <Text size="md">
                  2. Click Submit and get the predicted live Soil Resistivity
                  Value
                </Text>
              </Popover.Dropdown>
            </Popover>

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
              maw={400}
              mx="auto"
              onSubmit={handleSubmit}
            >
              <Text mb="xl"> Soil Resitivity Prediction</Text>

              <TextInput
                label="Longitude"
                labelProps={{ style: { fontSize: "16px", fontWeight: 600 } }}
                mb="xl"
                type="number"
                id="longitude"
                name="longitude"
                placeholder="Longitude"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                onBlur={handleInputBlur}
                error={!/^(?:6[0-9]|7[0-9]|8[0-9]|90)(?:\.\d+)?$/.test(long)}
                required
              />
              {longError && <p className="error-message">{longError}</p>}

              <TextInput
                label="Latitude"
                labelProps={{ style: { fontSize: "16px", fontWeight: 600 } }}
                mb="xl"
                type="number"
                id="latitude"
                name="latitude"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                onBlur={handleInputBlur}
                error={!/^-?((90(\.0+)?)|([0-8]?[0-9](\.\d+)?))$/.test(lat)}
                step="0.0001"
                required
              />
              {latError && <p className="error-message">{latError}</p>}

              <TextInput
                label="Temperature"
                labelProps={{ style: { fontSize: "16px", fontWeight: 600 } }}
                mb="xl"
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
                labelProps={{ style: { fontSize: "16px", fontWeight: 600 } }}
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

                // onClick={() => router.push("/landing_page")}

                // onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} md={6} lg={4} style={{ flex: 2 }}>
            {!showSubmitSuccess && (
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
