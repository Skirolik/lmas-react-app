import React from "react";
import ComingSoonPage from "./Coming_soon";

const smart_earthpit = () => {
  const popupContent = {
    title: "SMART Earthing",
    paragraph:
      "Design your Earthpit and monitor the fault using Manav's inovative R-Ferm Technology.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ",
    bulletPoints: [
      "IIOT",
      "Check live data from anywhere",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  };
  return (
    <ComingSoonPage
      title={popupContent.title}
      paragraph={popupContent.paragraph}
      bulletPoints={popupContent.bulletPoints}
    />
  );
};

export default smart_earthpit;
