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
  //  console.log(data);
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
    content = <h1>Loading....</h1>;
  } else if (error) {
    <h1>Error fetching partners...</h1>;
  } else {
    content = <NewPartnerTable data={filteredData} />;
  }

  return (
    <Box
      style={{
        overflowY: "scroll",
        width: "100%",
        height: "100%",
        padding: "5% 10%",
      }}
    >
      <PartnerFilter />
      {content}
    </Box>
  );
}

export default PartnersListPage;
