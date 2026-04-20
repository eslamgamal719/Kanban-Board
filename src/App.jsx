import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import WorkSpace from "./components/Workspace";
import { DataContext } from "./DataContext";

function App() {
  const [dataState, setDataState] = useState([]);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  return (
    <DataContext.Provider
      value={{
        data: dataState,
        setData: setDataState,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      <div class="font-jakarta flex h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <SideMenu />
          <WorkSpace columns={dataState[selectedBoardIndex]?.columns} />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
