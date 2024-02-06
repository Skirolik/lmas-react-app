import React, { useState, useEffect } from "react";
import { Grid, Button, Text, Card, Divider, Badge } from "@mantine/core";
import Each_slave_layout from "../components/Each_slave_layout";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../components/Table_comp";
import axios from "axios";
import Responseive_pie from "../maintenance/Responseive_pie";

const Repeter_2 = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [errorLength, setErrorLength] = useState([]);
  const [maxError, setMaxError] = useState([]);
  const [errorName, setErrorName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.10.251:3000/api/inventory"
        );
        const data = response.data;

        const specificcDeviceNames = [
          "sl101",
          "sl102",
          "sl103",
          "sl104",
          "sl105",
          "sl106",
          "sl107",
          "sl108",
          "sl109",
          "sl110",
          "sl111",
          "sl112",
          "sl113",
          "sl114",
          "sl115",
          "sl116",
          "sl117",
          "sl118",
          "sl119",
          "sl120",
          "sl121",
          "sl122",
          "sl123",
          "sl124",
          "sl125",
          "sl126",
          "sl127",
          "sl128",
          "sl129",
          "sl130",
          "sl131",
          "sl132",
          "sl133",
          "sl134",
          "sl135",
          "sl136",
          "sl137",
          "sl138",
          "sl139",
          "sl140",
          "sl141",
          "sl142",
          "sl143",
          "sl144",
          "sl145",
          "sl146",
          "sl147",
          "sl148",
          "sl149",
          "sl150",
          "sl151",
          "sl152",
          "sl153",
          "sl154",
          "sl155",
          "sl156",
          "sl157",
          "sl158",
          "sl159",
          "sl160",
          "sl161",
          "sl162",
          "sl163",
          "sl164",
          "sl165",
          "sl166",
          "sl167",
          "sl168",
          "sl169",
          "sl170",
          "sl171",
          "sl172",
          "sl173",
          "sl174",
          "sl175",
          "sl176",
          "sl177",
          "sl178",
          "sl179",
          "sl180",
          "sl181",
          "sl182",
          "sl183",
          "sl184",
          "sl185",
          "sl186",
          "sl187",
          "sl188",
          "sl189",
          "sl190",
          "sl191",
          "sl192",
          "sl193",
          "sl194",
          "sl195",
          "sl196",
          "sl197",
          "sl198",
          "sl199",
          "sl200",
          "sl201",
          "R2",
        ];

        const filterData = data.filter((entry) =>
          specificcDeviceNames.includes(entry.device_name)
        );

        console.log("fd", filterData);
        setInventoryData(filterData);
      } catch (error) {
        console.log("hi-bye");
      }
      try {
        const response = await axios.get(
          "http://192.168.10.251:3000/api/error_table"
        );
        const data = response.data;
        console.log("error values", data);
        const specificName = [
          "sl-101",
          "sl-102",
          "sl-103",
          "sl-104",
          "sl-105",
          "sl-106",
          "sl-107",
          "sl-108",
          "sl-109",
          "sl-110",
          "sl-111",
          "sl-112",
          "sl-113",
          "sl-114",
          "sl-115",
          "sl-116",
          "sl-117",
          "sl-118",
          "sl-119",
          "sl-120",
          "sl-121",
          "sl-122",
          "sl-123",
          "sl-124",
          "sl-125",
          "sl-126",
          "sl-127",
          "sl-128",
          "sl-129",
          "sl-130",
          "sl-131",
          "sl-132",
          "sl-133",
          "sl-134",
          "sl-135",
          "sl-136",
          "sl-137",
          "sl-138",
          "sl-139",
          "sl-140",
          "sl-141",
          "sl-142",
          "sl-143",
          "sl-144",
          "sl-145",
          "sl-146",
          "sl-147",
          "sl-148",
          "sl-149",
          "sl-150",
          "sl-151",
          "sl-152",
          "sl-153",
          "sl-154",
          "sl-155",
          "sl-156",
          "sl-157",
          "sl-158",
          "sl-159",
          "sl-160",
          "sl-161",
          "sl-162",
          "sl-163",
          "sl-164",
          "sl-165",
          "sl-166",
          "sl-167",
          "sl-168",
          "sl-169",
          "sl-170",
          "sl-171",
          "sl-172",
          "sl-173",
          "sl-174",
          "sl-175",
          "sl-176",
          "sl-177",
          "sl-178",
          "sl-179",
          "sl-180",
          "sl-181",
          "sl-182",
          "sl-183",
          "sl-184",
          "sl-185",
          "sl-186",
          "sl-187",
          "sl-188",
          "sl-189",
          "sl-190",
          "sl-191",
          "sl-192",
          "sl-193",
          "sl-194",
          "sl-195",
          "sl-196",
          "sl-197",
          "sl-198",
          "sl-199",
          "sl-200",
          "sl-201",
          "R2",
        ];
        const filterData = data.filter((entry) =>
          specificName.includes(entry.slave_id)
        );
        const dataLength = filterData.length;
        console.log("Total Lenght", dataLength);
        setErrorData(filterData);
        setErrorLength(dataLength);

        const countPerName = specificName.reduce((counts, name) => {
          const nameCount = filterData.filter(
            (entry) => entry.slave_id === name
          ).length;
          counts[name] = nameCount;
          return counts;
        }, {});

        const sortedCounts = Object.entries(countPerName)
          .sort(([, countA], [, countB]) => countB - countA)
          .slice(0, 10);

        const restCount = Object.entries(countPerName)
          .slice(10) // Skip the top 5 counts
          .reduce((sum, [, count]) => sum + count, 0);

        const updatedPieChartData = [
          ...sortedCounts.map(([name, count]) => ({
            id: name,
            label: name,
            value: count,
          })),
          { id: "rest", label: "Rest", value: restCount },
        ];
        setPieChartData(updatedPieChartData);

        let maxCount = -1; // Initialize with a value smaller than any possible count
        let maxCountName = "";

        // Iterate through entries to find the maximum count and corresponding name
        Object.entries(countPerName).forEach(([name, count]) => {
          if (count > maxCount) {
            maxCount = count;
            maxCountName = name;
          }
        });

        console.log("Slave ID with Maximum Count:", maxCountName);
        console.log("Maximum Count:", maxCount);

        // Iterate through entries to find the maximum count and corresponding name
        Object.entries(countPerName).forEach(([name, count]) => {
          if (count > maxCount) {
            maxCount = count;
            maxCountName = name;
          }
        });

        console.log("Slave ID with Maximum Count:", maxCountName);
        console.log("Maximum Count:", maxCount);

        setErrorName(maxCountName);
        setMaxError(maxCount);

        console.log("Data for nivo", pieChartData);

        console.log("Trying to get count", filterData);
        console.log("count per specific name:", countPerName);
      } catch (error) {
        console.log("Error in error table", error);
      }
    };
    fetchData();
  }, []);

  const columns = {
    id: "ID",
    device_name: "Device Name",
    device_type: "Device Type",
    next_maintenance_date: "Next Date",
    Issues: "Issues",
  };

  const visibleColumns = [
    "id",
    "device_name",
    "device_type",
    "next_maintenance_date",
    "Issues",
  ];

  const cols = {
    id: "ID",
    slave_id: "Slave ID",

    error_date: "Error Date",

    error_time: "Error Time",
  };

  const visCols = ["id", "slave_id", "error_date", "error_time"];

  const handleButtonClick = () => {
    console.log("button clicked");
    navigate("/Rectractable");
  };
  return (
    <div>
      <h1>Repeater-2: Details</h1>
      <div>
        <Button
          mt="xl"
          radius="xl"
          ml="xl"
          variant="gradient"
          onClick={handleButtonClick}
        >
          Overview
        </Button>
        <Grid mb="xl">
          <Grid.Col md={1.5} lg={1.5}></Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Card withBorder radius="lg" shadow="xl" padding="md">
              <Grid justify="flex-start" align="stretch">
                <Grid.Col md={4} lg={2}>
                  <Badge color="pink" size="xl" variant="light">
                    {" "}
                    Total
                  </Badge>
                </Grid.Col>
                <Grid.Col md={8} lg={8}>
                  <Text ta="center" size="xl" fw={800} td="underline">
                    Total Errors
                  </Text>
                  <Text ta="center" mt="xl" fw={800}>
                    {errorLength}
                  </Text>
                </Grid.Col>

                <Grid.Col md={1} lg={2}></Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col md={3} lg={3}></Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Card withBorder radius="lg" shadow="xl" padding="md">
              <Grid justify="flex-start" align="stretch">
                <Grid.Col md={4} lg={2}>
                  <Badge color="pink" size="xl" variant="light">
                    {" "}
                    Max
                  </Badge>
                </Grid.Col>
                <Grid.Col md={8} lg={8}>
                  <Text ta="center" size="xl" fw={800} td="underline">
                    slave: {errorName}
                  </Text>
                  <Text ta="center" mt="xl" size="lg" fw={700}>
                    Count : {maxError}
                  </Text>
                </Grid.Col>

                <Grid.Col md={1} lg={2}></Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col md={2} lg={1.5}></Grid.Col>
        </Grid>
        <Divider />
        <Grid mb="xl">
          <Grid.Col md={4} lg={1}></Grid.Col>
          <Grid.Col md={4} lg={4}>
            <h1>Component Details</h1>
            <TableComponent
              data={inventoryData}
              columns={columns}
              visibleColumns={visibleColumns}
            />
          </Grid.Col>
          <Grid.Col md={4} lg={2}></Grid.Col>
          <Grid.Col md={4} lg={4}>
            <h1>Error Details</h1>
            <TableComponent
              data={errorData}
              columns={cols}
              visibleColumns={visCols}
            />
          </Grid.Col>
          <Grid.Col md={2} lg={1}></Grid.Col>
        </Grid>
      </div>
      <div>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text ta="center" size="xl" td="underline" fw={700}>
            Layout
          </Text>
          <Each_slave_layout start={101} end={201} repeterId="R-2" />
        </Card>
      </div>
    </div>
  );
};

export default Repeter_2;
