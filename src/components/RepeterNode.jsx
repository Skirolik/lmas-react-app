import React from "react";
import { Button } from "@mantine/core";
import { Handle, Position } from "react-flow-renderer";

const RepeterNode = ({ data }) => {
  console.log("repeter", data);
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #000",
        borderRadius: "10px", // Adjust the border radius to make it oblong
        width: "60px", // Adjust the width for the oblong shape
        height: "30px",
        backgroundColor: "#efe3fc",
        color: "black", // Adjust the height for the oblong shape
      }}
    >
      <Handle type="target" id={data.label} position={Position.Left} />
      <div
        style={{
          fontSize: "smaller",
          textAlign: "center",
          marginTop: "4px",
        }}
      >
        {data.label}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default RepeterNode;
