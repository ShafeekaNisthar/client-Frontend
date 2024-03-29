'use client'
import Dropdown from '../filters/dropdown'
import RangeInput from '../filters/rangeInput'
import CheckBoxFilter from '../filters/checkbox'
import { useState, useEffect } from 'react'
import './ParentC.css'
import { VisualMount, CreateFilters, GetMetaData } from 'cerulean-bi-react'
import getUniqueValues from '../filters/UniqueValues'

interface DefineFilterProps {
  filtername: string;
  table: string;
  column: string;
  operator: string;
  values: any;
}

interface CompoundFilter {
  compound_operator: string;
  filters: (string | CompoundFilter)[];
}

interface FilterObject {
  filters: { [key: string]: any };
  compound?: CompoundFilter ;
}

//get MetaData info
const metadata = GetMetaData()
console.log("MetaData information:", metadata)

const ParentComponent = () => {
  const initialDropdown = "ALL" 
  const initialRange = [ -800001, 250000 ];
  const [selectedregion, setSelectedRegion] = useState<string[]>([]);
  const [selectedProductCategory, setselectedProductCategory] = useState(initialDropdown);
  const [Range, setRange] = useState(initialRange)
  const [lists, setlists] = useState({region:[],product_field:[]})
  
  const [backendfilters, setbackendfilters] = useState<FilterObject | {}>({})
  const [frontendfilters, setfrontendfilters] = useState<any>({})

  // getting unique values
  useEffect(() => {
    async function fetchData() {
        const regions = await getUniqueValues("v10500", "region");
        const products = await getUniqueValues("v10500", "product_field");
        const productslist:any = ["ALL", ...products]

        setlists({
          region: regions,
          product_field:productslist
        });
    }

      fetchData();
  }, []);


  const handleBEFilterChange = () => {

   const BEfilterDefinitions:DefineFilterProps[] = [
          {
                filtername: "filter2",
                table: "v10500",
                column: "product_field",
                operator: "In",
                values: [selectedProductCategory],
          },
          {
              filtername: "filter1",
              table: "v10500",
              column: "region",
              operator: "In",
              values: selectedregion.length === 0 ? ["ALL"] : selectedregion,
          },
          {
              filtername: "filter3",
              table: "v10500",
              column: "transaction_amount",
              operator: "LessThan",
              values: Range[1],
          },
          {
              filtername: "filter4",
              table: "v10500",
              column: "transaction_amount",
              operator: "GreaterThan",
              values: Range[0],
          },
    ];

    // const compoundFilter = {
    //   compound_operator: "and",
    //   filters: ["filter2", "filter3"]
    // };

    const BEFilters = CreateFilters(BEfilterDefinitions)
    
    // console.log("BEfilters:",BEFilters)
  
    setbackendfilters(BEFilters);
  };

  // const EditSpec={}
  // const EditSpec1={"color":"region", "y_title":"Count of Sales"}

  useEffect(() => {  
    handleBEFilterChange()
  }, [selectedregion,Range,selectedProductCategory]) 


  return (
    <div>
        <h1 className='heading'>Sales Dashboard</h1>
        <div className='filters'>
          <Dropdown
                label='Product Category'
                options={["ALL","Beverages","Clothes","Food","Grocery","Homeware","Toy"]}
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
          {lists.region ? (
            <CheckBoxFilter
                label='Regions'
                options={lists.region}
                selectedValues={selectedregion}
                onChange={(values:string[]) => {
                    setSelectedRegion(values)
                }}
              />
              ) : (
                  <p>Loading...</p>
              )}
        </div>
       <div className='visualBody'>
        <div className='visual'>
          <h1>Number of Sales per Region</h1>
          <VisualMount ChartID='15' Backendfilters = {backendfilters}  EditSpec={{"y_title":"Count of Sales"}}/> {/* Frontendfilters={frontendfilters} */}
        </div>
        {/* <div className='visual'>
          <h1>Proportion of Sales per Product Category</h1>
          <VisualMount ChartID='23' Backendfilters = {backendfilters}/>
        </div>
        <div className='visual' style={{width:'300px'}}>
          <h1>Average Sales per Day of Week</h1>
          <VisualMount ChartID='19' Backendfilters = {backendfilters} EditSpec={{"y_title":"Average Transaction Amount", "x_title":"Day of Week"}}/>
        </div>
        <div className='visual'>
          <h1>Average Sales per Year</h1>
          <VisualMount ChartID='21' Backendfilters = {backendfilters} EditSpec={{"y_title":"Average Transaction Amount", "x_title":"Year"}}/>
        </div> */}
        </div> 
    </div>
  )
}

export default ParentComponent