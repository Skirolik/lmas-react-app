// SlaveTable.jsx
import React from "react";
import { Modal, Table, Button, Text, Paper, Divider } from "@mantine/core";
import Each_slave_layout from "./Each_slave_layout";

const DetailTable = ({ slaveData, onClose }) => {
  console.log(slaveData);

  return (
    <Modal
      opened
      onClose={onClose}
      title="Slave Table"
      size="md"
      style={{ width: "80%" }}
    >
      <Paper shadow="md" radius="lg" p="xl">
        <Text align="center" size="xl" style={{ marginBottom: 16 }}>
          Slave Table
        </Text>
        <Divider size="lg" />
        <Table
          striped
          highlightOnHover
          withColumnBorders
          verticalSpacing="xs"
          horizontalSpacing="md"
          data={slaveData}
        >
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {slaveData.map((slave) => (
              <tr key={slave.id}>
                <td>{slave.id}</td>
                <td>{slave.label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Modal>
  );
};

export default DetailTable;
