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
  const userFirstname = sessionStorage.getItem("userFirstname");
  // Function to get initials from the first name
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
      // If only one name, use the first two letters of the name
      return name.substr(0, 2).toUpperCase();
    } else if (nameParts.length >= 2) {
      // If two or more names, use the first letter of each part of the name
      return nameParts
        .map((namePart) => namePart[0])
        .join("")
        .toUpperCase();
    } else {
      // If no name or invalid name format, return a default value
      return "??";
    }
  };

  const initials = userFirstname ? getInitials(userFirstname) : "??";

  return (
    <Link to="/settings">
      <Box
        sx={{
          // paddingTop: theme.spacing.sm,
          marginLeft: "6px",
          marginBottom: "6px",
          marginTop: "4px",
          borderRadius: theme.radius.md,
          width: "95%",
          padding: theme.spacing.md,
          borderTop: `${rem(2)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
          borderBottom: `${rem(2)} solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.violet[4]
                : theme.colors.gray[2],
          },
        }}
      >
        <Group>
          {/* Placeholder with initials */}
          <Avatar>{initials}</Avatar>

          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {userFirstname}
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
