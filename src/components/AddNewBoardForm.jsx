import { useContext, useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import iconCross from "@assets/icon-cross.svg";
import { DataContext } from "@/DataContext";

const AddNewBoardForm = ({ toggleDialog }) => {
  const [columnsArray, setColumnsArray] = useState([{ id: Date.now() }]);
  const { setData, setSelectedBoardIndex } = useContext(DataContext);

  const removeColumnHandler = (id) => {
    setColumnsArray((prev) => prev.filter((column) => id !== column.id));
  };

  const addNewColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now() }]);
  };

  const createNewColumnsArray = (boardName, formData, columnsArray) => {
    return columnsArray.map((column) => {
      return {
        id: column.id,
        title: formData.get(column.id),
        tasks: [],
      };
    });
  };

  const updateData = (boardName, newColumnsArray, setData) => {
    setData((prev) => {
      setSelectedBoardIndex(prev.length);
      return [
        ...prev,
        { id: Date.now(), title: boardName, columns: newColumnsArray },
      ];
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnsArray = createNewColumnsArray(
      boardName,
      formData,
      columnsArray,
    );

    updateData(boardName, newColumnsArray, setData);
    toggleDialog(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3 className="text-body-m text-medium-grey pt-6 pb-2">Name</h3>
        <TextField placeholder="e.g. Web Design" name="boardName" required />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-body-m text-medium-grey pt-6">Columns</h3>
        {columnsArray.map((obj) => (
          <div key={obj.id} className="flex items-center gap-4">
            <TextField
              defaultValue={obj.title}
              name={obj.id}
              placeholder="e.g. Web Design"
              required
            />
            <button type="button" onClick={() => removeColumnHandler(obj.id)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          Create New Board
        </Button>
      </div>
    </form>
  );
};

export default AddNewBoardForm;
