import HttpService from "./http.service";
const SUB_URL = "api/v1/task/";
class taskService {
  getAllTasks = async (params) => {
    const getAllTaskEndpoint =
      SUB_URL +
      `get-all?page=${params.page}&size=10&sortBy=priority&order=DESC&status=${params.status}`;
    return await HttpService.get(getAllTaskEndpoint);
  };

  addTask = async (payload) => {
    const addTaskEndPoint = SUB_URL + `create`;
    return await HttpService.post(addTaskEndPoint, payload);
  };

  updateTask = async (payload) => {
    const updateTaskEndPoint = SUB_URL + `update`;
    return await HttpService.put(updateTaskEndPoint, payload);
  };

  deleteTask = async (id) => {
    const deleteTaskEndpoint = SUB_URL + `delete?id=${id}`;
    return await HttpService.delete(deleteTaskEndpoint);
  };
}

export default new taskService();
