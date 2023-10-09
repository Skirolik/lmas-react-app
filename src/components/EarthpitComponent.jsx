import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  Text,
  Select,
  List,
  TextInput,
  Card,
  Timeline,
  Spoiler,
} from "@mantine/core";
import { createStyles, useMantineTheme } from "@mantine/core";

import { useHover } from "@mantine/hooks";
import EarthpitSucess from "./EarthpitSuccess";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const EarthpitComponent = ({ setShowEarthpitSuccess, soilres }) => {
  const [earthpitSuccess, setEarthpitSuccess] = useState(false);

  const [targetResistance, setTargetResistnace] = useState(10);
  const [diameter, setDiameter] = useState(0.2);
  const [soilResistance, setSoilResistance] = useState(soilres);

  const [searchValue, onSearchChange] = useState("");
  console.log(soilres);

  const [data, setData] = useState([
    { value: 0.02, label: "0.02" },
    { value: 0.04, label: "0.04" },
    { value: 0.08, label: "0.08" },
    { value: 0.1, label: "0.1" },
    { value: 0.25, label: "0.25" },
    { value: 0.5, label: "0.5" },
  ]);
  const handleBackClick = () => {
    setShowEarthpitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(targetResistance);
    console.log(diameter);
    console.log(soilResistance);
    const t_r = targetResistance;
    console.log("target", t_r);

    try {
      const map_call = await fetch(
        `http://49.204.77.190:9000/verticalapi?resistance=${t_r}&sr=${soilResistance}&dia=${diameter}`
      );

      const responce_data = await map_call.json();
      console.log("value", responce_data);
      const couplers = responce_data[0];
      const pit = responce_data[1];
      const no_of_rods = responce_data[2];
      const rounded_len = responce_data[3];
      const curec_plus = responce_data[4];
      const curec_con = responce_data[5];
      const earth_bar = responce_data[6];
      const hardware_set = responce_data[7];

      console.log("couplers", couplers);

      localStorage.setItem("couplers", couplers);
      localStorage.setItem("pit", pit);
      localStorage.setItem("no_of_rods", no_of_rods);
      localStorage.setItem("rounded_len", rounded_len);
      localStorage.setItem("curec_plus", curec_plus);
      localStorage.setItem("curec_con", curec_con);
      localStorage.setItem("earth_bar", earth_bar);
      localStorage.setItem("hardware_set", hardware_set);
      localStorage.setItem("target_resistance", t_r);
      localStorage.setItem("diameter", diameter);
      localStorage.setItem("soil", soilResistance);

      setEarthpitSuccess(true);
      notifications.show({
        title: "Success !!",
        message:
          "Just view or Download the report. Contact us for further clarification",
        color: "teal",
        icon: <CircleCheck size={24} color="white" />,
      });
    } catch (error) {
      notifications.show({
        title: "Request Failed",
        message:
          "An Error has occured , try again if not please contact us by clicking on contact us page",
        color: "red",
        icon: <AlertCircle size={24} color="black" />,
      });
    }
  };

  return (
    <>
      {earthpitSuccess ? (
        <EarthpitSucess setEarthpitSuccess={setEarthpitSuccess} />
      ) : (
        <div>
          Earthpit Component
          <Grid>
            <Grid.Col md={2} lg={2}></Grid.Col>

            <Grid.Col xs={12} sm={6} md={6} lg={4}>
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
                maw={500}
                mx="auto"
                onSubmit={handleSubmit}
              >
                <Text mb="xl"> Earth PIT Calculator</Text>

                <Select
                  label="Diameter of rod"
                  placeholder={diameter}
                  searchable
                  onChange={setDiameter}
                  nothingFound="No options"
                  clearable
                  data={data}
                  onSearchChange={onSearchChange}
                  searchValue={searchValue}
                  mt="xl"
                />

                <TextInput
                  label="Soil Resistivity"
                  id="soil_resistivity"
                  name="soil_resistivity"
                  value={soilResistance}
                  //   value={long}
                  onChange={(e) => setSoilResistance(e.target.value)}
                  precision={2}
                  min={0}
                  step={0.05}
                  required
                  mt="xl"
                />
                <TextInput
                  label="Target Resistance"
                  type="number"
                  id="target_resistance"
                  name="target_resistance"
                  placeholder="Target Resistance"
                  value={targetResistance}
                  onChange={(e) => setTargetResistnace(e.target.value)}
                  required
                  mt="xl"
                />

                <Button
                  mt="xl"
                  radius="xl"
                  variant="gradient"
                  type="submit"
                  mb="xl"
                >
                  Submit
                </Button>
                <Button
                  mt="xl"
                  radius="xl"
                  ml="xl"
                  variant="gradient"
                  onClick={handleBackClick}
                >
                  Go Back
                </Button>
              </Box>
            </Grid.Col>

            <Grid.Col xs={12} sm={6} md={6} lg={5} style={{ flex: 2 }}>
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Text weight={500} ta="center" mt="xl" mb="xl">
                  HOW TO GET EARTHPIT DETAILS?
                </Text>

                <Timeline
                  active={2}
                  bulletSize={24}
                  lineWidth={3}
                  color="green"
                >
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

                <Text mt="xl" mb="xl">
                  {" "}
                  What we offer
                </Text>

                <Spoiler showLabel="Show more" hideLabel="Hide">
                  From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon
                  that has blue-green skin with darker patches. It has red eyes
                  with white pupils, pointed, ear-like structures on top of its
                  head, and a short, blunt snout with a wide mouth. A pair of
                  small, pointed teeth are visible in the upper jaw when its
                  mouth is open. Each of its thick legs ends with three sharp
                  claws. On Bulbasaur's back is a green plant bulb, which is
                  grown from a seed planted there at birth. The bulb also
                  conceals two
                </Spoiler>
              </Card>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </>
  );
};

export default EarthpitComponent;
