import React, { useState, useEffect } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import { Input } from "@mantine/core";
import initaialNodes from "./nodes.jsx";
import initialEdges from "./edges.jsx";

const Binary_tree = () => {
  const [nodes, setNodes] = useState(initaialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newValue, setNewValue] = useState("");
  const [userInputId, setUserInputId] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  const handleNodeClick = (event, node) => {
    // Toggle the background color
    const newBackgroundColor = node.data.isBlue ? "white" : "pink";
    console.log(newBackgroundColor);
    console.log("style", node.style.backgroundColor);
    console.log("val", node.value);

    if (node.id === "A-2") {
      node.style.backgroundColor = newBackgroundColor;
    }

    // Update the node data to reflect the color change
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === "A-2"
          ? {
              ...n,
              data: {
                ...n.data,
                style: {
                  ...n.data.style,
                  backgroundColor: newBackgroundColor,
                },
                isBlue: !n.data.isBlue,
              },
            }
          : n
      )
    );
    console.log(nodes);
  };
  useEffect(() => {
    // Check the node values and update background colors
    const updatedNodes = nodes.map((node) => {
      const numericValue = parseFloat(node.value);
      console.log(numericValue);

      if (node.data && numericValue > 5) {
        console.log("hi");
        console.log("bg", node.style.backgroundColor);

        // Update background color and text color
        node.style.backgroundColor = "pink";
        node.style.color = "red";

        return {
          ...node,
          data: {
            ...node.data,
            style: {
              ...node.style,
              backgroundColor: "pink",
            },
          },
        };
      } else if (node.id === "A") {
        // Skip updating background color for the parent node
        return node;
      } else {
        // Reset background color and text color
        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor: "white",
            color: "black",
          },
        };
      }
    });

    setNodes(updatedNodes);
    console.log(nodes);
  }, [updateCount]);

  const handleUpdateClick = () => {
    console.log("new", newValue);

    // Update the value for the specific node specified by userInputId
    const updatedNodes = nodes.map((node) => {
      if (node.id === userInputId) {
        return {
          ...node,
          value: newValue,
        };
      } else {
        return node;
      }
    });

    setNodes(updatedNodes);
    setUpdateCount(updateCount + 1);
    console.log(nodes);
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        onNodeClick={handleNodeClick}
      >
        <Background />
      </ReactFlow>
      <div>
        <input
          type="text"
          placeholder="Enter value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter ID"
          value={userInputId}
          onChange={(e) => setUserInputId(e.target.value)}
        />
        <button onClick={handleUpdateClick}>Update</button>
      </div>
    </div>
  );
};

export default Binary_tree;
