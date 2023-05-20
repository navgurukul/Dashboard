import { Outlet } from "react-router-dom";
import SpaceAside from "../components/Partner/SpaceAside";
import { useState } from "react";
import CreateSpaceModal from "../components/Partner/CreateSpaceModal";
import CreateBatchModal from "../components/Partner/CreateBatchModal";

function SpaceLayout() {
  const [createSpaceOpen, setCreateStateOpen] = useState(false);
  const [createBatchOpen, setCreateBatchOpen] = useState(false);

  const handleCreateSpaceToggle = () => {
    setCreateStateOpen(!createSpaceOpen);
  };

  const handleCreateBatchToggle = () => {
    setCreateBatchOpen(!createBatchOpen);
  };

  const valueToShare = {
    createSpaceOpen,
    handleCreateSpaceToggle,
    createBatchOpen,
    handleCreateBatchToggle,
  };

  return (
    <main style={{ display: "flex", height: "calc(100vh-80px)" }}>
      <SpaceAside value={valueToShare} />
      <Outlet context={valueToShare} />
      {createSpaceOpen && (
        <CreateSpaceModal
          onToggle={handleCreateSpaceToggle}
          boolean={createSpaceOpen}
        />
      )}
      {createBatchOpen && (
        <CreateBatchModal
          onToggle={handleCreateBatchToggle}
          boolean={createBatchOpen}
        />
      )}
    </main>
  );
}

export default SpaceLayout;
