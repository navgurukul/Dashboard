// import * as React from 'react';
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import AddIcon from "@mui/icons-material/Add";
// import { Box, Select } from "@mui/material";
// import { useEffect, useState } from "react";
// import showToast from "../../showToast";
// // import CreateBatchModal from "../CreateBatchModal";

// const ITEM_HEIGHT = 48;
// const options = [
//   "Python",
//   "Spoken English",
//   "Typing",
//   "Climate Action",
//   "Scratch",
//   "Foundations of DSA",
//   "C4CA Projects",
// ];

// function BatchMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
// //   const [anchorCourse, setAnchorCourse] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const open = Boolean(anchorEl);
// //   const openPathwayList = Boolean(anchorCourse);
//   const [createBatchOpen, setCreateBatchOpen] = useState(false);
//   const handleCreateBatchToggle = () => setCreateBatchOpen(!createBatchOpen);

//   const handleClickAdd = (event) => {
//     setAnchorEl(event.currentTarget);
//     // setAnchorCourse(event.currentTarget);
//   };

//   const handleCloseAdd = () => {
//     setAnchorEl(null);
//     // setAnchorCourse(null);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     handleCreateBatchToggle();
//     // setAnchorCourse(null);
//     setAnchorEl(null);

//   };
  
//   return (
//     <div>
//       {createBatchOpen && (
//         <CreateBatchModal
//           onToggle={handleCreateBatchToggle}
//           boolean={createBatchOpen}
//           saw={options[selectedIndex]}
//         />
//       )}
//       {/* <Box sx={{ display: "flex" }}>
//         <Box
//           aria-label="more"
//           id="long-button"
//           aria-controls={open ? "long-menu" : undefined}
//           aria-expanded={open ? "true" : undefined}
//           aria-haspopup="true"
//           onClick={handleClick}
//           sx={{ display: "flex", gap: "14px", marginRight: "8px" }}
//         >
//           <MoreHorizIcon sx={{ color: "text.primary", fontSize: "16px" }} />
//         </Box>
//         <Box
//           aria-label="more"
//           id="long-button"
//           aria-controls={openPathwayList ? "long-menu" : undefined}
//           aria-expanded={openPathwayList ? "true" : undefined}
//           aria-haspopup="true"
//           onClick={handleClickAdd}
//         >
//           <AddIcon sx={{ color: "text.primary", fontSize: "16px" }} />
//         </Box>
//       </Box> */}
//       <Menu
//         // id="long-menu"
//         // MenuListProps={{
//         //   "aria-labelledby": "long-button",
//         // }}
//         // anchorCourse={anchorCourse}
//         anchorEl={anchorEl}
//         open= {open}
//         // open={openPathwayList}
//         onClose={handleCloseAdd}
//         // onClick={handleCreateBatchToggle}
//         PaperProps={{
//           style: {
//             maxHeight: ITEM_HEIGHT * 7.5,
//             width: "200px",
//           },
//         }}
//       >
//         {options.map((option, index) => (
//           <MenuItem
//             key={option}
//             selected={index === selectedIndex}
//             onClick={(event) => handleMenuItemClick(event, index)}
//           >
//             {option}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

// export default BatchMenu;
