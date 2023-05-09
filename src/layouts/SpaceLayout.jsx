import { Outlet } from "react-router-dom";
import SpaceAside from "../components/PartnerSpace/SpaceAside";
import { useState } from "react";
import CreateSpaceModal from "../components/PartnerSpace/CreateSpaceModal";

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
    <main
      style={{
        display: "flex",
      }}
    >
      <SpaceAside value={valueToShare} />
      <Outlet context={valueToShare} />
      {createSpaceOpen && (
        <CreateSpaceModal
          onToggle={handleCreateSpaceToggle}
          boolean={createSpaceOpen}
        />
      )}
    </main>
  );
}

export default SpaceLayout;
