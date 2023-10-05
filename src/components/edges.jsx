const edges = [
  {
    id: "a1-a2",
    source: "A-1",
    target: "A-2",
    type: "smoothstep",
    style: { stroke: "green" },
  },
  {
    id: "a1-a3",
    source: "A-1",
    target: "A-3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "red" },
  },
  {
    id: "a1-a4",
    source: "A-1",
    target: "A-4",
    type: "smoothstep",
    animated: true,
    style: { stroke: "red" },
    value: "0",
  },
  {
    id: "a1-a5",
    source: "A-1",
    target: "A-5",
    type: "smoothstep",
    animated: true,
    style: { stroke: "red" },
  },
];

export default edges;
