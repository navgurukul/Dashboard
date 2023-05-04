import { Outlet } from "react-router-dom";
import PartnerSpaceAside from "../components/PartnerSpace/PartnerSpaceAside";
import { useState } from "react";
import CreateSpaceModal from "../components/PartnerSpace/CreateSpaceModal";

function SpaceLayout() {
  const [createSpaceOpen, setCreateStateOpen] = useState(false);

  const handleCreateSpaceToggle = () => {
    setCreateStateOpen(!createSpaceOpen);
  };

  const valueToShare = {
    createSpaceOpen,
    handleCreateSpaceToggle,
  };

  return (
    <main
      style={{
        display: "flex",
      }}
    >
      <PartnerSpaceAside value={valueToShare} />
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
