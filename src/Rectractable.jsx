import React from "react";
import Binary_tree from "./components/Binary_tree";
import { ReactFlowProvider } from "reactflow";
import { Text } from "@mantine/core";

const Rectractable = () => {
  return (
    <>
      <Text ta="center" fw={700} td="underline" size="xl">
        Plant Layout
      </Text>
      <ReactFlowProvider>
        <Binary_tree />
      </ReactFlowProvider>
    </>
  );
};

export default Rectractable;
