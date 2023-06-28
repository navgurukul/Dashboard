import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchBatchsQuery } from "../../store";

//components
import StudentList from "./StudentList";

function StudentFilter() {
  const { data, isLoading, error } = useFetchBatchsQuery();

  // console.log(data);

  const { filteredData } = useSelector(
    ({ studentFilter: { searchTerm, filterBy } }) => {
      const lowerCased = searchTerm?.toLowerCase();
      const filteredData = data?.filter((employee) => {
        const firstName = employee.firstName.toLowerCase();
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
    content = <StudentList data={filteredData} />;
  }

  return (
    <>
      <div>{content}</div>
    </>
  );
}

export default StudentFilter;
