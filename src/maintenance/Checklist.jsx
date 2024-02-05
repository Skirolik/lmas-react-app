import React from "react";
import { Paper, Checkbox, Grid, Textarea } from "@mantine/core";

const Checklist = ({ label }) => {
  return (
    <Grid align="center">
      <Grid.Col span={11}>
        <span>{label}</span>
      </Grid.Col>
      <Grid.Col span={1}>
        <Checkbox />
      </Grid.Col>
    </Grid>
  );
};

export default Checklist;
