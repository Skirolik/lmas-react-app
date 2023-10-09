import React, { useState, useEffect } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import initialNodes from "./Nodes.jsx";
import initialEdges from "./Edges.jsx";
import CustomNode from "./CustomNode";

const nodeTypes = { customNode: CustomNode };

const updateNodeColors = (nodes, data) => {
  if (Array.isArray(data)) {
    const [id, masterValue, slaveValue, errorValue] = data[0];

    console.log("master", masterValue);
    console.log("slave", slaveValue);
    console.log("error", errorValue);

    const updatedNodes = nodes.map((node) => {
      let masterColor = "#E7F5FF";

      if (node.id === "masterNode") {
        // Condition 1
        if (masterValue === "ON" && slaveValue === "LOW") {
          masterColor = "#8CE99A"; //Green
        }

        // Condition 2
        else if (masterValue === "ON" && slaveValue === "HIGH") {
          masterColor = "#8CE99A"; //Green
        }

        // Condition 3
        else if (masterValue === "OFF" && slaveValue === "HIGH") {
          masterColor = "#FFEC99"; //Yellow
        }

        // Condition 4
        else {
          masterColor = "#E7F5FF"; //Light Blue
        }

        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor: masterColor,
          },
        };
      }

      if (node.id === "slaveNode-1") {
        let slaveColor = "#E7F5FF"; //Light Blue

        // Condition Error
        if (errorValue == 1) {
          slaveColor = "#F03E3E"; //Red
        }

        // Other Conditions
        else {
          if (masterValue === "ON" && slaveValue === "LOW") {
            slaveColor = "#FFEC99"; //Yellow
          }

          // Condition 2
          else if (masterValue === "ON" && slaveValue === "HIGH") {
            slaveColor = "#8CE99A"; //Green
          }

          // Condition 3
          else if (masterValue === "OFF" && slaveValue === "HIGH") {
            slaveColor = "#FFEC99"; //Yellow
          }

          // Condition 4
          else if (masterValue === "OFF" && slaveValue === "LOW") {
            slaveColor = "#E7F5FF"; //Light Blue
          }
        }
        return {
          ...node,
          style: {
            ...node.style,
            backgroundColor: slaveColor,
          },
        };
      }
      return node;
    });
    return updatedNodes;
  }
};

const updateEdgeStyles = (edges, data) => {
  if (Array.isArray(data)) {
    const [, , , errorValue] = data[0];
    let edgeAnimation = false;
    let edgeColor = "red";

    if (errorValue === 1) {
      // If errorValue is 1, set animated to true and style.stroke to "red" for relevant edges
      edgeAnimation = true;
      edgeColor = "red";
    } else {
      // If errorValue is 1, set animated to true and style.stroke to "red" for relevant edges
      edgeAnimation = false;
      edgeColor = "green";
    }

    return edges.map((edge) => {
      if (edge.id === "m-s1") {
        return {
          ...edge,
          animated: edgeAnimation,
          style: { ...edge.style, stroke: edgeColor },
        };
      }
      return edge;
    });
  }
  return edges;
};

const BinaryTree = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [mac_id, setMAC] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      window.location.href = "/"; // Redirect to login page if not logged in
    } else {
      setLoggedIn(true);

      const userMAC = "10";

      // WebSocket connection and data handling logic
      if (userMAC) {
        setMAC(userMAC);
        const socket = new WebSocket(`ws://127.0.0.1:7000`);

        socket.onopen = () => {
          const delay = 250; // Adjust the delay as needed
          setTimeout(() => {
            console.log("WebSocket connection established.");
            socket.send(userMAC); // Send the MAC to the WebSocket server
          }, delay);
        };
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("Received data:", data);

            // Update the node colors based on WebSocket data
            setNodes((prevNodes) => updateNodeColors(prevNodes, data));

            // Update the edge styles based on WebSocket data
            setEdges((prevEdges) => updateEdgeStyles(prevEdges, data));
          } catch (error) {
            console.error("Error parsing WebSocket data:", error);
          }
        };

        socket.onclose = () => {
          console.log("WebSocket connection closed");
        };

        return () => {
          socket.close();
        };
      }
    }
  }, []); // Removed the nodes dependency here

  useEffect(() => {
    // Use useEffect to simulate a reload when edges change
    // This will ensure the ReactFlow component re-renders when edges change
  }, [edges]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        fitView
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default BinaryTree;
