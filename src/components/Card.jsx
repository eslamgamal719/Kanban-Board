import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useContext, useState } from "react";

const Card = ({ title, columnId, cardId, cardIndex, columnIndex }) => {
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setData((prev) => {
        const newData = [...prev];
        const newColumns = newData[selectedBoardIndex].columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== cardId),
            };
          }
          return column;
        });
        newData[selectedBoardIndex] = {
          ...newData[selectedBoardIndex],
          columns: newColumns,
        };
        return newData;
      });
    }
  };

  const onFocusHandler = (e) => {
    e.target.select();
  };

  const toggleEditMode = () => setIsEditMode(true);

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    if (e.target.value.trim() === title) return;
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns[columnIndex].tasks[cardIndex].title =
          e.target.value.trim();
      }),
    );
  };

  const onKeyDownHandler = (e) => {
    e.key === "Enter" && e.target.blur();
  };

  return (
    <div className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm">
      {isEditMode ? (
        <textarea
          className="text-heading-m outline-light-grey h-full resize-none"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
          defaultValue={title}
          autoFocus
        ></textarea>
      ) : (
        <button
          className="peer text-heading-m h-full text-start"
          onClick={toggleEditMode}
        >
          {title}
        </button>
      )}
      <button
        className="text-body-m text-red absolute top-0 right-0 bottom-0 bg-white p-2 opacity-0 shadow duration-300 group-hover/card:opacity-100 peer-focus:opacity-100 focus:opacity-100"
        onClick={onDeleteHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
