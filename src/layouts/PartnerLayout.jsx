import { Outlet } from "react-router-dom";
import Sidebar from "../components/Partner/Sidebar/Sidebar";
import { useState } from "react";
import CreateSpaceModal from "../components/Partner/Space/CreateSpaceModal";
import CreateGroupModal from "../components/Partner/Group/CreateGroupModal";
import CreateBatchModal from "../components/Partner/Batch/CreateBatchModal";

function PartnerLayout() {
  const [createSpaceOpen, setCreateStateOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [createBatchOpen, setCreateBatchOpen] = useState(false);

  const handleCreateSpaceToggle = () => setCreateStateOpen(!createSpaceOpen);
  const handleCreateGroupToggle = () => setCreateGroupOpen(!createGroupOpen);
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
        height: "calc (100vh - 80px)",
        // border: "10px solid blue",
        marginTop: "80px",
        position: "fixed",
        width: "100%",
      }}
    >
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

      {createBatchOpen && (
        <CreateBatchModal
          onToggle={handleCreateBatchToggle}
          boolean={createBatchOpen}
        />
      )}
    </main>
  );
}

export default PartnerLayout;
