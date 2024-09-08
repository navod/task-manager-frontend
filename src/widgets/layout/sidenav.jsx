import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { taskStatus as taskStatusData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setTaskStatus } from "@/store/slices/task";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };


  const { taskStatus } = useSelector((state) => state.task);

  const dispatchRedux = useDispatch();
  const sidenavType = "dark";

  const getAll = (type) => {
    dispatchRedux(setTaskStatus(type));
    const params = {
      page: 0,
      status: type,
    };
    dispatchRedux(fetchTasks(params));
  };
  React.useState(() => {
    getAll("All");
  }, [dispatchRedux]);

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {taskStatusData.map(({ title, icon, type }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            <li key={key}>
              <Button
                variant={type == taskStatus ? "gradient" : "text"}
                color={sidenavType === "dark" ? "white" : "blue-gray"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
                onClick={() => getAll(type)}
              >
                {React.createElement(icon, {
                  className: `!w-5 !h-5 red-20`,
                })}
                <Typography color="inherit" className="font-medium capitalize">
                  {title}
                </Typography>
              </Button>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct-dark.png",
  brandName: "Task Manager",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
