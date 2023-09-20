import React, { useState } from "react";
import {
  Stepper,
  Grid,
  Button,
  Card,
  Text,
  Table,
  Col,
  Input,
  Select,
  Modal,
  Paper,
  Textarea,
  TextInput,
  NumberInput,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

const Fault_info = () => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [extractedIds, setExtractedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [numDevices, setNumDevices] = useState(1);
  const [selectedPit, setSelectedPit] = useState(null);
  const [opened, { open, close }] = useDisclosure(true);
  const [noDevices, setNoDevices] = useState(2);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const megaBack = () =>
    setActive((current) => (current > 0 ? current - 3 : current));

  const addRferm = () => {
    console.log("Rferm Data");
    notifications.show({
      title: "Request Failed",
      message:
        "Tooks like you dont have R-ferm: Rferm is a remort Earth Pit monitoring device.",
      color: "red",
      icon: <AlertCircle size={24} color="black" />,
    });
  };

  const addMdata = async (e) => {
    e.preventDefault();
    try {
      console.log("maintanance data");
      axios.get("http://localhost:3000/api/data").then((response) => {
        const pitdata = response.data;
        console.log("pit data", pitdata);
        const pit_name = pitdata.map((entry) => entry.name);
        console.log("pit Names", pit_name);
        setExtractedIds(pit_name);
        console.log("extract data", extractedIds);
        const extractedData = pitdata.map((entry) => ({
          name: entry.name,
          resistance: entry.resistance,
          longitude: entry.longitude,
          latitude: entry.latitude,
        }));

        console.log("extracted data2", extractedData);
        setExtractedIds(extractedData);
        nextStep();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("response data", data);

  const handleFormSubmit = (data) => {
    // Here you can handle the submitted data (e.g., send to server)
    console.log("Submitted data:", data);
    setShowForm(false);
    setSelectedPit(null);
    notifications.show({
      title: "Form Submitted",
      message: "Device details submitted successfully",
      color: "green",
      autoClose: 3000,
    });
  };

  return (
    <div>
      Fault_info
      <Grid mt="xl">
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={6}>
          {" "}
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="First step" description="Choose Data">
              <Card>
                <Text>Step 1: Select Data to Import</Text>
                <Button
                  radius="xl"
                  size="md"
                  variant="gradient"
                  onClick={addMdata}
                >
                  Maintanace Data
                </Button>
                <Text>OR</Text>
                <Button
                  radius="xl"
                  size="md"
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                  onClick={addRferm}
                >
                  R-ferm Data
                </Button>
              </Card>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Select the Pit Data">
              <div>
                <h2>Select Data</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Resistance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedIds.map((entry, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedData.some(
                              (selectedEntry) => selectedEntry.key === index
                            )}
                            onChange={() => {
                              const isSelected = selectedData.some(
                                (selectedEntry) => selectedEntry.key === index
                              );
                              if (isSelected) {
                                setSelectedData((prevSelected) =>
                                  prevSelected.filter(
                                    (selectedEntry) =>
                                      selectedEntry.key !== index
                                  )
                                );
                              } else {
                                setSelectedData((prevSelected) => [
                                  ...prevSelected,
                                  { key: index, ...entry },
                                ]);
                              }
                            }}
                          />
                        </td>
                        <td>{entry.name}</td>
                        <td>{entry.latitude}</td>
                        <td>{entry.longitude}</td>
                        <td>{entry.resistance}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button variant="gradient" onClick={prevStep} mt="xl">
                Back
              </Button>
              <Button variant="gradient" onClick={nextStep} ml="xl">
                Next
              </Button>
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Get full access">
              <Card shadow="xs" padding="lg">
                <h2>Selected Data</h2>
                <ul>
                  {selectedData.map((selectedEntry) => (
                    <li key={selectedEntry.key}>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          setShowForm(true);
                          setSelectedPit(selectedEntry);
                          console.log("show form ", showForm);
                          console.log("pitselected", selectedPit);
                        }}
                      >
                        PitName: {selectedEntry.name}
                      </Button>
                      <Text>Resistance: {selectedEntry.resistance}</Text>
                    </li>
                  ))}
                </ul>
                {showForm && selectedPit && (
                  <div>
                    <Modal
                      opened={showForm}
                      onClose={() => {
                        setShowForm(false);
                      }}
                    >
                      <TextInput
                        mt="xl"
                        mb="xl"
                        value={selectedPit.name}
                        label="Pit Name"
                        withAsterisk
                        disabled
                      />
                      <TextInput
                        mt="xl"
                        mb="xl"
                        value={selectedPit.resistance}
                        label="Pit Latest Resistance"
                        withAsterisk
                        disabled
                      />
                      <Select
                        mt="xl"
                        mb="xl"
                        label="Select Area near the pit"
                        placeholder="Pick one"
                        searchable
                        nothingFound="No options"
                        dropdownPosition="bottom"
                        maxDropdownHeight={280}
                        data={[
                          { value: "GT", label: "example1" },
                          { value: "GT2", label: "example2" },
                          { value: "exaple3", label: "example3" },
                          { value: "exaple4", label: "example4" },
                        ]}
                      />
                      <NumberInput
                        mt="xl"
                        mb="xl"
                        value={noDevices}
                        label="Aprox No of Devices connected"
                        onChange={setNoDevices}
                        withAsterisk
                      />

                      <Button mt="xl">Submit </Button>
                    </Modal>

                    <Button
                      onClick={() => {
                        setShowForm(false);
                      }}
                    >
                      Back
                    </Button>
                  </div>
                )}

                <div>
                  <Button
                    variant="default"
                    onClick={prevStep}
                    style={{ marginRight: "1rem" }}
                  >
                    Back
                  </Button>
                  <Button variant="default" onClick={nextStep}>
                    Next
                  </Button>
                </div>
              </Card>
            </Stepper.Step>
            <Stepper.Completed>
              <Card>
                <Textarea>
                  Thank You !! for adding the information. Go to Fault Detection
                  to see your layout and edit detiails if required
                </Textarea>
                <Button onClick={megaBack}>Back</Button>
              </Card>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
      </Grid>
    </div>
  );
};

export default Fault_info;
