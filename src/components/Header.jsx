import { useContext, useState } from "react";
import DialogPrimitive from "./DialogPrimitive";
import DropdownPrimitive from "./DropdownPrimitive";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { DataContext } from "@/DataContext";

const Header = () => {
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  const onEditBoard = () => setOpen(true);

  const onDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      setData((prev) => prev.toSpliced(selectedBoardIndex, 1));
    }
  };

  return (
    <header className="flex h-[97px] shrink-0 items-center">
      <div className="border-lines-light flex w-[300px] items-center gap-4 self-stretch border-r border-b pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="border-lines-light flex flex-1 items-center justify-between self-stretch border-b pr-6 pl-6">
        <h2 className="text-heading-xl">Platform Launch</h2>
        <DropdownPrimitive
          items={{
            edit: { label: "Edit Board", onClick: onEditBoard },
            delete: {
              label: "Delete Board",
              onClick: onDeleteBoard,
            },
          }}
          triggerComponent={() => (
            <button className="text-main-purple flex items-center gap-2 text-[14px] font-bold">
              <img src={iconVerticalEllipsis} alt="icon vertical ellipsis" />
            </button>
          )}
        />

        <DialogPrimitive isOpen={open} setOpen={setOpen} title="Edit Board">
          Hello Workd
        </DialogPrimitive>
      </div>
    </header>
  );
};

export default Header;
