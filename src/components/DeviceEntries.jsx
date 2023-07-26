import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Pagination,
  Text,
  useMantineTheme,
  Card,
  Grid,
  Modal,
} from "@mantine/core";

import LazyLoad from "react-lazy-load";
import { notifications } from "@mantine/notifications";

import {
  Map,
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2tpcm8iLCJhIjoiY2w1aTZjN2x2MDI3ODNkcHp0cnhuZzVicSJ9.HMjwHtHf_ttkh_aImSX-oQ";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const DeviceEntries = () => {
  const [data, setData] = useState([]);
  const theme = useMantineTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("mysql", data);

  // Table Code
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getTotalPages = () => {
    return Math.ceil(data.length / rowsPerPage);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const sortedData = data.slice().sort((a, b) => b[0] - a[0]); // Sort data in descending order based on row[0]
    console.log("sorted data", sortedData);
    return sortedData.slice(startIndex, endIndex);
  };

  const totalPages = getTotalPages();

  const activePageStyle = {
    backgroundImage:
      theme.colorScheme === "dark"
        ? "linear-gradient(45deg, #FFC0CB, violet)"
        : theme.colors.blue[6],
    border: 0,
  };
  const handleRowClick = (row) => {
    setSelectedEntry(row);

    // Check if next_collection date has passed the current date
    const nextCollectionDate = new Date(row.next_collection);
    const currentDate = new Date();

    if (nextCollectionDate < currentDate) {
      // Show a notification
      notifications.show({
        title: "Date Passed",
        message: `Next Collection date for ID ${row.id} (Pit: ${row.pitName}) has passed.`,
        color: "red",
        dismiss: null, // Set to null to make the notification stay until the user clicks on it
      });

      // Change the color of the selected table row to indicate the case
    } else {
      // If the next_collection date is valid (not passed), clear the modal message and reset row colors
      setModalMessage(null);
    }
  };

  useEffect(() => {
    data.forEach((entry) => {
      const nextCollectionDate = new Date(entry.next_collection);
      const currentDate = new Date();
      if (nextCollectionDate < currentDate) {
        notifications.show({
          title: "Date Passed",
          message: `Next Collection date for ID ${entry.id} (Pit: ${entry.pitName}) has passed.`,
          color: "red",
          dismiss: null,
        });
      }
    });
  }, [data]);

  return (
    <div>
      <h1>Saved Data</h1>
      <Grid container alignItems="stretch">
        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col xs={12} sm={6} md={6} lg={3} style={{ flex: 1 }}>
          <div>
            <Table
              striped
              highlightOnHover
              withBorder
              withColumnBorders
              verticalSpacing="xs"
              horizontalSpacing="xs"
              fontSize="xs"
              data={getPaginatedData()}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resistance</th>
                  <th>Date Collected</th>
                  <th>Next_collection</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((row) => (
                  <tr key={row.id} onClick={() => handleRowClick(row)}>
                    <td>{row.id}</td>
                    <td>{row.resistance}</td>
                    <td>{formatDate(row.date_collected)}</td>
                    <td>{formatDate(row.next_collection)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {totalPages > 1 && (
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={handlePageChange}
                size="sm"
                siblings={2}
                limit={1}
                boundaries={1}
                position="right"
                style={{ marginTop: "20px" }}
                styles={(currentTheme) => ({
                  control: {
                    "&[data-active]": activePageStyle,
                  },
                })}
              />
            )}
            {data.length === 0 && <Text>No data available.</Text>}
          </div>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} md={6} lg={6} style={{ flex: 2 }}>
          <Card style={{ height: "100%", overflow: "hidden" }}>
            <LazyLoad>
              <Map
                style={{ width: "100%", height: 400 }}
                initialViewState={{
                  latitude: 23.1957247,
                  longitude: 77.7908816,
                  zoom: 3.5,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                {data.map((entry) => (
                  <Marker
                    key={entry.id}
                    longitude={entry.longitude}
                    latitude={entry.latitude}
                    offsetLeft={-12}
                    offsetTop={-24}
                    color="red"
                  >
                    {/* You can customize the marker by using a custom SVG icon */}
                  </Marker>
                ))}
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
              </Map>
            </LazyLoad>
          </Card>
        </Grid.Col>
      </Grid>
      {selectedEntry && (
        <Modal
          opened={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Details of the Entry ID ${selectedEntry.id}`}
          overflow="outside"
        >
          <div>
            <Text mt="xl">Title: {selectedEntry.title}</Text>
            <Text mt="xl">Name: {selectedEntry.name}</Text>
            <Text mt="xl">Longitude: {selectedEntry.longitude}</Text>
            <Text mt="xl">Latitude: {selectedEntry.latitude}</Text>
            <Text mt="xl">Resistance: {selectedEntry.resistance}</Text>
            <Text mt="xl">
              Date Collected: {formatDate(selectedEntry.date_collected)}
            </Text>
            <Text mt="xl">
              Next Collection: {formatDate(selectedEntry.next_collection)}
            </Text>
            <Text mt="xl">Description: {selectedEntry.description}</Text>
            {/* Add more fields here as needed */}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeviceEntries;
