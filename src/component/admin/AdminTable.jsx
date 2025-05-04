import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Popover,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getUserList } from "../../Store/reducer/cardreducer";
import { IoEyeSharp } from "react-icons/io5";
import Popup from "../reusable/Popup";
import ImageView from "../Popups/ImageView";

const ROWS_PER_PAGE = 2;

function ItemTable() {
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [popupAnchor, setPopupAnchor] = useState(null);
  const [isAllChecked, setIsAllChecked] = useState(false);
const [opernPopup,setOpenPopup]=useState(false);
   const [filteredRows, setFilteredRows] = useState([  ]);
   const [selectedRow, setSelectedRow] = useState(null);

   const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("paymentFormData"));
    if (Array.isArray(storedArray)) {
      setFilteredRows(storedArray);
    }
  }, []);
  
  // const handleChangePage = (_, newPage) => setPage(newPage);
  console.log(filteredRows);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowCheck = (id) => {
    const updatedRows = filteredRows.map((row) =>
      row.id === id ? { ...row, checked: !row.checked } : row
    );
    setFilteredRows(updatedRows);
  };

  const handleActionClick = (event,id) => {
    event.stopPropagation();
    setPopupAnchor(event.currentTarget);
    setSelectedRowId(id);

  };
  const handleDelete = () => {
    const updatedRows = filteredRows.filter(row => row.orderId !== selectedRowId);
    setFilteredRows(updatedRows);
    localStorage.setItem("paymentFormData", JSON.stringify(updatedRows)); // persist
    setPopupAnchor(null);
  };
  
  const handlePopup = (row) => {
    setSelectedRow(row);
    setOpenPopup(true);
  };
  
  return (
    <div className="container rel mx-auto p-4">
      <div className="overflow-x-auto">
        <TableContainer component={Paper} elevation={0}>
          <Table>
            {/* Header */}
            <TableHead sx={{ bgcolor: "#3F8CFF" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={() => setIsAllChecked(!isAllChecked)}
                    checked={isAllChecked}
                    style={{ color: "white" }}
                  />
                </TableCell>
                {["Product Name","View", "Selling Price",  "Purchase Price","Margin Price", "Status","Action"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      style={{
                        color: "#FFFFFF",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        padding: "12px 9px",
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {
              filteredRows.length===0?(
                <TableRow>
                <TableCell colSpan={8} align="center" className="">
                  <span className="text-2xl   text-gray-500">
                  No product added
                  </span>
                </TableCell>
              </TableRow>
              ):(filteredRows.map((row, index) => (
                <TableRow
                  key={row.orderId}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={row.checked}
                      onChange={() => handleRowCheck(row.id)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>

                  <IoEyeSharp className="text-[#3F8CFF] cursor-pointer"  onClick={()=>handlePopup(row)} size={20}  />

                  </TableCell>

                  <TableCell>{row.sellingPrice}</TableCell>
                  <TableCell>{row.purchaseAmount}</TableCell>
                  {/* <TableCell>{row}</TableCell> */}
                  <TableCell>{row.marginAmount}</TableCell>

                  {/* <TableCell>{row.expiryYear}</TableCell> */}


                  <TableCell>
                    <span
                      className={`rounded-full text-sm font-poppins-regular ${
                        row.sellingPrice ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {row.sellingPrice ? "Success" : "Pendding"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <BsThreeDotsVertical
                      size={16}
                      onClick={(event) => handleActionClick(event,row.orderId)}
                      className="cursor-pointer text-gray-500"
                    />
                  </TableCell>
                </TableRow>
              ))
              )
              
              
              
              }
            </TableBody>
          </Table>


        </TableContainer>
      </div>

      {/* Popover on Action Click */}
      <Popover
        open={Boolean(popupAnchor)}
        anchorEl={popupAnchor}
        onClose={() => setPopupAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { p: 1, minWidth: 150, borderRadius: 1 } }}
      >
        <div className="p-2 text-sm cursor-pointer hover:bg-blue-300 rounded-lg" 
        onClick={handleDelete}
      >Delete</div>
      </Popover>

      <Popup isOpen={opernPopup} onClose={()=>setOpenPopup(false)} >
  <ImageView selectedRow={selectedRow}/>
      </Popup>
    </div>



);
}

export default ItemTable;
