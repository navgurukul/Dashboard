import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useFetchPartnersQuery } from "../../../store";

//components
// import PartnersTable from "../../../components/PartnersList/PartnersTable";
import NewMuiTable from "../../../components/PartnersList/NewMuiTable";
import PartnerFilter from "../../../components/PartnersList/PartnerFilter";

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
    content = <NewMuiTable data={filteredData} />;
  }

  return (
    <>
      <div style={{ width: "1215px", margin: "0px auto" }}>
        <PartnerFilter />
        {content}
      </div>
    </>
  );
}

export default PartnersListPage;
