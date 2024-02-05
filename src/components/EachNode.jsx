import React from "react";
import { Handle, Position } from "react-flow-renderer";

const EachNode = ({ data, sourcePosition, targetPosition }) => {
  // Accept props
  return (
    <div
      style={{
        border: "1px solid #000",
        borderRadius: "1px",
        padding: "8px",
        backgroundColor: "#E7F5FF",
        color: "black",
      }}
    >
      <Handle type="target" position={targetPosition} />
      <div
        style={{ fontSize: "smaller", textAlign: "center", marginTop: "4px" }}
      >
        {data.label}
      </div>
      <Handle type="source" position={sourcePosition} />
    </div>
  );
};

export default EachNode;
