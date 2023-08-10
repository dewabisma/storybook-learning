/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchTasks } from "../../lib/store";

import TaskList from "../../components/TaskList/TaskList";

const Inbox = () => {
  const dispatch = useDispatch<any>();
  // We're retrieving the error field from our updated store
  const { error } = useSelector<any, any>((state) => state.taskbox);
  // The useEffect triggers the data fetching when the component is mounted
  React.useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return (
      <div data-testid="inbox-error" className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">Something went wrong</p>
        </div>
      </div>
    );
  }
  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>

      <TaskList />
    </div>
  );
};

export default Inbox;
