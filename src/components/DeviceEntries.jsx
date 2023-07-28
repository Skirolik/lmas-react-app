import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Pagination,
  Text,
  useMantineTheme,
  Grid,
  Modal,
} from "@mantine/core";

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

  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://localhost:9000";

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("mysql", data);
  // console.log("Data1", data[0][6]);

  //Table Code
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
    console.log("rowData", selectedEntry);
  };

  return (
    <div>
      <h1>Saved Data</h1>
      <Grid mt="xl">
        <Grid.Col md={4} lg={4}></Grid.Col>
        <Grid.Col md={4} lg={4}>
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
                  {/* <th>Longitude</th>
                <th>Latitude</th>

                <th>Name</th> */}
                  <th>Resistance</th>
                  <th>Date Collected</th>
                  <th>Next_collection</th>

                  {/* Add more column headers as needed */}
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((row) => (
                  <tr key={row.id} onClick={() => handleRowClick(row)}>
                    {/* Use the ID field (assuming it's row[0]) as the key */}
                    <td>{row.id}</td>
                    {/* <td>{row.longitude}</td>
                  <td>{row.latitude}</td>
                  <td>{row.name}</td> */}
                    <td>{row.resistance}</td>
                    <td>{formatDate(row.date_collected)}</td>
                    <td>{formatDate(row.next_collection)}</td>
                    {/* Render additional row data as needed */}
                  </tr>
                ))}
              </tbody>
            </Table>
            {selectedEntry && (
              <Modal
                opened={!!selectedEntry}
                onClose={() => setSelectedEntry(null)}
                title={`Details of the Entry ID ${selectedEntry.row}`}
                overflow="outside"
              >
                {" "}
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
        <Grid.Col md={4} lg={4}></Grid.Col>
      </Grid>
    </div>
  );
};

export default DeviceEntries;
