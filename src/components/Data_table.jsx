import React, { useState } from "react";
import {
  Table,
  Pagination,
  Text,
  useMantineTheme,
  Modal,
  Paper,
  Divider,
} from "@mantine/core";

const Data_table = ({ data }) => {
  const theme = useMantineTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [selectedRow, setSelectedRow] = useState(null); // To store the selected row data
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

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

  // Function to handle row click and display modal
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Text ta="center" fz="xl">
        {" "}
        Data Table
      </Text>
      <Divider size="lg" />
      <Table
        mt="xl"
        striped
        highlightOnHover
        withColumnBorders
        verticalSpacing="xs"
        horizontalSpacing="md"
        data={getPaginatedData()}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date and Time</th>
            <th>Alert</th>
            {/* Add more column headers as needed */}
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((row) => (
            <tr
              key={row[0]}
              onClick={() => handleRowClick(row)} // Handle row click
              style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickable rows
            >
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[4]}</td>
              <td>{row[8]}</td>
              {/* Render additional row data as needed */}
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

      {/* Modal to display selected row details */}
      {selectedRow && (
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Close modal
          size="auto"
          transitionProps={{
            transition: "fade",
            duration: 500,
            timingFunction: "linear",
          }}
          overlayProps={{
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
            opacity: 0.55,
            blur: 3,
          }}
        >
          {/* Render selected row details in the modal */}
          <Paper shadow="md" radius="lg" p="xl">
            <Text mt="xl">ID: {selectedRow[0]}</Text>
            <Text mt="xl">Name: {selectedRow[1]}</Text>
            <Text mt="xl">Date and Time: {selectedRow[4]}</Text>

            <Text mt="xl">Electro Static: {selectedRow[5]}</Text>
            <Text mt="xl">Spark: {selectedRow[6]}</Text>
            <Text mt="xl">Environment: {selectedRow[7]}</Text>
            <Text mt="xl">Alert: {selectedRow[8]}</Text>
          </Paper>

          {/* Render additional row data as needed */}
        </Modal>
      )}

      {data.length === 0 && <Text>No data available.</Text>}
    </div>
  );
};

export default Data_table;
