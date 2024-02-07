import React from "react";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Settings from "./Settings";

const Users = () => {
  const theme = useMantineTheme();

  return (
    <Link to="/settings">
      <Box
        sx={{
          // paddingTop: theme.spacing.sm,
          marginBottom: "5px",
          // borderTop: `${rem(1)} solid ${
          //   theme.colorScheme === "dark"
          //     ? theme.colors.dark[4]
          //     : theme.colors.gray[2]
          // }`,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.violet[4]
                : theme.colors.blue[2],
          },
        }}
      >
        <Group>
          <Avatar
            src={null}
            alt="no image here"
            variant="transparent"
            size="lg"
            color="pink"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Name
            </Text>
            {/* <Text color="dimmed" size="xs">
              ahorsefighter@gmail.com
            </Text> */}
          </Box>

          {/* {theme.dir === "ltr" ? (
            <IconChevronRight size={rem(18)} />
          ) : (
            <IconChevronLeft size={rem(18)} />
          )} */}
        </Group>
      </Box>
    </Link>
  );
};

export default Users;
