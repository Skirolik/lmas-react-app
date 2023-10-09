import React from "react";
import { Container, Tabs } from "@mantine/core";
import DeviceForm from "./components/DeviceForm";
import DeviceEntries from "./components/DeviceEntries";
import TimelineData from "./components/TimelineData";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconDeviceAnalytics,
  IconAnalyzeFilled,
  IconBrandTrello,
} from "@tabler/icons-react";

const Maintenance = () => {
  return (
    <Tabs defaultValue="gallery" radius="lg" variant="outline">
      <Tabs.List grow>
        <Tabs.Tab value="gallery" icon={<IconDeviceAnalytics size="0.8rem" />}>
          Maintenance Form
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconAnalyzeFilled size="0.8rem" />}>
          Data
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconBrandTrello size="0.8rem" />}>
          Timeline
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        <DeviceForm />
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        <DeviceEntries />
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        <TimelineData />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Maintenance;
