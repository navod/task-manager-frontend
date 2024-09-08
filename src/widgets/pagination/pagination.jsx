import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { fetchTasks } from "@/store/slices/task";
import { useDispatch, useSelector } from "react-redux";

export function Pagination({ data }) {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      getAll(index - 1);
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  const { taskStatus } = useSelector((state) => state.task);

  const getAll = (page) => {
    const params = {
      page: page,
      status: taskStatus,
    };
    dispatch(fetchTasks(params));
  };

  const next = () => {
    if (active === data.totalPages) return;
    getAll(active);
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 0) return;
    getAll(active - 1 - 1);
    setActive(active - 1);
  };

  const loopPagination = () => {
    const items = [];
    for (let i = 1; i <= data.totalPages; i++) {
      items.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    return items;
  };

  return (
    <>
      {data.totalPages > 0 ? (
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">{loopPagination()}</div>
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={active === data.totalPages}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
