import { DataContext } from "@/DataContext";
import Column from "./Column";
import { useContext } from "react";
import { produce } from "immer";

const Workspace = () => {
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const columns = data[selectedBoardIndex]?.columns;

  const createNewColumn = (num) => ({
    id: Date.now(),
    title: `New Column ${num}`,
    tasks: [],
  });
  const addNewColumnHandler = () => {
    const num = data[selectedBoardIndex].columns.length;
    const newColumn = createNewColumn(num);
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns.push(newColumn);
      }),
    );
  };

  return (
    <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
      {columns?.length &&
        columns.map((item, index) => (
          <Column
            key={item.id}
            id={item.id}
            title={item.title}
            tasks={item.tasks}
            columnIndex={index}
          />
        ))}
      <button
        className="bg-lines-light text-heading-l text-medium-grey w-72 shrink-0 self-start rounded-md p-3"
        onClick={addNewColumnHandler}
      >
        + New column
      </button>
    </div>
  );
};

export default Workspace;
