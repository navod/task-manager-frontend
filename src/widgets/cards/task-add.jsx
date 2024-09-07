import React from "react";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Textarea,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import taskService from "@/services/task.service";
import { Toaster, toast } from "react-hot-toast";

export function TaskAdd({ open, handleOpen, getAll }) {
  const [dueDate, setDueDate] = React.useState("");
  const [priority, setPriority] = React.useState("Medium");
  const [descripton, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [titleError, setTitleError] = React.useState("");
  const [descError, setDescError] = React.useState("");

  const validateFields = () => {
    if (descError == "" && titleError == "") {
      setTitleError("Title cannot be empty");
      setDescError("Description cannot be empty");
      return false;
    }
    if (title == "") {
      setTitleError("Title cannot be empty");
      return false;
    }

    if (descError == "") {
      setDescError("Description cannot be empty");
      return false;
    }
  };
  const handleAddNewTask = async () => {
    const object = {
      dueDate: dueDate,
      priority: priority.toUpperCase(),
      description: descripton.trim(),
      title: title.trim(),
      userId: "32cedb0a-eb87-4110-9182-240ddc0d3f67",
      status: "TODO",
    };
    if (validateFields() == false) {
      return;
    }
    setLoading(true);
    const response = await taskService
      .addTask(object)
      .then((data) => {
        toast.success("Task Added..!");
      })
      .catch(() => {
        toast.error("Task adding error..!");
      })
      .finally(() => {
        setLoading(false);
        getAll();
        clearData();
        handleOpen();
      });
  };

  const clearData = () => {
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setTitle("");
    setDescError("");
    setTitleError("");
  };

  const closeModal = () => {
    clearData();
    handleOpen();
  };

  return (
    <Dialog size="xs" open={open} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Add Task
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={closeModal}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-4 pb-6">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Title*
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="e.g. study for the test"
            name="title"
            containerProps={{
              className: "!min-w-full",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          {titleError && (
            <Typography variant="small" color="red" className="mt-2">
              {titleError}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Description*
          </Typography>
          <Textarea
            containerProps={{
              className: "!min-w-full",
            }}
            size="lg"
            value={descripton}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            color="gray"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
          />

          {descError && (
            <Typography variant="small" color="red" className="mt-2">
              {descError}
            </Typography>
          )}
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Due Date
          </Typography>
          <Input
            type="date"
            color="gray"
            size="lg"
            name="due_date"
            value={dueDate}
            containerProps={{
              className: "!min-w-full",
            }}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Priority
          </Typography>
          <Select
            label="Task Priority"
            color="gray"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            containerProps={{
              className: "!min-w-full",
            }}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
          >
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        {loading ? (
          <Spinner className="h-8 w-8" />
        ) : (
          <Button className="ml-auto" onClick={handleAddNewTask}>
            submit
          </Button>
        )}
      </DialogFooter>
      <Toaster position="top-right" />
    </Dialog>
  );
}

TaskAdd.propTypes = {
  open: PropTypes.node.isRequired,
  handleOpen: PropTypes.node.isRequired,
  getAll: PropTypes.node.isRequired,
};
TaskAdd.displayName = "/src/widgets/cards/task-add.jsx";

export default TaskAdd;
