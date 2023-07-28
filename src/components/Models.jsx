import React, { useState } from "react";
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
import { HTML5Backend } from "react-dnd-html5-backend";

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
      <div>
        <Card shadow="xl" padding="lg" radius="xl" withBorder>
          <strong>{task.title}</strong>
          <p>{task.description}</p>
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

const DroppableColumn = ({ status, tasks, moveTask, deleteTask }) => {
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
      <Text size="lg" style={{ marginBottom: 10 }}>
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

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: `task${Date.now()}`,
          title: newTaskTitle,
          description: newTaskDescription,
          status: "tasks",
        },
      ]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };
  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);
  };

  const moveTask = (taskID, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ gap: 20, justifyContent: "center" }}>
      <Grid>
        <Grid.Col md={2} lg={2}>
          {" "}
          <div style={{ marginTop: 20 }}>
            <Popover
              width={300}
              trapFocus
              position="bottom"
              withArrow
              shadow="md"
            >
              <Popover.Target>
                <Button radius="xl">Enter Task</Button>
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
                  onChange={(event) =>
                    setNewTaskTitle(event.currentTarget.value)
                  }
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
                <Button onClick={addTask} radius="xl" variant="gradient">
                  Submit
                </Button>
              </Popover.Dropdown>
            </Popover>
          </div>
        </Grid.Col>
        <Grid.Col md={2} lg={6}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn status="tasks" tasks={tasks} moveTask={moveTask} />
            <DroppableColumn
              status="ongoing"
              tasks={tasks}
              moveTask={moveTask}
            />
            <DroppableColumn
              status="finished"
              tasks={tasks}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          </DndProvider>
        </Grid.Col>
        <Grid.Col md={2} lg={4}></Grid.Col>
      </Grid>
    </div>
  );
};

export default Models;
