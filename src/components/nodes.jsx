const nodes = [
  {
    id: "A",
    type: "group",
    position: { x: 0, y: 0 },
    value: "20",
    style: {
      width: 400,
      height: 240,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "A-1",

    data: { label: "Master" },
    position: { x: 150, y: 80 },
    parentNode: "A",
    extent: "parent",
    draggable: false,
    value: "2",

    style: {
      width: 60,
    },
  },
  {
    id: "A-2",
    data: { label: "slave-1" },
    position: { x: 80, y: 150 },
    parentNode: "A",
    extent: "parent",
    draggable: false,
    value: "10",
    style: {
      width: 60,

      backgroundColor: "white",
    },
  },
  {
    id: "A-3",
    data: { label: "slave-2" },
    position: { x: 220, y: 150 },
    parentNode: "A",
    extent: "parent",
    value: "6",
    draggable: false,
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
  {
    id: "A-4",
    data: { label: "slave-3" },
    position: { x: 250, y: 20 },
    parentNode: "A",
    extent: "parent",
    value: "2",
    draggable: false,
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
  {
    id: "A-5",
    data: { label: "slave-4" },
    position: { x: 80, y: 20 },
    parentNode: "A",
    extent: "parent",
    value: "2",
    draggable: false,
    style: {
      width: 60,
      backgroundColor: "white",
    },
  },
];
export default nodes;
