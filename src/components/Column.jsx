import { DataContext } from "@/DataContext";
import Card from "./Card";
import { useContext } from "react";

const Column = ({ id, title, tasks = [] }) => {
  const { selectedBoardIndex, data, setData } = useContext(DataContext);

  const createNewTask = () => ({ id: Date.now(), title: "New Task" });

  const createNewColumnsArray = (dataArray, boardIndex, newTask) => {
    return dataArray[selectedBoardIndex].columns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          tasks: [...column.tasks, newTask],
        };
      }
      return column;
    });
  };

  const addNewTaskHandler = () => {
    const newTask = createNewTask();
    const newColumns = createNewColumnsArray(data, selectedBoardIndex, newTask);
    setData((prev) => {
      const newData = [...prev];
      newData[selectedBoardIndex] = {
        ...newData[selectedBoardIndex],
        columns: newColumns,
      };
      return newData;
    });
  };

  return (
    <div className="bg-lines-light flex w-72 shrink-0 flex-col self-start rounded-lg px-2 shadow">
      <h2 className="group/column bg-lines-light text-heading-s relative top-0 rounded px-2 py-4">
        {title} ({tasks?.length})
      </h2>
      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            cardId={item.id}
            columnId={id}
          />
        ))}
      </div>
      <button
        className="border-light-grey bg-lines-light text-heading-m text-medium-grey -mx-2 mt-auto border-t px-2 py-4"
        onClick={addNewTaskHandler}
      >
        + Add new task
      </button>
    </div>
  );
};

export default Column;
