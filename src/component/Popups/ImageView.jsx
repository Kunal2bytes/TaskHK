const ImageView = ({ selectedRow }) => {
  console.log(selectedRow);

  const ProductImage=selectedRow.image
console.log(ProductImage);
  return (
    <>
      <div className="p-4">
        {/* {selectedRow} */}

        <img src={ProductImage} alt="loading" className="w-[36vw] h-[40vh]" />
      </div>
    </>
  );
};
export default ImageView;
