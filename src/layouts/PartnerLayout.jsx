import { Outlet } from "react-router-dom";
import Sidebar from "../components/Partner/Sidebar/Sidebar";
import { useState } from "react";
import CreateSpaceModal from "../components/Partner/Space/CreateSpaceModal";
import CreateGroupModal from "../components/Partner/Group/CreateGroupModal";

function PartnerLayout() {
  const [createSpaceOpen, setCreateStateOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const handleCreateSpaceToggle = () => setCreateStateOpen(!createSpaceOpen);
  const handleCreateGroupToggle = () => setCreateGroupOpen(!createGroupOpen);

  const valueToShare = {
    createSpaceOpen,
    handleCreateSpaceToggle,
    createGroupOpen,
    handleCreateGroupToggle,
  };

  return (
    <main style={{ display: "flex", height: "calc(100vh - 80px)" }}>
      <Sidebar value={valueToShare} />
      <Outlet context={valueToShare} />
      {/* outlet modals  */}
      {createSpaceOpen && (
        <CreateSpaceModal
          onToggle={handleCreateSpaceToggle}
          boolean={createSpaceOpen}
        />
      )}

      {createGroupOpen && (
        <CreateGroupModal
          onToggle={handleCreateGroupToggle}
          boolean={createGroupOpen}
        />
      )}
    </main>
  );
}

export default PartnerLayout;
