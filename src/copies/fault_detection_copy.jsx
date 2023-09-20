// src/FaultDetection.js

import React, { useState } from "react";
import "./FaultDetection.css";
import { Modal } from "@mantine/core";

const FaultDetection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState(null);

  const structures = [
    { id: 1, name: "Structure 1", type: "Box" },
    { id: 2, name: "Structure 2", type: "Cylinder" },
    { id: 3, name: "Structure 3", type: "Box" },
    { id: 4, name: "Structure 4", type: "Box" },
    { id: 5, name: "Structure 5", type: "Cylinder" },
    { id: 6, name: "Structure 6", type: "Box" },
  ];

  const handleClickStructure = (structure) => {
    if (selectedStructure && selectedStructure.id === structure.id) {
      setSelectedStructure(null);
    } else {
      setSelectedStructure(structure);
    }

    setShowModal(true);
  };

  return (
    <div className="fault-detection">
      <div className="box-container">
        {/* First Box */}
        <div className="box">
          {structures
            .filter((structure) => structure.id === 1 || structure.id === 3)
            .map((structure) => (
              <div
                key={structure.id}
                className={`structure box ${
                  selectedStructure && selectedStructure.id === structure.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleClickStructure(structure)}
              >
                {structure.name}
              </div>
            ))}
        </div>

        {/* Second Box */}
        <div className="box">
          {structures
            .filter((structure) => structure.id === 2)
            .map((structure) => (
              <div
                key={structure.id}
                className={`structure cylinder ${
                  selectedStructure && selectedStructure.id === structure.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleClickStructure(structure)}
              >
                {structure.name}
              </div>
            ))}
        </div>

        {/* Third Box */}
        <div className="box">
          {structures
            .filter((structure) => structure.id === 4 || structure.id === 6)
            .map((structure) => (
              <div
                key={structure.id}
                className={`structure box ${
                  selectedStructure && selectedStructure.id === structure.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleClickStructure(structure)}
              >
                {structure.name}
              </div>
            ))}
        </div>

        {/* Fourth Box */}
        <div className="box">
          {structures
            .filter((structure) => structure.id === 5)
            .map((structure) => (
              <div
                key={structure.id}
                className={`structure cylinder ${
                  selectedStructure && selectedStructure.id === structure.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleClickStructure(structure)}
              >
                {structure.name}
              </div>
            ))}
        </div>
      </div>

      <Modal
        title="Structure Details"
        opened={showModal}
        onClose={() => setShowModal(false)}
      >
        <div>
          <p>Name: {selectedStructure && selectedStructure.name}</p>
          <p>Type: {selectedStructure && selectedStructure.type}</p>
          {/* Add more details here */}
        </div>
      </Modal>
    </div>
  );
};

export default FaultDetection;
