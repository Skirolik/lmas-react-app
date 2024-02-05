import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
import EachNode from "./EachNode";
import RepeterNode from "./RepeterNode";

const Each_slave_layout = ({ start, end, repeterId }) => {
  const nodes = [];
  const edges = [];
  const rows = 6;
  const columns = 10;
  const nodePadding = 50;

  const repeterNode = {
    id: repeterId,
    type: "repeter",
    data: { label: repeterId },
    position: { x: 10, y: 30 },
  };
  nodes.push(repeterNode);

  for (let i = start; i <= end; i++) {
    const row = Math.floor((i - start) / columns);
    const column = (i - start) % columns;
    const x = 300 + column * (nodePadding + 150);
    const y = 50 + row * (nodePadding + 50);

    const slaveNode = {
      id: `sl-${i}`,
      type: "slave",
      data: { label: `sl-${i}` },
      position: { x, y },
    };

    nodes.push(slaveNode);

    if (i < end) {
      edges.push({
        id: `edge-${i}`,
        source: `sl-${i}`,
        target: `sl-${i + 1}`,
        animated: false,
        style: { stroke: "green" },
      });
    }
  }
  // const canvasGrid = {
  //   id: "canvasGrid",
  //   type: "group",
  //   position: { x: 150, y: 20 },
  //   style: {
  //     width: "100vh",
  //     height: "100%",
  //     backgroundColor: "rgba(240,240,240,0.25)",
  //   },
  //   data: {
  //     label: "Canvas Grid",
  //   },
  //   children: nodes.map((node) => node.id), // Add node IDs as children
  // };
  // nodes.push(canvasGrid);
  const edge = {
    id: "canvasGrid-repeter-edge", // Unique edge ID
    source: repeterId,
    target: `sl-${start}`,
    type: "smoothstep",
    animated: true,
    style: { stroke: "green" },
    // Optional: Customize edge appearance using React Flow props
  };

  // Update edges array:
  edges.push(edge);

  const elements = nodes.concat(edges);

  const nodeTypes = {
    repeter: RepeterNode,
    slave: EachNode,
  };

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        fitView
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
      >
        <Background color="#E7F5FF" variant="dots" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Each_slave_layout;
