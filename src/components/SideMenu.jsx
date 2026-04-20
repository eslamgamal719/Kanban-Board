import clsx from "clsx";
import { useContext, useState } from "react";
import DialogPrimitive from "./DialogPrimitive";
import iconBoard from "@assets/icon-board.svg";
import { DataContext } from "@/DataContext";
import AddNewBoardForm from "./AddNewBoardForm";

/**
 *
 * @param {Object} props
 * @param {Number} props.data.selectedBoardIndex
 * @param {Function} props.data.setSelectedBoardIndex
 * @returns {JSX.Element}
 */
const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const { data, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);

  return (
    <aside className="side-menu border-lines-light -mt-px w-[300px] border-r bg-white">
      <p className="text-heading-s px-8 py-4">ALL BOARDS ({data.length})</p>
      <ul>
        {data.map((item, index) => (
          <li key={item.id}>
            <button
              className={clsx(
                "text-heading-m text-medium-grey data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 transition",
                {
                  "bg-main-purple hover:bg-main-purple !text-white":
                    selectedBoardIndex === index,
                },
              )}
              data-isactive={selectedBoardIndex === index}
              onClick={() => setSelectedBoardIndex(index)}
            >
              <img src={iconBoard} alt="" /> {item.title}
            </button>
          </li>
        ))}
        <li className="px-8 py-4">
          <DialogPrimitive
            isOpen={open}
            setOpen={setOpen}
            title="Create new board"
            triggerComponent={
              <button className="text-heading-m text-main-purple flex w-full items-center gap-4">
                <img src={iconBoard} alt="" /> + Create New Board
              </button>
            }
          >
            <AddNewBoardForm toggleDialog={setOpen} />
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
