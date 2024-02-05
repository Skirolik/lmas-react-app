import React, { useState, useEffect } from "react";
import {
  Popover,
  Button,
  Input,
  Avatar,
  Badge,
  Grid,
  Card,
  useMantineTheme,
  Group,
  Modal,
  Text,
  CardSection,
  Tooltip,
  Indicator,
  Table,
} from "@mantine/core";

import { Calendar } from "@mantine/dates";
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

  const getInitials = (name) => {
    if (typeof name === "string" && name.trim() !== "") {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
    }

    return ""; // Return an empty string if name is not defined or not a string
  };

  const getRandomColor = (index) => {
    const colors = ["red", "green", "blue", "orange", "purple", "pink"];
    return colors[index % colors.length];
  };

  return (
    <div
      ref={drag}
      style={{
        marginBottom: 10,
        padding: 10,
        // border: "1px solid #ccc",
        // backgroundColor:
        //   theme.colorScheme === "dark"
        //     ? theme.colors.gray[6]
        //     : theme.colors.indigo[0],
        borderRadius: 4,
        marginTop: 10,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div key={task.id}>
        <Card shadow="xl" padding="lg" radius="xl" withBorder>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{task.title}</strong>
              <p>
                {(() => {
                  const dateObj = new Date(task.date);

                  if (isNaN(dateObj) || !isFinite(dateObj)) {
                    return "Invalid Date";
                  }

                  return new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  }).format(dateObj);
                })()}
              </p>
            </div>
            <div>
              <Tooltip label={task.assigned}>
                <Avatar size={30} radius="lg" color={getRandomColor(index)}>
                  {getInitials(task.assigned)}
                </Avatar>
              </Tooltip>
            </div>
          </div>

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
      style={{
        minWidth: 300,
        border: "1.5px solid #ccc",
        borderRadius: 4,
        // backgroundColor: "#f3f0ff",
        padding: 10,
        marginBottom: 20,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Badge
        variant="light"
        color={
          status === "tasks"
            ? "#FF0000"
            : status === "ongoing"
            ? "red"
            : status === "finished"
            ? "green"
            : "#37b24d"
        }
        radius="xl"
        mb="xl"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>

      <div
        ref={drop}
        style={{
          // Set the desired height for the drag-and-drop area
          height: "800px", // Adjust the height as needed
          overflowY: "auto", // Add vertical scrollbar if needed
        }}
      >
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
    </div>
  );
};

const AssignmentModal = ({
  assignmentModalOpenend,
  closeAssignmentModal,
  unassignedTasks,
  assignedValues,
  handleAssigneeChange,
  handleAssignTasksSubmit,
}) => (
  <Modal
    opened={assignmentModalOpenend}
    onClose={closeAssignmentModal}
    // fullScreen
    size="70%"
    title="Add From Inventory"
  >
    <Card>
      <Table>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Type</th>
            <th> Next Maintenance date</th>

            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {unassignedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.device_name}</td>
              <td>{task.device_type}</td>
              <td>
                {new Date(task.next_maintenance_date).toLocaleDateString()}
              </td>
              <td>
                <Input
                  value={assignedValues[task.id] || ""}
                  onChange={(e) =>
                    handleAssigneeChange(task.id, e.target.value)
                  }
                ></Input>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={handleAssignTasksSubmit}
        radius="xl"
        mt="xl"
        variant="gradient"
      >
        Assign Tasks
      </Button>
    </Card>
  </Modal>
);

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
  const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [assignedValues, setAssignedValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUnassignedTasks = async () => {
    try {
      const inventoryResponse = await axios.get(
        "http://127.0.0.1:3000/api/inventory"
      );
      console.log("ionv", inventoryResponse);
      const inventoryTasks = inventoryResponse.data.filter((task) => {
        const nextMaintenanceDate = new Date(task.next_maintenance_date);
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        return (
          nextMaintenanceDate >= new Date() && nextMaintenanceDate <= nextWeek
        );
      });

      const dataResponse = await axios.get("http://0.0.0.0:3000/api/list");
      const exisistingTasksIds = dataResponse.data.map((task) => task.title);

      const unassignedTasks = inventoryTasks
        .map((task) => ({
          ...task,
          next_maintenance_date: new Date(task.next_maintenance_date)
            .toISOString()
            .split("T")[0],
        }))
        .filter((task) => !exisistingTasksIds.includes(task.device_name));
      setUnassignedTasks(unassignedTasks);
      console.log("inventory data", unassignedTasks);
    } catch (error) {
      console.error("Error fetching unassigned tasks: ", error);
    }
  };

  // useEffect(() => {
  //   fetchUnassignedTasks();
  // }, []);

  const fetchData = () => {
    console.log("fetch2");
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
    fetchData();
  }, []);

  //Checking data from inventory

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newAssigned, setNewAssigned] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newStatus, setNewStatus] = useState("tasks");

  //Inventory Assignment

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        assigned: newAssigned,
        date: newDate,
        status: newStatus,
      };

      console.log("add task", newTask);

      axios
        .post("http://localhost:3000/api/tasks", newTask)
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
      .delete(`http://localhost:3000/api/tasks/${taskID}`)
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
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
  };

  const handleOpenAssignmentModal = () => {
    fetchUnassignedTasks();
    setIsModalOpen(true);
  };

  const handleCloseAssignmentModal = () => {
    setIsModalOpen(false);
  };

  const handleAssigneeChange = (taskId, assignee) => {
    // Update the assignedValues state
    setAssignedValues((prevValues) => ({
      ...prevValues,
      [taskId]: assignee,
    }));
  };

  const handleAssignTasksSubmit = () => {
    console.log("Hi shahin");

    const assignedTasks = unassignedTasks.map((task) => ({
      title: task.device_name,
      description: task.device_type,
      assigned: assignedValues[task.id],
      date: task.next_maintenance_date,
      status: "tasks",
    }));

    // console.log("task assigned", assignedTasks);
    handleAssigning(assignedTasks);
  };

  const handleAssigning = (assignedTasks) => {
    console.log("tasd", assignedTasks);

    axios
      .post("http://localhost:3000/api/tasks/bulk-insert", assignedTasks)
      .then((response) => {
        console.log("Tasks added to Kanban");
      })
      .catch((error) => {
        console.error("Error adding tasks", error);
      });
    handleCloseAssignmentModal();
  };

  return (
    <div style={{ gap: 20, justifyContent: "center" }}>
      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <Group>
          <Button onClick={open} radius="xl" variant="gradient">
            Add Task
          </Button>

          <Button
            onClick={handleOpenAssignmentModal}
            radius="xl"
            variant="gradient"
          >
            Inventory Task
          </Button>
        </Group>

        <AssignmentModal
          assignmentModalOpenend={isModalOpen}
          closeAssignmentModal={handleCloseAssignmentModal}
          unassignedTasks={unassignedTasks}
          assignedValues={assignedValues}
          handleAssigneeChange={handleAssigneeChange}
          handleAssignTasksSubmit={handleAssignTasksSubmit}
        />

        {/* <Modal
          opened={isModalOpen}
          onClose={handleCloseAssignmentModal}
          centered
        >
          <Card>
            {unassignedTasks.map((task) => (
              <div key={task.id}>
               
                <p>{task.device_name}</p>
                
              </div>
            ))}

           
          </Card>
        </Modal> */}

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
      {/* Kanban design */}
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
