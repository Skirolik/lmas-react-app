import React, { useState, useEffect } from "react";
import ReactFlow, { Background, MiniMap, Controls } from "react-flow-renderer";
import initialNodes from "./nodes.jsx";
import initialEdges from "./edges.jsx";
import CustomNode from "./CustomNode";
import NewNode from "./NewNode.jsx";
import { useMantineTheme, Button, Grid } from "@mantine/core";
import useErrorValues from "./useErrorValues.jsx";
import SlaveTable from "./SlaveTable.jsx";
import "./animation.css";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import axios from "axios";

const applyErrorStyles = (nodes, uniqueErrorIds, setNodes) => {
  console.log("value i get ", uniqueErrorIds);

  console.log(
    "All Node IDs:",
    nodes.map((node) => node.id)
  );
  // You can also filter or transform the IDs as needed:
  const slaveNodeIds = nodes
    .filter((node) => node.id.startsWith("SB-"))
    .map((node) => node.id);
  console.log("Slave Node IDs:", slaveNodeIds);
  const matchingNodeIds = slaveNodeIds.filter((nodeId) =>
    uniqueErrorIds.includes(nodeId)
  );

  console.log("matching nodes", matchingNodeIds);
  // notifications.show({
  //   title: "Request Failed",
  //   message: `An Error has occured in slave ${uniqueErrorIds}`,
  //   color: "red",
  //   icon: <AlertCircle size={24} color="black" />,
  // });

  setNodes((prevNodes) =>
    prevNodes.map((node) =>
      matchingNodeIds.includes(node.id)
        ? {
            ...node,
            style: {
              ...node.style,
              backgroundColor: "red", // Apply error color
            },
          }
        : node
    )
  );

  // Log matching IDs or a message if none found:
  if (matchingNodeIds.length > 0) {
    console.log(
      "Matching Node IDs (Slave Nodes with Errors):",
      matchingNodeIds
    );
  } else {
    console.log("No matching slave nodes found with errors.");
  }
};

const BinaryTree = () => {
  const theme = useMantineTheme();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showSlaveTable, setShowSlaveTable] = useState(false);
  const [errorValues, setErrorValues] = useState([]);
  const [liveErrors, setLiveErrors] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [acknowledgedErrors, setAcknowledgedErrors] = useState([]);

  const [mac_id, setMAC] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // const errorTable = ["sl-1", "sl-214", "sl-378"];
  // const { errorValues } = useErrorValues(errorTable);
  // console.log("tt", errorValues);
  // const uniqueErrorIds = Array.from(
  //   new Set(errorValues.map((error) => error.id))
  // );
  // console.log("error ids", uniqueErrorIds);

  const fetchData = async () => {
    try {
      // Make a request to fetch last 10 minutes error data
      const response = await axios.get("http://localhost:3000/api/last_10_min");
      const last10MinErrors = response.data;
      console.log("Received 10 min error data:", last10MinErrors);

      // Extract the slave_ids from the error data
      const errorIds = last10MinErrors.map((error) => error.slave_id);
      console.log("Extracted errorIds:", errorIds);

      // Extract associated nodes using error.slave_id for styling
      const uniqueAssociatedNodes = Array.from(
        new Set(
          errorIds.map((errorId) => {
            const slaveId = parseInt(errorId.split("-")[1]);
            const associatedNodeNumber = Math.ceil(slaveId / 100);
            return `SB-${associatedNodeNumber}`;
          })
        )
      );

      // Create live error data with the required format
      const liveErrorData = uniqueAssociatedNodes.map((associatedNode) => {
        const errorsForNode = errorIds.filter((errorId) => {
          const slaveId = parseInt(errorId.split("-")[1]);
          const associatedNodeNumber = Math.ceil(slaveId / 100);
          return `SB-${associatedNodeNumber}` === associatedNode;
        });

        return {
          id: associatedNode,
          label: errorsForNode.join(", "),
          isError: true,
          timestamp: new Date().getTime(),
        };
      });

      // Set liveErrors and apply styles using the associated nodes
      setLiveErrors(liveErrorData);
      applyErrorStyles(nodes, uniqueAssociatedNodes, setNodes);
    } catch (error) {
      console.error("Error fetching last 10 minutes error data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data only on the first render
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:2000`);

    socket.onopen = () => {
      console.log("websocket connection established");
    };

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log("error data", data);
      const [slaveId, masterValue, slaveValueData] = data;

      if (slaveValueData === "ERROR") {
        const timestamp = new Date().getTime();
        const timeGot = new Date(timestamp).toLocaleString();
        console.log("Time stamp of error", timeGot);

        const errorsWithAssociatedNode = [slaveId].map((error) => {
          const slaveId = parseInt(error.split("-")[1]);
          const associatedNodeNumber = Math.ceil(slaveId / 100);
          return `SB-${associatedNodeNumber}`;
        });

        const uniqueAssociatedNodes = Array.from(
          new Set(errorsWithAssociatedNode)
        );

        const finalErrorValues = uniqueAssociatedNodes.map((associatedNode) => {
          const errorsForNode = [slaveId];
          return {
            id: associatedNode,
            label: errorsForNode.join(", "),
            isError: true,
            timestamp,
          };
        });

        // Send the error data to the server using Axios
        try {
          await axios.post("http://localhost:3000/api/error-data", {
            slave_id: slaveId,
            error_time_val: timeGot,
          });
        } catch (error) {
          console.error("Error sending error data to server:", error);
        }

        setLiveErrors((prevErrors) => [...prevErrors, ...finalErrorValues]);

        const tenMinutesAgo = new Date(
          timestamp - 10 * 60 * 1000
        ).toLocaleString();
        console.log("time", tenMinutesAgo);

        setLiveErrors((prevErrors) =>
          prevErrors.filter((error) => error.timestamp > tenMinutesAgo)
        );

        if (JSON.stringify(finalErrorValues) !== JSON.stringify(errorValues)) {
          setErrorValues(finalErrorValues);
          applyErrorStyles(nodes, uniqueAssociatedNodes, setNodes);
        }
      }
    };

    socket.onclose = () => {
      console.log("websocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [nodes, isFirstRender]);

  useEffect(() => {
    // After the initial render, set isFirstRender to false
    setIsFirstRender(false);
  }, []);

  // const handleApplyErrorStyles = () => {
  //   applyErrorStyles(nodes, uniqueErrorIds, setNodes);
  // };

  const handleShowSlaveTable = () => {
    setShowSlaveTable(true);
  };

  const nodeTypes = {
    customNode: ({ data }) => (
      <CustomNode data={data} errorValues={errorValues} />
    ),
    newNode: NewNode,
  };

  const resetStateAndFetchData = async () => {
    console.log("trying to reset");
    console.log("initial node", initialNodes);
    setNodes(initialNodes); // Reset nodes to initial state
    setEdges(initialEdges); // Reset edges to initial state
    setShowSlaveTable(false); // Hide the slave table

    // Fetch new data after resetting the state
  };

  return (
    <div style={{ height: "680px", width: "100%" }}>
      <div>
        <Grid mb="sm">
          <Grid.Col md={4} lg={1}></Grid.Col>
          <Grid.Col md={2} lg={8}></Grid.Col>
          <Grid.Col md={4} lg={1}>
            <Button
              mb="xl"
              mt="xl"
              radius="xl"
              variant="gradient"
              gradient={{ from: "rgba(255, 153, 153, 1)", to: "red", deg: 324 }}
              onClick={handleShowSlaveTable}
            >
              Force Error
            </Button>
          </Grid.Col>
        </Grid>
      </div>
      {showSlaveTable && (
        <SlaveTable
          errorValues={liveErrors}
          onClose={() => setShowSlaveTable(false)}
          onForceError={() => resetStateAndFetchData()}
        />
      )}
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        fitView
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
      >
        <Background
          color={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray
          }
          variant={"dots"}
        />

        <Controls />
      </ReactFlow>
    </div>
  );
};

export default BinaryTree;
