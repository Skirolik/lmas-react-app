const edges = [
  {
    id: "m-s1",
    source: "masterNode",
    target: "slaveNode-1",
    type: "smoothstep",
    animated: false,
    style: { stroke: "green" },
  },
  {
    id: "m-s2",
    source: "masterNode",
    target: "slaveNode-2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "red" },
  },
  {
    id: "m-s3",
    source: "masterNode",
    target: "slaveNode-3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "red" },
  },
  {
    id: "m-s4",
    source: "masterNode",
    target: "slaveNode-4",
    type: "smoothstep",
    animated: true,
    style: { stroke: "red" },
  },
];

export default edges;
