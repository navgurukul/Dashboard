import { useSelector, useDispatch } from "react-redux";
import { fetchPartners } from "../../store";
import { useThunk } from "../../hooks/useThunk";
import { useEffect } from "react";

//components
import PartnersTable from "../../components/partners/PartnersTable";

function PartnersPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, data, error } = useSelector((state) => {
    return state.partners;
  });
  console.log(isLoading, data, error);

  useEffect(() => {
    dispatch(fetchPartners(token));
  }, [dispatch]);

  return (
    <div>
      <PartnersTable data={data} />
    </div>
  );
}

export default PartnersPage;
