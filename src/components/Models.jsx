import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Input,
  TextInput,
  Popover,
  Grid,
  Card,
  useMantineTheme,
  Group,
  Modal,
  CardSection,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const DraggableTask = ({ task, index, moveTask, deleteTask }) => {
  const theme = useMantineTheme();
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div
      ref={drag}
      style={{
        marginBottom: 10,
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 4,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div key={task.id}>
        <Card shadow="xl" padding="lg" radius="xl" withBorder>
          <strong>Title: {task.title}</strong>
          <p>Description: {task.description}</p>
          <p>Assigned to: {task.assigned}</p>
          <p>Deadline: {task.date}</p>
          <p>Status: {task.status}</p>
          {/* Show delete button only in the "Finished" column */}
          {task.status === "finished" && (
            <Button
              variant="gradient"
              radius="xl"
              style={{ marginTop: 8 }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

const DroppableColumn = ({
  status,
  tasks,
  moveTask,
  deleteTask,
  newStatus,
}) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
  });

  const tasksInColumn = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={drop}
      style={{
        minWidth: 300,
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 10,
        marginBottom: 20,
      }}
    >
      <Text
        size="lg"
        style={{
          marginBottom: 10,
          backgroundColor:
            status === "tasks"
              ? "#228be6"
              : status === "ongoing"
              ? "#fd7e14"
              : status === "finished"
              ? "green"
              : "#37b24d", // Fallback color if the status is not recognized
          color: "white", // Text color for the header
          padding: "8px",
          fontWeight: "bold",
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
      {tasksInColumn.map((task, index) => (
        <DraggableTask
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          deleteTask={deleteTask} // Pass deleteTask function to DraggableTask
        />
      ))}
    </div>
  );
};

const Models = () => {
  const theme = useMantineTheme();
  const [data, setData] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const [tasks, setTasks] = useState([
    { id: "task1", title: "Task 1", description: "Example", status: "tasks" },
    {
      id: "task2",
      title: "Task 2",
      description: "Example2",
      status: "ongoing",
    },
    {
      id: "task3",
      title: "Task 3",
      description: "Example3",
      status: "finished",
    },
  ]);

  const [extractedIds, setExtractedIds] = useState([]);

  const checkPit = () => {
    console.log("pit check clicked");
    axios
      .get("http://49.204.77.190:3000/api/list")
      .then((response) => {
        const listdata = response.data;
        console.log("we get list", listdata);
        axios.get("http://49.204.77.190:3000/api/data").then((dataResponse) => {
          const data = dataResponse.data;
          console.log("Maintenance Table", data);

          const datatitle = listdata.map((entry) => entry.title);
          console.log("list data", datatitle);

          const newDataEntries = data.filter(
            (entry) => !datatitle.includes(entry.title)
          );
          console.log("data check", newDataEntries);

          const currentDate = new Date();

          console.log("Today data", currentDate);
          const newTasks = newDataEntries
            .filter((entry) => {
              const nextCollectionDate = new Date(entry.next_collection);
              const dateOnly = nextCollectionDate.toISOString().split("T")[0];
              console.log(entry.next_collection);
              console.log("date collection", dateOnly);
              return nextCollectionDate <= currentDate;
            })
            .map((entry) => {
              const nextCollectionDate = new Date(entry.next_collection);
              const dateOnly = nextCollectionDate.toISOString().split("T")[0]; // Declare dateOnly here as well
              return {
                id: entry.id,
                title: entry.title,
                description: entry.description,
                assigned: "NA",
                date: dateOnly, // Use the dateOnly variable here
                status: "tasks",
              };
            });

          // Post new tasks and update the database
          newTasks.forEach((newTask) => {
            axios
              .post("http://49.204.77.190:3000/api/tasks", newTask)
              .then((response) => {
                console.log("Task added to the database!");
                // Now update the local state with the new task
                setTasks([...tasks, response.data]);
              })
              .catch((error) => {
                console.error("Error adding task: ", error);
              });
          });
          notifications.show({
            title: "Success !!",
            message:
              "Just view or Download the report. Contact us for further clarification",
            color: "teal",
            icon: <CircleCheck size={24} color="white" />,
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
  };

  const fetchData = () => {
    console.log("fetch");
    axios
      .get("http://49.204.77.190:3000/api/list")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
  };

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newAssigned, setNewAssigned] = useState("");
  const [newDate, setNewDate] = useState(null);
  const [newStatus, setNewStatus] = useState("tasks");

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        assigned: newAssigned,
        date: newDate,
        status: newStatus,
      };

      axios
        .post("http://49.204.77.190:3000/api/tasks", newTask) // Assuming your backend API endpoint is /api/tasks/add
        .then((response) => {
          console.log("Task added to the database!");
          // Now update the local state with the new task
          setTasks([...tasks, response.data]);
        })
        .catch((error) => {
          console.error("Error adding task: ", error);
          notifications.show({
            title: "Request Failed",
            message:
              "An Error has occured , try again if not please contact us by clicking on contact us page",
            color: "red",
            icon: <AlertCircle size={24} color="black" />,
          });
        });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewAssigned("");
      setNewDate(null);
      notifications.show({
        title: "Success !!",
        message: "Task added sucessfully",
        color: "teal",
        icon: <CircleCheck size={24} color="white" />,
      });

      axios
        .get("http://0.0.0.0:3000/api/data")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          notifications.show({
            title: "Request Failed",
            message:
              "An Error has occured , try again if not please contact us by clicking on contact us page",
            color: "red",
            icon: <AlertCircle size={24} color="black" />,
          });
        });
    }
  };
  const deleteTask = (taskID) => {
    axios
      .delete(`http://49.204.77.190:3000/api/tasks/${taskID}`)
      .then((response) => {
        console.log("Task deleted from the database!");
        // Update the local state to remove the deleted task
        const updatedTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
    notifications.show({
      title: "Success !!",
      message: "Task deleted sucessfully",
      color: "teal",
      icon: <CircleCheck size={24} color="white" />,
    });
  };

  const moveTask = (taskID, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    // Send a PUT or PATCH request to the backend to update the task status in the database
    axios
      .put(`http://49.204.77.190:3000/api/tasks/${taskID}`, {
        status: newStatus,
      })
      .then((response) => {
        console.log("Task status updated in the database!");
        // Update the local state to reflect the new status of the task
        const updatedTasks = tasks.map((task) =>
          task.id === taskID ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        setNewStatus(newStatus);
      })
      .catch((error) => {
        console.error("Error updating task status: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
  };

  return (
    <div style={{ gap: 20, justifyContent: "center" }}>
      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <Group>
          <Button
            onClick={checkPit}
            mr="xl"
            radius="xl"
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
          >
            Update Tasks
          </Button>
          <Button onClick={open} radius="xl" variant="gradient">
            Instructions
          </Button>
        </Group>

        <Modal
          opened={opened}
          onClose={close}
          //title="Instructions"
          centered
        >
          <Card>
            <Input
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.currentTarget.value)}
              placeholder="Enter a new task title..."
              style={{ marginBottom: 10 }}
            />
            <Input
              value={newTaskDescription}
              onChange={(event) =>
                setNewTaskDescription(event.currentTarget.value)
              }
              placeholder="Enter a new task description..."
              style={{ marginBottom: 10 }}
            />
            <Input
              value={newAssigned}
              onChange={(event) => setNewAssigned(event.currentTarget.value)}
              placeholder="Task Assigned to"
              style={{ marginBottom: 10 }}
            />
            <input
              type="date"
              value={newDate}
              onChange={(event) => setNewDate(event.target.value)}
              style={{
                marginBottom: 10,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor:
                  theme.colorScheme === "dark" ? "#25262b" : "#fff",
                color: theme.colorScheme === "dark" ? "#495057" : "#A6A7AB", // Set text color based on theme
              }}
            />

            <Button
              onClick={addTask}
              radius="xl"
              ml="xl"
              mt="xl"
              variant="gradient"
            >
              Submit
            </Button>
          </Card>
        </Modal>
      </div>
      <Grid>
        <Grid.Col md={2} lg={4}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn status="tasks" tasks={tasks} moveTask={moveTask} />
          </DndProvider>
        </Grid.Col>
        <Grid.Col md={2} lg={4}>
          <DndProvider backend={HTML5Backend}>
            <div style={{ height: "500px" }}>
              <DroppableColumn
                status="ongoing"
                tasks={tasks}
                moveTask={moveTask}
              />
            </div>
          </DndProvider>
        </Grid.Col>

        <Grid.Col md={2} lg={4}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn
              status="finished"
              tasks={tasks}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          </DndProvider>
          <Grid.Col md={2} lg={1}></Grid.Col>
        </Grid.Col>
      </Grid>{" "}
    </div>
  );
};

export default Models;
