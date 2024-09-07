import React from "react";
import {
  CalendarDateRangeIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { TaskUpdate, TaskDelete } from "@/widgets/cards";
import { capitalizeFirstLetter, getPriorityColor } from "@/utility/utility";

export function TaskCard({
  color,
  title,
  description,
  dueDate,
  priority,
  status,
  getAll,
  id,
}) {
  const [open, setOpen] = React.useState(false);
  const [obj, setObj] = React.useState({
    title: title,
    dueDate: dueDate,
    status: capitalizeFirstLetter(status.toLowerCase()),
    priority: capitalizeFirstLetter(priority.toLowerCase()),
    description: description,
    id: id,
  });

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleOpen = () => {
    setObj(obj);
    setOpen((cur) => !cur);
  };

  const handleDeleteOpen = () => {
    setObj(obj);
    setDeleteOpen((cur) => !cur);
  };

  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" floated={false} shadow={false}>
        <Typography variant="h6" color="blue-gray" className="capitalize">
          {title}
        </Typography>
        <Typography
          variant="small"
          className="font-normal mt-3 text-blue-gray-600"
        >
          {description}
        </Typography>
      </CardHeader>
      <CardBody className="px-4 mt-5 gap-2 flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <CalendarDateRangeIcon className="size-6" />

          <Typography
            variant="small"
            color="blue-gray-600"
            className="border-blue-gray-50 italic text-xs font-bold"
          >
            {dueDate ? dueDate : "No due date"}
          </Typography>
        </div>

        <Chip
          value={priority}
          color={getPriorityColor(priority)}
          className={`tracking-wider font-normal text-white rounded-full capitalize`}
        />
      </CardBody>

      <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
        <div className="flex justify-between items-center">
          <Button className="rounded-full" variant="filled" size="sm">
            <Typography
              color="inherit"
              className="font-medium text-xs capitalize"
            >
              {status}
            </Typography>
          </Button>
          <div className="flex gap-1 items-center">
            <IconButton variant="text">
              <TrashIcon
                className="w-6"
                color="red"
                onClick={handleDeleteOpen}
              />
            </IconButton>
            <IconButton variant="text" onClick={handleOpen}>
              <EllipsisVerticalIcon className="w-6" color="black" />
            </IconButton>
          </div>
        </div>
      </CardFooter>
      <TaskDelete
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        id={id}
        getAll={getAll}
      />
      <TaskUpdate
        open={open}
        handleOpen={handleOpen}
        {...obj}
        getAll={getAll}
      />
    </Card>
  );
}

TaskCard.defaultProps = {
  color: "blue",
};

TaskCard.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  dueDate: PropTypes.node.isRequired,
  priority: PropTypes.node.isRequired,
  status: PropTypes.node.isRequired,
  getAll: PropTypes.node.isRequired,
  id: PropTypes.node.isRequired,
};

TaskCard.displayName = "/src/widgets/cards/task-card.jsx";

export default TaskCard;
