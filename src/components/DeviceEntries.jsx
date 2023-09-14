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
  Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { EditOff, Lock } from "tabler-icons-react";

import LazyLoad from "react-lazy-load";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "tabler-icons-react";

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
  const [currentCardPage, setCurrentCardPage] = useState(1);
  const rowsPerPage = 8;
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [editedDateCollected, setEditedDateCollected] = useState("");
  const [editedNextCollection, setEditedNextCollection] = useState("");
  const [editedRowId, setEditedRowId] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://49.204.77.190:3000/api/data")
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

  const handleCardChange = (newPage) => {
    setCurrentCardPage(newPage);
  };

  const getTotalPages = () => {
    return Math.ceil(data.length / rowsPerPage);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const sortedData = data.slice().sort((a, b) => b[0] - a[0]); // Sort data in descending order based on row[0]
    // console.log("sorted data", sortedData);
    return sortedData.slice(startIndex, endIndex);
  };

  const getCardPaginatedData = () => {
    const startIndex = (currentCardPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const sortedData = data.slice().sort((a, b) => b[0] - a[0]); // Sort data in descending order based on row[0]
    // console.log("sorted data", sortedData);
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
    if (editedRowId !== row.id) {
      setSelectedEntry(row);
      // Check if next_collection date has passed the current date
      const nextCollectionDate = new Date(row.next_collection);
      const currentDate = new Date();

      if (nextCollectionDate < currentDate) {
        // Show a notification
        notifications.show({
          title: "Date Passed",
          message: `Next Collection date for ID ${row.id}  has passed.`,
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      }
    }
  };

  useEffect(() => {
    data.forEach((entry) => {
      const nextCollectionDate = new Date(entry.next_collection);
      const currentDate = new Date();
      if (nextCollectionDate < currentDate) {
        notifications.show({
          title: "Date Passed",
          message: `Next Collection date for ID ${entry.id}  has passed.`,
          color: "red",

          icon: <AlertCircle size={24} color="black" />,
        });
      }
    });
  }, [data]);

  const popupStyle = {
    // backgroundColor: "lightgray",
    padding: "12px",
    borderRadius: "4px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
    color: "black",
  };
  const handleEditClick = (row) => {
    // Set the edited dates to the current row's dates
    setEditedDateCollected(row.date_collected);
    setEditedNextCollection(row.next_collection);
    // Set the edited row ID
    setEditedRowId(row.id);
  };
  const handleSaveClick = () => {
    const formattedDateCollected = new Date(editedDateCollected)
      .toISOString()
      .split("T")[0];
    const formattedNextCollection = new Date(editedNextCollection)
      .toISOString()
      .split("T")[0];

    // Send the updated date values to the server to update the entry in the database
    axios
      .post("http://49.204.77.190:3000/api/update-entry", {
        id: editedRowId,
        date_collected: formattedDateCollected,
        next_collection: formattedNextCollection,
      })
      .then((response) => {
        console.log(response.data.message); // Success message from the backend
        // Find the row in the data array with the editedRowId and update the date values
        const updatedData = data.map((row) => {
          if (row.id === editedRowId) {
            return {
              ...row,
              date_collected: editedDateCollected,
              next_collection: editedNextCollection,
            };
          }
          return row;
        });

        // Update the data state with the updatedData
        setData(updatedData);

        // Clear the edited row state variables
        setEditedRowId(null);
        setEditedDateCollected(null);
        setEditedNextCollection(null);
      })
      .catch((error) => {
        console.error("Error updating entry:", error);
        // Handle error here, show error message to the user, etc.
        notifications.show({
          title: "Entry not updated",
          message: "Error updating entry, please try again",
          color: "red",
        });
      });
  };

  return (
    <div style={{ margin: "0 20px" }}>
      <Grid>
        <Grid.Col xs={12} sm={12} md={12} lg={1} style={{ flex: 1 }} />
        <Grid.Col xs={12} sm={12} md={12} lg={5} style={{ flex: 1 }}>
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
                    onClick={() => setSelectedMarker(entry)}
                  >
                    {/* You can customize the marker by using a custom SVG icon */}
                  </Marker>
                ))}
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
                {selectedMarker && (
                  <Popup
                    latitude={selectedMarker.latitude}
                    longitude={selectedMarker.longitude}
                    style={popupStyle}
                    // closeButton={true}
                    onClose={() => setSelectedMarker(null)} // To close the popup when the close button is clicked
                    closeOnClick={false} // To prevent the map click from closing the popup
                  >
                    <div>
                      <button
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedMarker(null)}
                      >
                        Close
                      </button>
                      <h3>Details of the Entry ID {selectedMarker.id}</h3>
                      <p>Latitude: {selectedMarker.latitude}</p>
                      <p>Longitude: {selectedMarker.longitude}</p>
                      <p>Resistance: {selectedMarker.resistance}</p>
                      {/* Add more details as needed */}
                    </div>
                  </Popup>
                )}
              </Map>
            </LazyLoad>
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={5} style={{ flex: 1 }}>
          <Card style={{ height: "100%", overflow: "hidden" }}>
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
                    {/* <th>ID</th> */}
                    <th>Pit Name</th>
                    <th>Value</th>
                    <th>Collected</th>
                    <th>Next Date</th>
                    {/* <th>Edit</th> */}
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData().map((row) => (
                    <tr key={row.id} onClick={() => handleRowClick(row)}>
                      <td hidden>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.resistance}</td>
                      <td>
                        {editedRowId === row.id ? (
                          <DateInput
                            value={new Date(editedDateCollected)}
                            onChange={(date) =>
                              setEditedDateCollected(
                                date.toISOString().split("T")[0]
                              )
                            }
                          />
                        ) : (
                          formatDate(row.date_collected)
                        )}
                      </td>
                      <td>
                        {editedRowId === row.id ? (
                          <DateInput
                            value={new Date(editedNextCollection)}
                            onChange={(date) =>
                              setEditedNextCollection(
                                date.toISOString().split("T")[0]
                              )
                            }
                          />
                        ) : (
                          formatDate(row.next_collection)
                        )}
                      </td>
                      {/* <td>
                        {editedRowId === row.id ? (
                          <Lock
                            onClick={handleSaveClick}
                            size={18}
                            color="green"
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <EditOff
                            onClick={() => handleEditClick(row)}
                            size={18}
                            color="gray"
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </td> */}
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
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} sm={12} md={12} lg={1} style={{ flex: 1 }} />
      </Grid>
      <Grid>
        {getCardPaginatedData().map((row) => (
          <Grid.Col xs={12} sm={6} md={4} lg={3} key={row.id}>
            <Card
              key={row.id}
              shadow="xs"
              padding="lg"
              style={{ marginBottom: 20, borderRadius: "10px" }}
            >
              <h2 hidden>ID: {row.id}</h2>
              <h2>Name: {row.name}</h2>
              <p>Resistance: {row.resistance}</p>
              <p>
                Previous Collection:{" "}
                {editedRowId === row.id ? (
                  <DateInput
                    value={new Date(editedDateCollected)}
                    onChange={(date) =>
                      setEditedDateCollected(date.toISOString().split("T")[0])
                    }
                  />
                ) : (
                  formatDate(row.date_collected)
                )}
              </p>
              <p>
                Next Date:{" "}
                {editedRowId === row.id ? (
                  <DateInput
                    value={new Date(editedNextCollection)}
                    onChange={(date) =>
                      setEditedNextCollection(date.toISOString().split("T")[0])
                    }
                  />
                ) : (
                  formatDate(row.next_collection)
                )}
              </p>
              {editedRowId === row.id ? (
                <Button type="submit" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button type="submit" onClick={() => handleEditClick(row)}>
                  Edit
                </Button>
              )}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentCardPage}
          onChange={handleCardChange}
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
