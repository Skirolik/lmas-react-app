import React from "react";
import { useState, useEffect, useRef } from "react";
import { Map, Marker, GeolocateControl, NavigationControl } from "react-map-gl";
import { Table, Button, Grid, Card, Text } from "@mantine/core";
import "jspdf-autotable";

import jsPDF from "jspdf";
import EarthpitComponent from "./components/EarthpitComponent";
import { IconDownload } from "@tabler/icons-react";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2tpcm8iLCJhIjoiY2w1aTZjN2x2MDI3ODNkcHp0cnhuZzVicSJ9.HMjwHtHf_ttkh_aImSX-oQ";

const SubmitSuccess = ({ setShowSubmitSuccess, setShowEarthpitSuccess }) => {
  const [earthpitCal, setEarthPitCal] = useState(false);

  //Get local storage values
  const soil_rsistivity = window.localStorage.getItem("soil");
  const ionization_gradeint = window.localStorage.getItem("ion");
  const longitude = parseFloat(window.localStorage.getItem("long")).toFixed(2); // Convert to float and round to 2 decimal places
  const latitude = parseFloat(window.localStorage.getItem("lat")).toFixed(2); // Convert to float and round to 2 decimal places
  const temperature = window.localStorage.getItem("temp");
  const hum = window.localStorage.getItem("hum");
  const cal = window.localStorage.getItem("cal");
  const erosion = window.localStorage.getItem("erosion");
  const Soil_depth = window.localStorage.getItem("Soil_depth");
  const salinity = window.localStorage.getItem("salinity");
  const surface_texture = window.localStorage.getItem("surface_texture");
  const sodacity = window.localStorage.getItem("sodacity");
  const flooding = window.localStorage.getItem("flooding");
  const drainage = window.localStorage.getItem("drainage");
  const surface_stoniness = window.localStorage.getItem("surface_stoniness");
  const slope = window.localStorage.getItem("slope");

  //Acosiate soil
  const cal1 = window.localStorage.getItem("cal1");
  const erosion1 = window.localStorage.getItem("erosion1");
  const Soil_depth1 = window.localStorage.getItem("Soil_depth1");
  const salinity1 = window.localStorage.getItem("salinity1");
  const surface_texture1 = window.localStorage.getItem("surface_texture1");
  const sodacity1 = window.localStorage.getItem("sodacity1");
  const flooding1 = window.localStorage.getItem("flooding1");
  const drainage1 = window.localStorage.getItem("drainage1");
  const surface_stoniness1 = window.localStorage.getItem("surface_stoniness1");
  const slope1 = window.localStorage.getItem("slope1");

  console.log("temp", temperature);
  console.log("Sr", soil_rsistivity);
  console.log("Cal", cal);
  console.log(setShowSubmitSuccess);

  const handleBackClick = () => {
    setShowSubmitSuccess(false);
    setShowEarthpitSuccess(false);
  };

  const heading = [
    "Calcorusness",
    "Erosion",
    "Soil_depth",
    "salinity",
    "surface_texture",
    "sodacity",
    "Flooding",
    "drainage",
    "SUrface Stoniness",
    "Slope",
  ];

  const valuesColumn1 = [
    cal,
    erosion,
    Soil_depth,
    salinity,
    surface_texture,
    sodacity,
    flooding,
    drainage,
    surface_stoniness,
    slope,
  ];
  const valuesColumn2 = [
    cal1,
    erosion1,
    Soil_depth1,
    salinity1,
    surface_texture1,
    sodacity1,
    flooding1,
    drainage1,
    surface_stoniness1,
    slope1,
  ];

  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  const table3Ref = useRef(null);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Add logo
    const logoImg = new Image();
    logoImg.src = "../src/assets/ManavLogo2021.png"; // Replace with the actual path to your logo image
    doc.addImage(logoImg, "PNG", 10, yPos, 30, 45); // Adjust the position and size

    yPos += 20;

    // Add report title
    doc.setFontSize(16);
    doc.text("Smart Earthing Report", 90, yPos);

    yPos += 20;

    // Add date and time
    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString(); // Format the date and time
    doc.setFontSize(10);
    doc.text(dateTimeString, 160, yPos);

    yPos += 20;

    // Add table data
    const table1 = table1Ref.current;
    const table2 = table2Ref.current;
    const table3 = table3Ref.current;

    if (table1 && table2 && table3) {
      doc.autoTable({
        html: table1,
        theme: "grid",
        styles: {
          cellPadding: 2,
          fontSize: 12,
          fillColor: "#f2f2f2", // Background color for cells
          textColor: "black", // Text color for cells
          halign: "center", // Text alignment
          valign: "middle", // Vertical alignment
        },
        startY: yPos,
      });
      yPos = doc.autoTable.previous.finalY + 10;
      doc.autoTable({
        html: table3,

        styles: {
          fillColor: "#f2f2f2", // Background color for cells
          textColor: "black", // Text color for cells
        },
        startY: yPos,
      });
      yPos = doc.autoTable.previous.finalY + 10;

      doc.autoTable({
        html: table2,
        startY: yPos,
      });
    }

    yPos += 150;

    doc.setFontSize(10);
    doc.text("* Contact Manav Energy For any doubts or querries", 20, yPos);

    doc.save("Smart-Earthing-report.pdf");
  };

  const handleClick = () => {
    console.log("Route to earth pit calculator");
    setEarthPitCal(true);
    setShowEarthpitSuccess(true);

    console.log("Soil ristivity", soil_rsistivity);
    console.log("Earth pit cal", earthpitCal);
  };

  return (
    <>
      {earthpitCal ? (
        <EarthpitComponent
          setShowEarthpitSuccess={setEarthPitCal}
          soilres={soil_rsistivity}
        />
      ) : (
        <div>
          <Text ta="center" tt="uppercase" fz="lg" fw={700}>
            Report
          </Text>

          <Grid>
            <Grid.Col md={2} lg={2}></Grid.Col>

            <Grid.Col md={2} lg={5}>
              <Table
                verticalSpacing="xs"
                fontSize="sm"
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                ref={table1Ref}
              >
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>
                      Soil Resistivity : {soil_rsistivity}
                    </th>
                    <th style={{ width: "20%" }}>Lognitude : {longitude}</th>

                    <th style={{ width: "20%" }}>Latitude : {latitude}</th>
                  </tr>
                </thead>
              </Table>
              <Table
                verticalSpacing="xs"
                fontSize="xs"
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                ref={table3Ref}
              >
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Temperatue : {temperature}</th>
                    <th style={{ width: "20%" }}>Humidity : {hum}</th>
                    <th style={{ width: "20%" }}>
                      Ionization Gradient : {ionization_gradeint}
                    </th>
                  </tr>
                </thead>
              </Table>

              <Table
                mt="xl"
                verticalSpacing="xs"
                fontSize="xs"
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                ref={table2Ref}
              >
                <thead>
                  <tr>
                    <th style={{ width: "33%", fontWeight: "bold" }}></th>
                    <th style={{ width: "33%", fontWeight: "bold" }}>Main</th>
                    <th style={{ width: "33%", fontWeight: "bold" }}>
                      Associate
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

              <Button
                mt="xl"
                radius="xl"
                variant="gradient"
                onClick={handleBackClick}
              >
                Go Back
              </Button>

              <Button
                mt="xl"
                ml="xl"
                radius="xl"
                variant="gradient"
                leftIcon={<IconDownload size="1rem" />}
                gradient={{ from: "teal", to: "lime", deg: 105 }}
                onClick={handleGeneratePDF}
              >
                Download
              </Button>
              <Button
                compact
                mt="xl"
                radius="xl"
                ml="xl"
                variant="outline"
                // onClick={() => router.push("/landing_page")}
                onClick={handleClick}
              >
                Earthpit Calculator
              </Button>
              <Text>* All values are Predicted </Text>
            </Grid.Col>
            <Grid.Col md={2} lg={3}>
              <Card>
                <Map
                  initialViewState={{
                    latitude: 24.1195,
                    longitude: 81.115802,
                    zoom: 3,
                  }}
                  style={{ width: "100%", height: 550 }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken={MAPBOX_TOKEN}
                  onRender={(event) => event.target.resize()}
                >
                  <Marker
                    longitude={longitude}
                    latitude={latitude}
                    color="green"
                  />
                </Map>
              </Card>
            </Grid.Col>
            <Grid.Col md={2} lg={2}></Grid.Col>
          </Grid>
        </div>
      )}
    </>
  );
};

export default SubmitSuccess;
