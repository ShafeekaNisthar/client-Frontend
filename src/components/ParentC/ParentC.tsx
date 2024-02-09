'use client'
import Dropdown from '../filters/dropdown'
import RangeInput from '../filters/rangeInput'
import { useState, useEffect } from 'react'
import './ParentC.css'
import { VisualMount } from 'cerulean-bi-react'




const ParentComponent = () => {
  const initialDropdown = "All"; 
  const initialRange = [ 0, 250000 ];
  const [selectedregion, setSelectedRegion] = useState(initialDropdown);
  const [selectedProductCategory, setselectedProductCategory] = useState(initialDropdown);
  const [Range, setRange] = useState(initialRange)
  
  const [backendfilters, setbackendfilters] = useState<any>({
    product_field: initialDropdown
  })

  const [frontendfilters, setfrontendfilters] = useState<any>({
    region: initialDropdown,
    transaction_amount: initialRange,
  })

  const handleBEFilterChange = () => {
    console.log("inside BE filter change")
    const BEFilters = {
      product_field: selectedProductCategory,
    };
    setbackendfilters(BEFilters);
  };

  const handleFEFilterChange = () => {
    console.log("inside FE filter change")
    const FEFilters = {
      region: selectedregion,
      transaction_amount: Range,
    };
    setfrontendfilters(FEFilters);
  };

  useEffect(() => {  
    handleBEFilterChange()
  }, [selectedProductCategory])  //add Range filter here if necessary
  useEffect(() => {  
    handleFEFilterChange()
  }, [selectedregion, Range])  //add Range filter here if necessary


  return (
    <div>
        <h1 className='heading'>Sales Dashboard</h1>
        <div className='filters'>
          <Dropdown
                label='Regions '
                options={["All","Asia","Americas","Oceania","Africa","Europe"]}
                value={selectedregion}
                onChange={(value:string)=> {
                  setSelectedRegion(value);
                }}
          />
          <Dropdown
                label='Product Category'
                options={["All","Beverages","Clothes","Food","Grocery","Homeware","Toy"]}
                value={selectedProductCategory}
                onChange={(value:string)=> {
                  setselectedProductCategory(value);
                }}
          />
          <RangeInput
                label='Transaction Amount'
                value={Range}
                onChange={setRange}
          />
        </div>
       <div className='visualBody'>
         <div className='visual'>
          <h1>Average sales by year</h1>
          <VisualMount ChartID='23' FEfilters = {frontendfilters} BEfilters = {backendfilters}/>
         </div>

        {/* <div className='visual'>
          <h1>Number of Sales per Region</h1>
          <VisualMount ChartID='15' filters={filters}/></div> */}
        {/* <div className='visual'>
          <h1>Proportion of Sales per Product Category</h1>
          <VisualMount ChartID='23' filters={filters}/></div>
        <div className='visual' style={{width:'300px'}}>
          <h1>Average Sales per Day of Week</h1>
          <VisualMount ChartID='19' filters={filters}/></div> */}
        {/* <div className='visual'>
          <h1>Average Sales per Year</h1>
              <VisualMount ChartID='21' filters={filters}/></div> */}
        </div> 
    </div>
  )
}

export default ParentComponent