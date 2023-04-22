import { useSelector, useDispatch } from "react-redux";
import { fetchPartners } from "../../store";
import { useThunk } from "../../hooks/useThunk";
import { useEffect } from "react";
import { Container } from "@mui/material";

//components
import PartnersTable from "../../components/partners/PartnersTable";
import SearchBar from "../../components/partners/PartnerSearchBar";

function PartnersPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, data, error } = useSelector(
    ({
      partners: { data, isLoading, error },
      partnerSearch: { searchTerm },
    }) => {
      let lowerCased = searchTerm?.toLowerCase();
      const filteredData = data.filter((partner) =>
        partner.name.toLowerCase().includes(lowerCased)
      );

      return {
        data: filteredData,
        isLoading,
        error,
      };
    }
  );

  useEffect(() => {
    dispatch(fetchPartners(token));
  }, [dispatch]);

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else {
    content = <PartnersTable data={data} />;
  }

  return (
    <Container>
      <SearchBar />
      {content}
    </Container>
  );
}

export default PartnersPage;
