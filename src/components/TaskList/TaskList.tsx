/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCheck } from "react-icons/fa";
import Task from "../Task/Task";
import type { TaskEntity } from "../Task/Task";

import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../../lib/store";

const LoadingRow = () => {
  return (
    <div className="animate-pulse py-4 px-4 gap-6 flex items-center">
      <span className="bg-slate-200 h-6 w-6" />
      <span className="flex gap-2 h-6 w-full">
        <span className="bg-slate-200 w-40" />
        <span className="ms-auto bg-slate-200 w-6 " />
      </span>
    </div>
  );
};

const Loading = () => {
  return (
    <div
      data-testid="loading"
      id="loading"
      className="flex flex-col divide-y divide-emerald-100 bg-blue-600 text-white"
    >
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
      <LoadingRow />
    </div>
  );
};

const TasksEmpty = () => {
  return (
    <div
      data-testid="task-empty"
      className="flex flex-col bg-blue-600 p-4 items-center justify-center h-[300px] text-white"
    >
      <FaCheck className="text-[4rem] mb-2" />

      <p>You don't have any tasks!</p>
      <p>Just relax and chill.</p>
    </div>
  );
};

const TaskList = () => {
  // We're retrieving our state from the store
  const tasks = useSelector<any, any>((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter(
        (t: { state: string }) => t.state === "TASK_PINNED"
      ),
      ...state.taskbox.tasks.filter(
        (t: { state: string }) => t.state !== "TASK_PINNED"
      ),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
  }) as TaskEntity[];

  const { status } = useSelector<any, any>((state) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value: string) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value: string) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (tasks.length === 0) {
    return <TasksEmpty />;
  }

  return (
    <div data-testid="task-list" className="divide-y divide-slate-100">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onArchiveTask={(id) => archiveTask(id)}
          onPinTask={(id) => pinTask(id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
