"use client"
import { SellerApplicationAction } from '@/app/actions/SellerApplicationAction'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'


const SellerApplicationForm = () => {
    const router=useRouter()
  const initialState={
    errors:{},
    success:false,
    error:null,
    input:{},
  }


  const [state,formAction]=useActionState(SellerApplicationAction,initialState)
    useEffect(()=>{
     if(state.success){
        router.push('/user/profile')
     }
  },[state?.success])
 
  return (
    <form className='bg-white p-5 flex flex-col gap-2 rounded-lg shadow-xl ' action={formAction}>
        <h2 className='text-3xl font-extrabold text-center mb-3'>Application Form</h2>
   
   <div className='flex md:flex-row md:justify-between gap-4 flex-col'>
    <div className='flex flex-col gap-2 md:w-[50%]'>
        <label htmlFor="storeName" className='form-label'>store name</label>
    <input type="text" className='form-input' name='storeName' defaultValue={state?.input?.storeName||''}/>
    {state?.errors?.storeName&&(
        <p className='text-red-600'>{state?.errors.storeName}</p>
    )}

     <label htmlFor="email" className='form-label'>store email</label>
    <input type="text" className='form-input'  name='email'  defaultValue={state?.input?.email||''}/>
    {state?.errors?.email&&(
          <p className='text-red-600'>{state?.errors.email}</p>
    )}

      <label htmlFor="phone" className='form-label'>store phone</label>
    <input type="number" className='form-input'  name='phone' defaultValue={state?.input?.phone||''}/>
      {state?.errors?.phone&&(
          <p className='text-red-600'>{state?.errors.phone}</p>
    )}

         <label htmlFor="gstNumber" className='form-label'>store gstNumber</label>
    <input type="text" className='form-input'  name='gstNumber' defaultValue={state?.input?.gstNumber||''}/>
      {state?.errors?.gstNumber&&(
          <p className='text-red-600'>{state?.errors.gstNumber}</p>
    )}

    <label htmlFor="accountNumber" className='form-label'>store bank account</label>
       <input type="text" name='accountNumber'  className='form-input' defaultValue={state?.input?.accountNumber||''}/>
         {state?.errors?.accountNumber&&(
          <p className='text-red-600'>{state?.errors.accountNumber}</p>
    )}
    </div>


    <div className='flex flex-col gap-2 md:w-[50%]'>
        <label htmlFor="street" className='form-label'>store street</label>
    <input type="text" className='form-input'  name='street' defaultValue={state?.input?.street||''}/>
      {state?.errors?.street&&(
          <p className='text-red-600'>{state?.errors.street}</p>
    )}

     <label htmlFor="city" className='form-label'>store city</label>
    <input type="text" className='form-input'  name='city' defaultValue={state?.input?.city||''}/>
      {state?.errors?.city&&(
          <p className='text-red-600'>{state?.errors.city}</p>
    )}

     <label htmlFor="state" className='form-label'>store state</label>
    <input type="text" className='form-input'  name='state' defaultValue={state?.input?.state||''}/>
      {state?.errors?.state&&(
          <p className='text-red-600'>{state?.errors.state}</p>
    )}

    
     <label htmlFor="zipcode" className='form-label'>store zipcode</label>
    <input type="text" className='form-input'  name='zipcode' defaultValue={state?.input?.zipcode||''}/>
      {state?.errors?.zipcode&&(
          <p className='text-red-600'>{state?.errors.zipcode}</p>
    )}

            <label htmlFor="ifsc" className='form-label'>store ifsc code</label>  
       <input type="text" name='ifsc'  className='form-input' defaultValue={state?.input?.ifsc||''}/>
         {state?.errors?.ifsc&&(
          <p className='text-red-600'>{state?.errors.ifsc}</p>
    )}
    </div>


   </div>
   <div className='flex flex-col'>
             <label htmlFor="country" className='form-label'>store country</label>
    <input type="text" className='form-input'  name='country'  defaultValue={state?.input?.country||''}/>
      {state?.errors?.country&&(
          <p className='text-red-600'>{state?.errors.country}</p>
    )}
   </div>

   <input type='submit' className='btn-primary' defaultValue={'submit'}/>
    
    </form>

     
  )
}

export default SellerApplicationForm
