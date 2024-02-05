// nodes.js
import React from "react";
import CustomNode from "./CustomNode";
import NewNode from "./NewNode";

const canvasGrid = {
  id: "canvasGrid",
  type: "group",
  position: { x: 0, y: 0 },
  style: {
    width: 800,
    height: 340,
    backgroundColor: "rgba(240,240,240,0.25)",
  },
};

// First Master Node
const masterNode1 = {
  id: "masterNode1",
  data: { label: "M-1" },
  position: { x: 180, y: 20 },
  draggable: false,
  value: "OFF",
  style: {
    width: 100,
    backgroundColor: "#E7F5FF",
  },
};

// Second Master Node
const masterNode2 = {
  id: "masterNode2",
  data: { label: "M-2" },
  position: { x: 460, y: 20 },
  draggable: false,
  value: "OFF",
  style: {
    width: 100,
    backgroundColor: "#ffe8db",
  },
};

export const numRepeaters = 8;

// Repeater Nodes
const repeaterNodes = Array.from({ length: 4 }, (_, index) => ({
  id: `repeaterNode-${index + 1}`,
  data: { label: `R- ${index + 1}`, isSlave: false },
  type: "newNode",
  position: { x: 20 + index * 200, y: 140 },
  draggable: false,
  value: "OFF",
  style: {
    width: 60,
    borderRadius: "10px",
    color: "black",
    backgroundColor: "#efe3fc",
  },
}));

// Slave Nodes
const slaveNodes = Array.from({ length: 4 }, (_, index) => ({
  id: `SB-${index + 1}`,
  data: { label: `SB-${index + 1}`, isSlave: true },
  type: "customNode",
  position: { x: 20 + index * 200, y: 240 },
  draggable: false,
  value: "OFF",
  style: {
    width: 60,

    color: "black",
    backgroundColor: "#E7F5FF",
  },
}));

const nodes = [
  canvasGrid,
  masterNode1,
  masterNode2,
  ...repeaterNodes,
  ...slaveNodes,
];

export default nodes;
