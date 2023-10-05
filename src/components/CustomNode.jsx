import React from "react";
import { Button } from "@mantine/core";
import { Handle } from "react-flow-renderer"; // Import the Port component

const CustomNode = ({ data }) => {
  console.log("darwa", data);
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #000", // Add a border style here
        borderRadius: "1px", // Optional: Add border radius for rounded corners
      }}
    >
      <Handle
        type="target"
        id={data.label}
        // Use a unique ID for the port, e.g., the label
        isValidConnection={(connection) => connection.source === "slave-1"}
        onConnect={(params) => console.log("handle onConnect", params)}
        onClick={() => alert("Port Clicked")}
      />
      <div
        style={{ fontSize: "smaller", textAlign: "center", marginTop: "4px" }}
      >
        {data.label}
      </div>
      <Button
        size=" compact-xs"
        ml="xs" // Set the button size to extra small
        style={{
          width: "fit-content", // Ensure button fits content width
          padding: "2px 5px", // Adjust padding for smaller size
          fontSize: "8px", // Adjust font size for smaller size
        }}
        onClick={() => alert("want to retry ")}
      >
        Force
      </Button>
    </div>
  );
};

export default CustomNode;
