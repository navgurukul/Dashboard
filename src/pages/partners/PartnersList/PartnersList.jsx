import { useSelector, useDispatch } from "react-redux";
import { fetchPartners } from "../../../store";
import { useThunk } from "../../../hooks/useThunk";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

//components
import PartnersTable from "../../../components/PartnersList/PartnersTable";
import PartnerFilter from "../../../components/PartnersList/PartnerFilter";
import PartnerUpdateModal from "../../../components/PartnersList/PartnerUpdateModal";

function PartnersPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { isLoading, data, error } = useSelector(
    ({
      partners: { data, isLoading, error },
      partnerFilter: { searchTerm, filterBy },
    }) => {
      let lowerCased = searchTerm?.toLowerCase();
      const filteredData = data.filter((partner) => {
        if (filterBy === "All Partners") {
          return partner.name.toLowerCase().includes(lowerCased);
        }
        return (
          partner.name.toLowerCase().includes(lowerCased) &&
          partner.status === filterBy
        );
      });

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
    <>
      <Container>
        <PartnerFilter />
        {content}
      </Container>
    </>
  );
}

export default PartnersPage;
