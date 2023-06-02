import { Box } from "@mui/material";
import PartnerFilter from "../../PartnersList/PartnerFilter";
import NewPartnerTable from "../../PartnersList/NewPartnerTable";
import GroupStudentsFilter from "./GroupStudentsFilter";

function GroupStudentsTable({ handleAddStudentsOpen }) {
  return (
    <Box pr="20px" mt="15px">
      <GroupStudentsFilter handleAddStudentsOpen={handleAddStudentsOpen} />
      {/*  */}
    </Box>
  );
}

export default GroupStudentsTable;
