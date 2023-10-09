import React from "react";
import { Button, Card, Grid, Table, Text } from "@mantine/core";

const EarthpitSuccess = ({ setEarthpitSuccess }) => {
  const soil_rsistivity = window.localStorage.getItem("soil");
  const couplers = window.localStorage.getItem("couplers");
  const pit = window.localStorage.getItem("pit");
  const no_of_rods = window.localStorage.getItem("no_of_rods");
  const rounded_len = window.localStorage.getItem("rounded_len");
  const curec_plus = window.localStorage.getItem("curec_plus");
  const curec_con = window.localStorage.getItem("curec_con");
  const earth_bar = window.localStorage.getItem("earth_bar");
  const hardware_set = window.localStorage.getItem("hardware_set");
  const diameter = window.localStorage.getItem("diameter");
  const target_resistance = window.localStorage.getItem("target_resistance");

  const handleBackClick = () => {
    setEarthpitSuccess(false);
  };

  const heading = [
    "Couplers",
    "No of Rods",
    "Curec Plus",
    "Curec Con",
    "Earth Bar",
    "Hardware Set",
  ];
  const valuesColumn1 = [
    couplers,
    no_of_rods,
    curec_plus,
    curec_con,
    earth_bar,
    hardware_set,
  ];
  const valuesColumn2 = [
    "couplers",
    "no_of_rods",
    "curec_plus",
    "curec_con",
    "earth_bar",
    "hardware_set",
  ];

  return (
    <div>
      <Grid>
        <Grid.Col md={2} lg={3}></Grid.Col>
        <Grid.Col md={2} lg={6}>
          <Card shadow="md" padding="lg" radius="lg" withBorder>
            <Text ta="center" tt="uppercase" fz="lg" fw={700} mb="xl">
              Earthpit Material
            </Text>
            <Table
              verticalSpacing="xs"
              fontSize="sm"
              striped
              highlightOnHover
              withBorder
              withColumnBorders
            >
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>
                    Soil Resistivity : {soil_rsistivity}
                  </th>
                  <th style={{ width: "20%" }}>
                    Target Resistance : {target_resistance}
                  </th>

                  <th style={{ width: "20%" }}>Diameter : {diameter}</th>
                  <th style={{ width: "20%" }}>Earth pit Required : {pit}</th>
                  <th style={{ width: "20%" }}>
                    Conductor Length : {rounded_len}
                  </th>
                </tr>
              </thead>
            </Table>
            <Text ta="center" mt="xl">
              Bill of Material
            </Text>
            <Table
              mt="xl"
              verticalSpacing="xs"
              fontSize="xs"
              striped
              highlightOnHover
              withBorder
              withColumnBorders
            >
              <thead>
                <tr>
                  <th style={{ width: "33%", fontWeight: "bold" }}></th>
                  <th style={{ width: "33%", fontWeight: "bold" }}>Quantity</th>
                  <th style={{ width: "33%", fontWeight: "bold" }}>
                    Product Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {valuesColumn1.map((value, index) => (
                  <tr key={index}>
                    <td>{heading[index]}</td>
                    <td>{value}</td>
                    <td>{valuesColumn2[index]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={3}></Grid.Col>
      </Grid>
      <Button mt="xl" radius="xl" variant="gradient" onClick={handleBackClick}>
        Go Back
      </Button>
    </div>
  );
};

export default EarthpitSuccess;
