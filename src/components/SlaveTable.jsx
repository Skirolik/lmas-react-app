// SlaveTable.jsx
import React from "react";
import { Modal, Table, Button, Text, Paper, Divider } from "@mantine/core";
import { useState } from "react";
import axios from "axios";

const SlaveTable = ({ errorValues, onClose, onForceError }) => {
  console.log("bro", errorValues);
  const [forcedClick, setForcedClick] = useState(false);

  const handleForceClick = async () => {
    // Implement your logic for the "Force" action for all IDs here
    console.log("Error values i get:", errorValues);
    try {
      const slaveIds = errorValues
        .map((slave) => slave.label.split(","))
        .flat()
        .map((id) => id.trim());

      console.log("slave ids in one", slaveIds);
      await axios.put("http://localhost:3000/api/acknowledge-error", {
        slave_id: slaveIds, // Assuming label is the error ID
      });

      console.log("ev", errorValues);
      alert(
        `Force action for all IDs: ${errorValues
          .map((slave) => slave.label)
          .join(", ")}`
      );
      setForcedClick(true);

      onForceError();
    } catch (error) {
      console.log("Error Occured in acknowledgment", error);
    }
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
        {forcedClick ? (
          <>
            <Text align="center" size="xl" style={{ marginBottom: 16 }}>
              Force signal sent to slave's
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
                <tr>
                  <td>No Error</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </>
        ) : (
          <>
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
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default SlaveTable;
