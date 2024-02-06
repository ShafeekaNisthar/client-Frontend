'use client'
import {VisualMount} from 'cerulean-bi-react'
import Dropdown from '../filters/dropdown'
import { useState, useEffect } from 'react'
import './ParentC.css'



const ParentComponent = () => {
  const initialDropdown = "All"; 
  const [selectedregion, setSelectedRegion] = useState(initialDropdown);
  const [selectedProductCategory, setselectedProductCategory] = useState(initialDropdown);
  const [filters, setFilters] = useState<any>({
    region: initialDropdown,
    product_field: initialDropdown,
    // transaction_amount: initialTransaction_amount,
  })

  const handleFilterChange = () => {
    const newFilters = {
      region: selectedregion,
      product_field: selectedProductCategory
      // transaction_amount: transaction_amount,
    };
    setFilters(newFilters);
  };

  useEffect(() => {  
    handleFilterChange()
  }, [selectedregion,selectedProductCategory])


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
                label='Product Category '
                options={["All","Beverages","Clothes","Food","Grocery","Homeware","Toy"]}
                value={selectedProductCategory}
                onChange={(value:string)=> {
                  setselectedProductCategory(value);
                }}
          />
        </div>
       <div className='visualBody'>
        <div className='visual'>
          <h1>Number of Sales per Region</h1>
          <VisualMount ChartID='15' filters={filters}/></div>
        <div className='visual'>
          <h1>Proportion of Sales per Product Category</h1>
          <VisualMount ChartID='23' filters={filters}/></div>
        <div className='visual' style={{width:'300px'}}>
          <h1>Average Sales per Day of Week</h1>
          <VisualMount ChartID='19' filters={filters}/></div>
        <div className='visual'>
          <h1>Average Sales per Year</h1>
              <VisualMount ChartID='21' filters={filters}/></div>
        </div> 
    </div>
  )
}

export default ParentComponent