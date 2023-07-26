import React from "react";
import { Container, Tabs } from "@mantine/core";
import DeviceForm from "./components/DeviceForm";
import DeviceEntries from "./components/DeviceEntries";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";

const Maintenance = () => {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>
          Mantiance Form
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>
          Data
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
          Timeline
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        <DeviceForm />
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        <DeviceEntries />
      </Tabs.Panel>

      {/* <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel> */}
    </Tabs>
  );
};

export default Maintenance;
