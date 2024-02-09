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
  
  const [filters, setFilters] = useState<any>({
    region: initialDropdown,
    product_field: initialDropdown,
    transaction_amount: initialRange,
  })

  const handleFilterChange = () => {
    console.log(Range)
    const newFilters = {
      region: selectedregion,
      product_field: selectedProductCategory,
      transaction_amount: Range,
    };
    setFilters(newFilters);
  };

  useEffect(() => {  
    handleFilterChange()
  }, [selectedregion,selectedProductCategory, Range])  //add Range filter here if necessary


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
          <VisualMount ChartID='24' filters={filters}/>
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