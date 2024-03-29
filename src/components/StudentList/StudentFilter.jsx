import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchBatchsQuery } from "../../store";
import { useParams } from "react-router";
import { Box } from "@mui/system";

//components
import StudentList from "./StudentList";

function StudentFilter() {
  const { spaceId, groupId, partnerId, batchId } = useParams();
  const { data, isLoading, error } = useFetchBatchsQuery(batchId);
 
// if (data.length<1) {
//     return <div>No students found</div>;
//   }
  const { filteredData } = useSelector(
    ({ studentFilter: { searchTerm, filterBy } }) => {
    const lowerCased = searchTerm?.toLowerCase();
    let filteredData;
    if (!data?.status) {
      filteredData = data?.filter((student) => {
      const firstName = student.name.toLowerCase();
      if (filterBy === "All Students") {
        return student.name.toLowerCase().includes(lowerCased);
      }
      return (
        student.name.toLowerCase().includes(lowerCased) && student.status === filterBy
      );
    });
  }else{
    filteredData = []
  }
    return {
      filteredData,
    };
  });

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (error) {
    <h1>Error fetching partners...</h1>;
  } else {
    content = <StudentList data={filteredData} />;
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
}

export default StudentFilter;
