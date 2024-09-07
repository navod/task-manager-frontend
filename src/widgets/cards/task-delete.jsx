import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import taskService from "@/services/task.service";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

export function TaskDelete({ open, handleOpen, getAll, id }) {
  const [loading, setLoading] = useState(false);
  const handleDeleteTask = async () => {
    setLoading(true);
    const response = await taskService
      .deleteTask(id)
      .then((data) => {
        toast.success("Task Deleted..!");
      })
      .catch(() => {
        toast.error("Task deleting error..!");
      })
      .finally(() => {
        setLoading(false);
        getAll();
        handleOpen();
      });
  };
  return (
    <Dialog
      open={open}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Are you sure?</DialogHeader>
      <DialogBody divider>
        Do you really want to delete this item? This action cannot be undone.
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>No</span>
        </Button>
        {loading ? (
          <Spinner className="h-8 w-8" />
        ) : (
          <Button variant="gradient" color="green" onClick={handleDeleteTask}>
            <span>Yes</span>
          </Button>
        )}
      </DialogFooter>
      <Toaster position="top-right" />
    </Dialog>
  );
}

TaskDelete.propTypes = {
  id: PropTypes.node.isRequired,
  open: PropTypes.node.isRequired,
  handleOpen: PropTypes.node.isRequired,
  getAll: PropTypes.node.isRequired,
};

TaskDelete.displayName = "/src/widgets/cards/task-delete.jsx";

export default TaskDelete;
