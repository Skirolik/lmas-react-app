import {
  Card,
  Grid,
  Text,
  Timeline,
  Button,
  RingProgress,
  useMantineTheme,
  Paper,
  Textarea,
  Checkbox,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Summary_timeline from "./Summary_timeline";
import useBoardValues from "./useBoardValues";
import useIssueValues from "./useIssueValues";
import Circular_progress from "./Circular_progress";
import jsPDF from "jspdf";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Responseive_pie from "./Responseive_pie";
import Checklist from "./Checklist";
import html2pdf from "html2pdf.js";

const Summary = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const apiEndpoint = "http://192.168.10.251:3000/api/list";
  const chartData = useBoardValues(apiEndpoint);

  const apiCall = "http://192.168.10.251:3000/api/inventory";
  const { inventoryData, totalEntries, totalIssues, diffrence } =
    useIssueValues(apiCall);

  const dataValue = [
    { id: "With Issues", label: "With Issues", value: totalIssues },
    { id: "Without Issues", label: "Without Issues", value: diffrence },
  ];

  console.log("diff", diffrence);

  console.log("char", chartData);

  const handleClick = () => {
    navigate("/maintenance/Board");
  };

  const handleButtonClick = () => {
    navigate("/maintenance/Error_issues");
  };

  const handleDownloadChecklist = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Add title
    doc.setFontSize(16);
    doc.text("Maintenance Checklist and Method", 20, yPos);

    yPos += 20;

    // Add checklist items
    const checklistItems = [
      "1. Oil Checked",
      "2. Communication Checked",
      "3. Motor Checked",
      "4. place Holder",
      "5. place Holder",
      "6. place Holder",
      "7. place Holder",
    ];

    checklistItems.forEach((item) => {
      doc.setFontSize(12);
      doc.text(item, 20, yPos);
      yPos += 15; // Adjust spacing between items
    });

    yPos += 10;

    // Add additional comments
    const additionalComments = "Additional comments: ";
    doc.text(additionalComments, 20, yPos);

    yPos += 20;

    // Add disclaimer
    const disclaimer = "* Contact Manav Energy for any doubts or queries";
    doc.setFontSize(10);
    doc.text(disclaimer, 20, yPos);

    doc.save("Maintenance_Checklist_Report.pdf");
  };
  return (
    <div>
      <Grid mt="xl">
        <Grid.Col md={3} lg={2}></Grid.Col>
        <Grid.Col md={7} lg={8}>
          <Card shadow="xl" padding="lg" radius="md" withBorder>
            <Text ta="center" fw={700} td="underline" size="xl">
              {" "}
              Testing
            </Text>
            <Summary_timeline />
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col md={4} lg={2}></Grid.Col>
        <Grid.Col md={4} lg={4}>
          <Card shadow="xl" padding="lg" radius="md" withBorder>
            <Text fw={800} ta="center" td="underline" size="xl">
              Board
            </Text>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              <Responseive_pie chartData={chartData} />
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col md={4} lg={4}>
          <Card shadow="xl" padding="lg" radius="md" withBorder>
            <Text fw={800} ta="center" td="underline" size="xl">
              Issues Overview
            </Text>
            <div onClick={handleButtonClick}>
              <Responseive_pie chartData={dataValue} />
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col md={8} lg={4}>
          {" "}
        </Grid.Col>
      </Grid>
      <Grid mt="xl">
        <Grid.Col md={3} lg={2}></Grid.Col>
        <Grid.Col md={7} lg={8}>
          <Card shadow="xl" padding="lg" radius="md" withBorder>
            <Text ta="center" fw={700} td="underline" size="xl">
              {" "}
              Maintenance Checklist and Method
            </Text>
            <Paper shadow="xl" radius="lg" p="xl" id="checklist-container">
              <Text fw={700} td="underline" ta="center">
                Retractable Checklist:
              </Text>
              <Checklist label="1. Oil Checked" />
              <Checklist label="2. Communication Checked" />
              <Checklist label="3. Motor Checked" />
              <Checklist label="4. place Holder" />
              <Checklist label="5. place Holder" />
              <Checklist label="6. place Holder" />
              <Checklist label="7. place Holder" />

              <Textarea placeholder="Additional comments" label="Issues: " />
            </Paper>
            <Button
              onClick={handleDownloadChecklist}
              mt="xl"
              radius="xl"
              variant="gradient"
            >
              Download Checlist!
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
      </Grid>
      {/* Hidden form for PDF generation */}
      <form
        id="hidden-form"
        style={{ display: "none", width: "100%", height: "100%" }}
      >
        <Text fw={700} td="underline" ta="center">
          Retractable Checklist:
        </Text>
        <Checklist label="1. Oil Checked" />
        {/* Add more checklist items here */}
        <Textarea placeholder="Additional comments" label="Issues: " disabled />
      </form>
    </div>
  );
};

export default Summary;
