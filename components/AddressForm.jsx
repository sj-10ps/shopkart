import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddressForm = ({setRefresh}) => {
    const initialstate={
       name:'',
       phone:'',
       landmark:'',
       area:'',
       city:'',
       district:'',
       state:'',
       country:'',
       zipcode:''
    }
    const [field,setField]=useState(initialstate)

    const setfieldvalue=(e)=>{
      const {name,value}=e.target
      setField(prev=>({
        ...prev,
        [name]:value
      }))
    }

    const handleSubmit=async(e)=>{
          e.preventDefault()
          const res=await fetch(`/api/user/address`,{method:"POST",body:JSON.stringify(field),
            headers:{
                'Content-Type':'application/json'
            }
          })
          const result=await res.json()
          toast(result.message)
          setField(initialstate)
          setRefresh(prev=>!prev)
     }
  return (
    <form className='bg-white p-3 flex flex-col shadow-xl w-full max-w-2xl mx-auto px-6 gap-2' onSubmit={handleSubmit}>
      <h2 className='text-2xl font-extrabold'>Upload Address</h2>
          <label htmlFor="" className='form-label'>name</label>
      <input type="text" className='form-input' name='name' value={field.name}  onChange={setfieldvalue}/>
          <label htmlFor="" className='form-label'>phone</label>
      <input type="text" className='form-input' name='phone' value={field.phone}  onChange={setfieldvalue}/>
          <label htmlFor="" className='form-label'>landmark</label>
      <input type="text" className='form-input' name='landmark' value={field.landmark}  onChange={setfieldvalue}/>
      <label htmlFor="" className='form-label'>area</label>
      <input type="text" className='form-input' name='area' value={field.area}  onChange={setfieldvalue}/>
      <label htmlFor="" className='form-label'>city</label>
      <input type="text" className='form-input' name='city' value={field.city} onChange={setfieldvalue}/>
      <label htmlFor="" className='form-label'>district</label>
      <input type="text" className='form-input' name='district' value={field.district} onChange={setfieldvalue}/>
      <label htmlFor="" className='form-label'>state</label>
      <input type="text" className='form-input' name='state' value={field.state} onChange={setfieldvalue}/>
      <label htmlFor="" className='form-label'>country</label>
      <input type="text" className='form-input' name='country' value={field.country} onChange={setfieldvalue}/>
      <label htmlFor="" className='form-label'>zipcode</label>
      <input type="text" className='form-input' name='zipcode' value={field.zipcode} onChange={setfieldvalue}/>
      <input type="submit"  value='submit' className='btn-primary'/>
    </form>
  )
}

export default AddressForm