import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// import Button from "../../components/shared/Button";
// import TableComponent from "../../components/lead-management/all-lead/Table";
import {
  MdBlockFlipped,

} from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoStopwatch, GoTrash } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
// import ItemMenu from "../../components/lead-management/all-Item/popups/ItemMenu";
// import UploadBulkPopup from "../../components/lead-management/all-lead/popups/UploadBulkPopup";
// import FilterItem from "../../components/lead-management/all-Item/popups/FilterItem";
// import ItemTable from "../../components/lead-management/all-Item/ItemTable";
// import Popup from "../../components/shared/popups/Popup";
// import CommonPopup from "../../components/shared/popups/CommonPopup";
import { useDispatch, useSelector } from "react-redux";
import Button from "../reusable/Button";
import ItemTable from "./AdminTable";
// import { ItemBulkActions } from "../../redux/actions/pages/items";
// import { selectPageination } from "../../redux/reducers/pages/items/itemsReducer";

const Items = () => {
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState(false);
  const [importPop, setImportPop] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [alertType, setAlertType] = useState(null);
//   const { page, rowsPerPage } = selectPageination();

  useEffect(() => {

    console.log(selectedRow)
  }, [selectedRow])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-new-item");
  };

  const handleSetActive = (button) => {
    setActive(button);
    // setactivePop(true);
    console.log(active, "Active this")
    // handleActive();
  };

  const handleSelectedRow = (rows) => {
    setSelectedRow(rows);
    console.log("Selected Row", rows);
    // console.log("selectedRow.length", selectedRow.length);
  };

  const dispatch = useDispatch(); // ✅ Call useDispatch() at the top level

  

  const store = useSelector((state) => state.itemReducer);
  // console.log(store.ItemListData.data.content[0].itemName,"storevvvv");
  // console.log(store?.ItemListData?.data?.content?.[0]?.itemName, "storevvvv");

  const itemName = (store?.ItemListData?.data?.content?.[0]?.itemName);

const handleItems=()=>{
  navigate("/products")
}
  const handleConfirm = async () => {
    if (alertType) {
      console.log("alertType", alertType);
      console.log(selectedRow);
      try {
        const response = await dispatch(ItemBulkActions(selectedRow, alertType.toUpperCase(), { page: 0, rowsPerPage: 15 }));
        console.log("Response activate", response);
      } catch (error) {
        console.log(error);
      }
    }
    setAlertType(null);
  }

  return (
    <>
      <div className="w-full relative  bg-[#FFFFFF] rounded-[20px] pb-4    ">
        <div className="w-full flex flex-wrap justify-start lg:justify-center items-center">
          <div className="p-4 w-full flex flex-wrap items-center justify-between gap-3">

            {/* Title */}
            <h1 className="font-nunito-bold text-[22px] md:text-[24px] lg:text-[28px] text-[#0A1629] w-full md:w-auto">Product List
            </h1>

            {/* Search & Filter */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="flex items-center w-full md:w-auto bg-[#E6EDF5] p-2 rounded-3xl shadow-sm">
                <FiSearch className="text-[#000000] text-2xl ml-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="flex-1 bg-transparent text-[#91929E] font-poppins-medium text-sm md:text-base outline-none px-3 w-full md:w-[25vw]"
                />
              </div>
              <CiFilter
                size={24}
                onClick={() => setFilter(true)}
                strokeWidth={2}
                className="text-[#000000] cursor-pointer font-bold"
              />
            </div>

            {/* Buttons */}
            <div className="w-full md:w-auto flex justify-end items-center gap-3">
              <Button
                text={"Products"}
                onClick={handleItems}
                variant={"primary"}
                propClass={"w-[150px] flex justify-center items-center"}
                textPos={"items-center"}
              />

              <Button
                text={"New Product"}
                onClick={handleClick}
                variant={"primary"}
                propClass={" flex justify-center items-center"}
                textPos={"items-center"}
              />
            </div>

          </div>
        </div>

        {/* <TableComponent /> */}
        <ItemTable
          // onSelectedRowsChange={handleSelectedRow}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          searchQuery={searchQuery}
        />
    


        {alertType && (
          <Popup
            propsClass={"ml-[13%]"}
            isOpen={true}
            onClose={() => setAlertType(null)}
          >
            <CommonPopup
              header={alertType + " Item"}
              subHeader={"Are you sure you want to " + alertType.toLowerCase() + " item?"}
              BtnOne={"Cancel"}
              BtnTwo={"Yes"}
              onCancel={() => setAlertType(null)}
              onConfirm={handleConfirm}
            />
          </Popup>
        )}

        {importPop && (
          <Popup
            propsClass={" "}
            isOpen={importPop}
            onClose={() => setImportPop(false)}
          >
            <UploadBulkPopup
              heading={"Uploads Bulk Item"}
              setImportPop={setImportPop}
            />

            {/* <SendQuote onClose={() => setShowAlert(false)} /> */}
          </Popup>
        )}
      </div>
      {filter && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-15 z-30"
            onClick={() => setFilter(false)} // Close filter on clicking outside
          />
          {/* Filter Item */}
          <div className="fixed top-20 right-4 z-50  bg-white shadow-lg rounded-md ">
            <FilterItem setFilter={setFilter} />
          </div>
        </>
      )}

      {/* <ItemMenu/> */}
    </>
  );
};

export default Items;
