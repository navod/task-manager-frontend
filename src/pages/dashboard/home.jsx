import React from "react";
import { TaskCard } from "@/widgets/cards";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import TaskAdd from "@/widgets/cards/task-add";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setTaskStatus } from "@/store/slices/task";
import { Pagination } from "@/widgets/pagination/pagination";

export function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const dispatch = useDispatch();

  const { tasks, loading, error, taskStatus } = useSelector(
    (state) => state.task
  );

  const getAll = () => {
    const params = {
      page: 0,
      status: "All",
    };
    dispatch(setTaskStatus("All"));
    dispatch(fetchTasks(params));
  };

  return (
    <div className="mt-12">
      {loading && !tasks ? (
        <div className="flex justify-center h-screen items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-10">
            <Typography variant="h6">
              All tasks ({tasks.totalElements} tasks)
            </Typography>
            <Button size="sm" onClick={handleOpen}>
              <Typography className="capitalize">Add New Task</Typography>
            </Button>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
            {tasks.content?.map((props) => (
              <TaskCard key={props.id} {...props} getAll={getAll} />
            ))}
          </div>

          <TaskAdd open={open} handleOpen={handleOpen} getAll={getAll} />
        </>
      )}

      <div className="flex justify-center mt-20 mb-10">
        <Pagination data={tasks} />
      </div>
    </div>
  );
}

export default Home;
