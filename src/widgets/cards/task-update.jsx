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
export function TaskUpdate({
  open,
  handleOpen,
  title,
  priority,
  status,
  description,
  dueDate,
  getAll,
  id,
}) {
  const [dueDateEdit, setDueDate] = React.useState(dueDate);
  const [priorityEdit, setPriority] = React.useState(priority);
  const [titleEdit, setTitle] = React.useState(title);
  const [descriptionEdit, setDescription] = React.useState(description);
  const [loading, setLoading] = React.useState(false);
  const [taskStatus, setStatus] = React.useState(status);
  const [titleError, setTitleError] = React.useState("");
  const [descError, setDescError] = React.useState("");

  const validateFields = () => {
    if (titleEdit == "" && descriptionEdit == "") {
      setTitleError("Title cannot be empty");
      setDescError("Description cannot be empty");
      return false;
    }

    if (titleEdit == "") {
      setTitleError("Title cannot be empty");
      return false;
    }

    if (descriptionEdit == "") {
      setDescError("Description cannot be empty");
      return false;
    }
  };

  const onClose = () => {
    resetFields();
    handleOpen();
  };

  const handleUpdateTask = async () => {
    const object = {
      dueDate: dueDateEdit,
      priority: priorityEdit.toUpperCase(),
      description: descriptionEdit,
      title: titleEdit,
      userId: "",
      status: status.toUpperCase(),
      id: id,
    };
    if (validateFields() == false) {
      return;
    }
    setLoading(true);
    const response = await taskService
      .updateTask(object)
      .then((data) => {
        toast.success("Task Updated..!");
      })
      .catch((err) => {
        toast.error("Task update error..!");
      })
      .finally(() => {
        setLoading(false);
        getAll();
        handleOpen();
      });
  };

  const resetFields = () => {
    setPriority(priority);
    setTitle(title);
    setDescription(description);
    setDueDate(dueDate);
    setStatus(status);
    setDescError("");
    setTitleError("");
  };
  return (
    <Dialog size="xs" open={open} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Edit Task
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
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
            value={titleEdit}
            placeholder="e.g. study for the test"
            name="title"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => setTitle(e.target.value)}
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
            size="lg"
            label="Description"
            color="gray"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
            value={descriptionEdit}
            onChange={(e) => setDescription(e.target.value)}
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
            value={dueDateEdit}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
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
            value={priorityEdit}
            onChange={(e) => setPriority(e.target.value)}
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

        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Task Status
          </Typography>
          <Select
            label="Task Priority"
            color="gray"
            value={taskStatus}
            onChange={(e) => setStatus(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none hidden",
            }}
          >
            <Option value="Todo">Todo</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Done">Done</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        {loading ? (
          <Spinner className="h-8 w-8" />
        ) : (
          <Button className="ml-auto" onClick={handleUpdateTask}>
            submit
          </Button>
        )}
      </DialogFooter>
      <Toaster position="top-right" />
    </Dialog>
  );
}

TaskUpdate.propTypes = {
  open: PropTypes.node.isRequired,
  handleOpen: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  dueDate: PropTypes.node.isRequired,
  priority: PropTypes.node.isRequired,
  status: PropTypes.node.isRequired,
  getAll: PropTypes.node.isRequired,
  id: PropTypes.node.isRequired,
};
TaskUpdate.displayName = "/src/widgets/cards/task-update.jsx";

export default TaskUpdate;
