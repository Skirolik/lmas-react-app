// SlaveTable.jsx
import React from "react";
import { Modal, Table, Button, Text, Paper, Divider } from "@mantine/core";

const SlaveTable = ({ errorValues, onClose }) => {
  console.log("bro", errorValues);

  const handleForceClick = () => {
    // Implement your logic for the "Force" action for all IDs here
    alert(
      `Force action for all IDs: ${errorValues
        .map((slave) => slave.label)
        .join(", ")}`
    );
  };

  return (
    <Modal
      opened
      onClose={onClose}
      title="Error Table"
      size="md"
      style={{ width: "80%" }}
    >
      <Paper shadow="md" radius="lg" p="xl">
        <Text align="center" size="xl" style={{ marginBottom: 16 }}>
          Error Table
        </Text>
        <Divider size="lg" />
        <Table
          striped
          highlightOnHover
          withColumnBorders
          verticalSpacing="xs"
          horizontalSpacing="md"
          data={errorValues}
        >
          <thead>
            <tr>
              <th>Slave Block</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {errorValues.map((slave, index) => (
              <tr key={`${slave.id}-${index}`}>
                <td>{slave.id}</td>
                <td>{slave.label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          mt=""
          size="compact-xs"
          variant="gradient"
          ml="xs"
          onClick={handleForceClick}
        >
          Force
        </Button>
      </Paper>
    </Modal>
  );
};

export default SlaveTable;
