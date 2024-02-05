import { numRepeaters } from "./nodes";

const edges = [];
edges.push({
  id: "m1-m2",
  source: "masterNode2",
  target: "masterNode1",
  type: "smoothstep",
  animated: false,
  style: { stroke: "green" },
});
for (let i = 1; i <= numRepeaters; i++) {
  edges.push({
    id: `m-r${i}`,
    source: "masterNode1",
    target: `repeaterNode-${i}`,
    type: "smoothstep",
    animated: false,
    style: { stroke: "green" },
  });

  edges.push({
    id: `r${i}-s${i}`,
    source: `repeaterNode-${i}`,
    target: `SB-${i}`,
    type: "smoothstep",
    animated: false,
    style: { stroke: "green" },
  });
}

export default edges;
