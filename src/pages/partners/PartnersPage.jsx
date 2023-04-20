import { useSelector, useDispatch } from "react-redux";
import { fetchPartners } from "../../store";
import { useThunk } from "../../hooks/useThunk";
import { useEffect } from "react";

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

  return <div>PartnersPage</div>;
}

export default PartnersPage;
