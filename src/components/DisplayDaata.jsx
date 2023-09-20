import React from "react";

const DisplayDaata = () => {
  return <div>DisplayDaata</div>;
};

export default DisplayDaata;
{
  showForm && selectedPit && (
    <>
      <Modal
        size="md"
        onClose={() => {
          setShowForm(false);
          setSelectedPit(null);
        }}
        opened={opened}
        title="Add Device Details"
      >
        <TextInput label="Pit Name" value={selectedPit.name} readOnly />
        <Select
          label="Number of Devices"
          value={numDevices}
          onChange={(value) => setNumDevices(value)}
          data={Array.from({ length: 100 }, (_, index) => ({
            value: index + 1,
            label: `${index + 1}`,
          }))}
        />
        {/* Add more input fields here */}
        <Button
          variant="primary"
          onClick={() => {
            // Logic to handle form submission
            setShowForm(false);
            setSelectedPit(null);
            setNumDevices(1);
          }}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
}
