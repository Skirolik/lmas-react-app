import React, { useEffect, useState } from "react";
import { Timeline, Button, Text } from "@mantine/core";

const Summary_timeline = () => {
  const [yesterDate, setYesterDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);

    //Subtract one from todays date
    yesterday.setDate(today.getDate() - 1);

    // Format the date as a string in the format "YYYY-MM-DD"
    const formattedYesterday = `${yesterday.getFullYear()}-${(
      yesterday.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${yesterday.getDate().toString().padStart(2, "0")}`;

    setYesterDate(formattedYesterday);
  }, []);
  return (
    <>
      <Timeline mt="xl" active={2} bulletSize={24} lineWidth={3} color="indigo">
        <Timeline.Item title="All communication">
          <Text size="sm" mt="xl">
            Test if the device commuinication is working by clicking the button
            named TEST :
            <Button ml="sm" variant="gradient" compact radius="xl">
              {" "}
              Test Communication
            </Button>
            <Text ta="left">Last Tested: {yesterDate}</Text>
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Force all">
          <Text size="sm">
            To take all the slaves vetrical press FORCE button and send your
            command:{" "}
            <Button
              ml="sm"
              gradient={{
                from: "rgba(255, 153, 153, 1)",
                to: "red",
                deg: 324,
              }}
              variant="gradient"
              compact
              radius="xl"
            >
              Force All
            </Button>
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Time : Set at 6 pm">
          <Text size="sm" mt="xl">
            At 6 pm all slave devices will be in vertical position and stay as
            such till morning 6 am. To change this contact us by clicking the
            button :{" "}
            <Button variant="outline" compact radius="xl" color="lime">
              Contact Us!
            </Button>
          </Text>
        </Timeline.Item>
      </Timeline>
    </>
  );
};

export default Summary_timeline;
