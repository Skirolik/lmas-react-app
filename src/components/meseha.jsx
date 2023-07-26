import React, { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Image,
  Card,
  useMantineTheme,
  Grid,
  Progress,
  Group,
  Center,
} from "@mantine/core";

import { Link } from "react-router-dom";

import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";

const api = {
  key: "a637bc8ded805a3c49a86ab76bd20f34",
  base: "https://api.openweathermap.org/data/2.5/",
};

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2tpcm8iLCJhIjoiY2w1aTZjN2x2MDI3ODNkcHp0cnhuZzVicSJ9.HMjwHtHf_ttkh_aImSX-oQ";

function meseha() {
  const theme = useMantineTheme();
  const [newPlace, setNewPlace] = useState(0);
  const [data, setData] = useState([]);
  //latitude and longitude
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  //temperature, moisture, name (openWeather)
  const [tempt, setTempt] = useState([]);
  const [hum, setHum] = useState([]);
  const [name, setName] = useState([]);

  const handleAddClick = async (e) => {
    // console.log(e.lngLat);
    const { lng, lat } = e.lngLat;
    // setNewPlace({
    //   lat,
    //   lng,
    // });
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

  const handleSubmit = async () => {
    e.preventDefault();
    const blog = { long, lat, tempt, hum };
    const map_call = await fetch(
      `http://localhost:4000/customapi?lat=${lat}&long=${long}&tempt=${tempt}&hum=${hum}`
    );

    const responce_data = await map_call.json();
    console.log(responce_data[0]);
    // console.log(responce_data[1]);
    const sr = responce_data[1];

    localStorage.setItem("soil", sr);
    localStorage.setItem("temp", tempt);
    localStorage.setItem("hum", hum);
    localStorage.setItem("long", long);
    localStorage.setItem("lat", lat);

    //soil_charateristics
    localStorage.setItem("cal", responce_data[0][0]);
  };

  return (
    <div>
      <h1 style={{ color: "red", fontSize: "100px" }}>Coming soon !!!!</h1>
      <Grid p="80px">
        <Grid.Col md={6} lg={1}></Grid.Col>
        <Grid.Col md={6} lg={5}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Map
              initialViewState={{
                latitude: 23.1957247,
                longitude: 77.7908816,
                zoom: 3.5,
              }}
              style={{ width: "100%", height: 650 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={handleAddClick}
              onRender={(event) => event.target.resize()}
            >
              {newPlace && (
                <Marker longitude={long} latitude={lat} color="blue" />
              )}
              <GeolocateControl position="top-left" />
              <NavigationControl position="top-left" />
            </Map>
          </Card>
        </Grid.Col>
        <Grid.Col md={6} lg={5}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text> Latitude</Text>
            <TextInput
              Label="Latitude"
              placeholder="Latitude"
              id="latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              disabled
            />
            <Text> Longitude</Text>
            <TextInput
              Label="Longitude"
              placeholder="Longitude"
              id="longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              disabled
            />
            <Text> Temperature</Text>
            <TextInput
              Label="Temperature"
              placeholder="Temperature"
              id="temperature"
              value={tempt}
              onChange={(e) => setTempt(e.target.value)}
              disabled
            />
            <Text>Humidity</Text>
            <TextInput
              Label="humidity"
              placeholder="humidity"
              id="humidity"
              value={tempt}
              onChange={(e) => setHum(e.target.value)}
              disabled
            />
          </Card>
        </Grid.Col>
        <Grid.Col md={6} lg={1}></Grid.Col>
      </Grid>
    </div>
  );
}

export default meseha;
