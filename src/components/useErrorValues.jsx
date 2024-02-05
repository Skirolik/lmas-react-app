import React, { useEffect, useState } from "react";

export default function useErrorValues(errorTable) {
  const [errorValues, setErrorValues] = useState([]);

  useEffect(() => {
    const errorsWithAssociatedNode = errorTable.map((error) => {
      const slaveId = parseInt(error.split("-")[1]);
      const associatedNodeNumber = Math.ceil(slaveId / 100);

      return `SB-${associatedNodeNumber}`;
    });
    const uniqueAssociatedNodes = Array.from(new Set(errorsWithAssociatedNode));

    const finalErrorValues = uniqueAssociatedNodes.map((associatedNode) => {
      const errorsForNode = errorTable.filter((error) => {
        const slaveId = parseInt(error.split("-")[1]);
        const currentAssociatedNodeNumber = Math.ceil(slaveId / 100);

        return `SB-${currentAssociatedNodeNumber}` === associatedNode;
      });
      return {
        id: associatedNode,
        label: errorsForNode.join(", "), // Join error values for display
        isError: true, // Assuming all errors are true, modify as needed
      };
    });
    if (JSON.stringify(finalErrorValues) !== JSON.stringify(errorValues)) {
      setErrorValues(finalErrorValues);
    }
  }, [errorTable]);

  return { errorValues };
}
