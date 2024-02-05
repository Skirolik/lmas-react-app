import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  Button: {
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? "blue " : "#ffc9c9",
      borderBlockColor: "#ffa8a8",
    },
  },
  // ... other styles
}));
