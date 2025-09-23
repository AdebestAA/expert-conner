"use client"
import React from 'react'



import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const LanguageDropDown = () => {
  return (
  <>


<div className='inline-block fixed bottom-[5%] left-[5%] z-50 '>

<Select 
onValueChange={(value)=>{
    console.log(value)
    document.cookie = `language=${value};`
    window.location.reload()
    
  }}
>
      <SelectTrigger 
      
      className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectLabel>Select Language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="de">German</SelectItem>
     
        </SelectGroup>
      </SelectContent>
    </Select>
</div>


  </>

   
  )
}

export default LanguageDropDown