import { FaStar, FaCheck } from "react-icons/fa";

type TaskState = "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED";

export type TaskEntity = {
  id: string;
  title: string;
  state: TaskState;
};

interface TaskProps {
  task: TaskEntity;
  onArchiveTask?: (id: string) => void;
  onPinTask?: (id: string) => void;
}

const Task = ({
  task: { id, state, title },
  onArchiveTask,
  onPinTask,
}: TaskProps) => {
  return (
    <div className={`flex px-4 py-4 gap-4 bg-blue-600`}>
      <label
        htmlFor="checked"
        aria-label={`archieveTask-${id}`}
        className={`relative border ${
          state === "TASK_ARCHIVED" ? "border-none" : "border-white"
        } h-full w-6 cursor-pointer`}
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
          className="appearance-none"
        />

        {state === "TASK_ARCHIVED" && (
          <FaCheck className="absolute text-white top-[4px] left-[3px]" />
        )}

        <span onClick={() => onArchiveTask && onArchiveTask(id)} />
      </label>

      <label htmlFor="title" aria-label={title} className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input title"
          className="bg-transparent text-white shadow-[0_1px_0_0_rgba(255,255,255,1)] focus:border-none focus:ring-none focus:outline-none focus:ring-0"
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button
          className={`ms-auto ${
            state === "TASK_PINNED" ? "text-yellow-400" : "text-white"
          } ${
            state === "TASK_PINNED"
              ? "hover:text-yellow-400"
              : "hover:text-yellow-300"
          } focus:text-yellow-400 text-2xl`}
          onClick={() => onPinTask && onPinTask(id)}
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          key={`pinTask-${id}`}
        >
          <FaStar />
        </button>
      )}
    </div>
  );
};

export default Task;
