import React from "react";
import Ssrmap from "./components/Ssrmap";

const SmartEarthpit = () => {
  const popupContent = {
    title: "SMART Earthing",
    paragraph:
      "Design your Earthpit and monitor the fault using Manav's inovative R-Ferm Technology.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ",
    bulletPoints: [
      "IiOT",
      "Check live data from anywhere",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  };
  return <Ssrmap />;
};

export default SmartEarthpit;
