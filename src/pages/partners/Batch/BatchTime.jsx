import React from "react";
import { useParams } from "react-router-dom";
import { useFetchSingleBatchQuery } from "../../../store";

const BatchTime = () => {
  const { batchId } = useParams();
  const { data, isLoading, error } = useFetchSingleBatchQuery(batchId);

  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[date.getMonth()];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Adding leading zeros if needed
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
    return `${day} ${getMonthName(dateString)} ${year}`;
  };

  const startDateTime = data?.batch_start_date; // Use the start_time from the API data
  const endDateTime = data?.batch_end_date; // Use the end_time from the API data
  const startFormattedDate = formatDate(startDateTime);
  const endFormattedDate = formatDate(endDateTime);

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <span> {startFormattedDate} to {endFormattedDate} </span>
        </>
      )}
    </>
  );
};

export default BatchTime;
