import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchPartnersQuery } from "../../../store";
import { Box } from "@mui/material";

//components
// import PartnersTable from "../../../components/PartnersList/PartnersTable";
import PartnerFilter from "../../../components/PartnersList/PartnerFilter";
import NewPartnerTable from "../../../components/PartnersList/NewPartnerTable";

function PartnersListPage() {
  const { data, isLoading, error } = useFetchPartnersQuery();

  const { filteredData } = useSelector(
    ({ partnerFilter: { searchTerm, filterBy } }) => {
      let lowerCased = searchTerm?.toLowerCase();
      const filteredData = data?.partners?.filter((partner) => {
        if (filterBy === "All Partners") {
          return partner.name.toLowerCase().includes(lowerCased);
        }
        return (
          partner.name.toLowerCase().includes(lowerCased) &&
          partner.status === filterBy
        );
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
    content = <NewPartnerTable data={filteredData} />;
  }

  return (
    <>
      <Box
        style={{
          width: "1215px",
          maxHeight: "calc(100vh - 75px)",
          // border: "1px solid red",
          position: "fixed",
          // textAlign:"center",
          overflowY: "scroll",
          top: "10%",
          left: "10%",
          // transform: "translate(-10%, -10%)",
          padding: "0px 25px",
        }}
      >
        <PartnerFilter />
        {content}
      </Box>
    </>
  );
}

export default PartnersListPage;
