import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchAttendanceQuery } from "../../store";
import { useParams } from "react-router-dom";
//components
import AttendanceList from "./AttendanceList"

function AttendanceFilter() {
  const { spaceId, groupId, partnerId, batchId } = useParams();
  const { data, isLoading, error } = useFetchAttendanceQuery(batchId);
 console.log(data);

  const { filteredData } = useSelector(
    ({ attendanceFilter: { searchTerm, filterBy } }) => {
      const lowerCased = searchTerm?.toLowerCase();
      const filteredData = data?.filter((student) => {
        const firstName = student.name.toLowerCase();
        if (filterBy === "All Students") {
          return firstName.includes(lowerCased);
        }
        return firstName.includes(lowerCased) && employee.status === filterBy;
      });
      return {
        filteredData,
      };
    }
  );

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (error) {
    <h1>Error fetching partners...</h1>;
  } else {
    content = <AttendanceList data={filteredData} />;
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
}

export default AttendanceFilter;
