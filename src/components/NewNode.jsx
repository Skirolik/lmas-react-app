import React from "react";
import { Button } from "@mantine/core";
import { Handle, Position } from "reactflow"; // Import the Port component

const NewNode = ({ data }) => {
  //   console.log("bro", data);
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #000",
        borderRadius: "10px", // Adjust the border radius to make it oblong
        width: "60px", // Adjust the width for the oblong shape
        height: "30px", // Adjust the height for the oblong shape
      }}
    >
      <Handle type="target" id={data.label} position={Position.Top} />
      <div
        style={{
          fontSize: "smaller",
          textAlign: "center",
          marginTop: "4px",
        }}
      >
        {data.label}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default NewNode;
