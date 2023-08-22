import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Input,
  Popover,
  TextInput,
  Grid,
  Card,
  useMantineTheme,
} from "@mantine/core";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { DatePickerInput } from "@mantine/dates";
import { DateInput } from "@mantine/dates";
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

  const fetchTasks = () => {
    console.log("fetch");
    axios
      .get("http://localhost:3000/api/list")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
  };

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
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
        .post("http://localhost:3000/api/tasks", newTask) // Assuming your backend API endpoint is /api/tasks/add
        .then((response) => {
          console.log("Task added to the database!");
          // Now update the local state with the new task
          setTasks([...tasks, response.data]);
        })
        .catch((error) => {
          console.error("Error adding task: ", error);
        });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewAssigned("");
      setNewDate(null);
    }
  };
  const deleteTask = (taskID) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${taskID}`)
      .then((response) => {
        console.log("Task deleted from the database!");
        // Update the local state to remove the deleted task
        const updatedTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
      });
  };

  const moveTask = (taskID, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    // Send a PUT or PATCH request to the backend to update the task status in the database
    axios
      .put(`http://localhost:3000/api/tasks/${taskID}`, { status: newStatus })
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
      });
  };

  return (
    <div style={{ gap: 20, justifyContent: "center" }}>
      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button radius="xl" compact variant="gradient">
              Enter Task
            </Button>
          </Popover.Target>
          <Popover.Dropdown
            sx={(theme) => ({
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.white,
            })}
          >
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
            <Button onClick={addTask} radius="xl" variant="gradient">
              Submit
            </Button>
          </Popover.Dropdown>
        </Popover>
      </div>
      <Grid>
        <Grid.Col md={2} lg={4}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn status="tasks" tasks={tasks} moveTask={moveTask} />
          </DndProvider>
        </Grid.Col>
        <Grid.Col md={2} lg={4}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn
              status="ongoing"
              tasks={tasks}
              moveTask={moveTask}
            />
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
