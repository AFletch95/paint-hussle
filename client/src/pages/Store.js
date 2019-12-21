import React, { useState } from "react";
import StoreCard from "../components/StoreCard";
import FilterDropdown from "../components/FilterDropdown"

const tempArray = Array(12).fill("");

function StorePage() {

  const [canvasName, setcanvasName] = useState("Canvas Name");
  const [canvasImage, setCanvasImage] = useState("./placeHolders/286x180.svg")
  const [canvasDescription, setCanvasDescription] = useState("This is the decription for the above canvas item.");
  const [canvasPrice, setCanvasPrice] = useState(999);
  const [canvasCreator, setCanvasCreator] = useState("Canvas Creator");
  const [canvasCreatorPage, setCanvasCreatorPage] = useState("/publicUserPage")


  return (
    <div className="container-fluid ">
      <div className="row">
        <FilterDropdown />
      </div>
      <div className="container mx-auto">

        <div className="row">

          {tempArray.map(
            () => <StoreCard
              canvasName={canvasName}
              canvasImage={canvasImage}
              canvasDescription={canvasDescription}
              canvasPrice={canvasPrice}
              canvasCreator={canvasCreator}
              canvasCreatorPage={canvasCreatorPage}
            />
          )}

        </div>
      </div>

    </div>
  )

}

export default StorePage;