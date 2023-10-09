import React from "react";
import CustomNode from "./CustomNode";

const canvasGrid = {
  id: "canvasGrid",
  type: "group",
  position: { x: 0, y: 0 },
  style: {
    width: 400,
    height: 260,
    backgroundColor: "rgba(240,240,240,0.25)",
  },
};

const masterNode = {
  id: "masterNode",

  data: { label: "Master" },
  position: { x: 160, y: 110 },
  draggable: false,
  value: "OFF",
  style: {
    width: 80,
    backgroundColor: "red", // Set the initial background color here
  },
};

const slaveNodes = [
  {
    id: "slaveNode-1",
    type: "customNode",
    data: {
      label: "Slave-1",
    },
    position: { x: 50, y: 195 },
    draggable: false,
    value: "LOW",
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
  {
    id: "slaveNode-2",
    type: "customNode",
    data: { label: "Slave-2" },
    position: { x: 290, y: 195 },
    // parentNode: "A",
    // extent: "parent",
    value: "OFF",
    draggable: false,
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
  {
    id: "slaveNode-3",
    data: { label: "Slave-3" },
    position: { x: 290, y: 10 },
    // parentNode: "A",
    // extent: "parent",
    value: "OFF",
    draggable: false,
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
  {
    id: "slaveNode-4",
    data: { label: "Slave-4" },
    position: { x: 50, y: 10 },
    // parentNode: "A",
    // extent: "parent",
    value: "OFF",
    draggable: false,
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
];

const nodes = [canvasGrid, masterNode, ...slaveNodes];

export default nodes;
