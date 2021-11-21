import { useState } from "react";
import CollapsButton from "../CollapsButton";
import Filterbutton from "../FilterButton";
import ListView from "../ListView";
import SearchInput from "../SearchInput";

const DragMenu = () => {
  return (
    <div className="absolute w-full h-[188px] max-h-[876px] shadow-xl rounded-xl bg-white bottom-0 px-6 py-5 z-20">
      <CollapsButton />
      <div className="flex items-center justify-between">
        <SearchInput />
        <Filterbutton />
      </div>
      <ListView />
    </div>
  );
};

export default DragMenu;
