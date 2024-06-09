import React, {useState, useEffect} from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; 
import './toggle.css'

export const RenderRequestorCheckBoxField = ({data, handleChange, editable, openAddModal, openAddCategory, openAddMethod, maintenanceStatus}) => {
    if(data)
    return (
        <>
            {Object.entries(data).map(([fieldName, fieldConfig]) => {
            // console.log("fieldName: ", fieldName)
            // console.log("fieldConfig: ", fieldConfig)
                if( (
                    fieldName === "fullName"||
                    fieldName === "phoneNumber"||
                    fieldName === "emailAddress"||
                    fieldName === "homeAddress"||
                    fieldName === "ReasonForRequesting"||
                    fieldName === "childBirthDate"||
                    fieldName === "milkAmount")) {
                        return(
                            <div 
                            className='flex flex-row gap-12 mb-2 '>
                                <div className='relative'>
                                 <Toggle
                                    disabled={editable === false}
                                    checked={fieldConfig}
                                    onChange={() => handleChange(fieldName, !fieldConfig)}
                                    icons={false}
                                    color="#E60965"
                                    size={10}
                                    className='absolute custom-toggle'
                                />
                                </div>
                                <div
                                className='font-sans text-sm mt-0 2xl:text-md'
                                > {data.placeholder[fieldName] + " Field"}</div>
                            </div>
                        )
                    } else if (fieldName === "infantInformation" && fieldConfig === true){
                        return (
                            <h2
                                className="
                                text-xl text-primary-default font-bold font-sans my-4 mb-4
                                2xl:text-2xl
                                "
                                > Infant Information 
                            </h2>
                        )
                    } else if (fieldName === "options") {
                        const sortedMilkAmount = data.options.milkAmount
                          .map(item => parseInt(item))
                          .sort((a, b) => a - b) // Sort numerically
                          .map(item => item + 'ml');
            
                        return (
                            <div key={fieldName} className='flex flex-col gap-7'>
                                <div className='flex flex-row gap-7 items-center'> 
                                    <div className="border-b border-primary-default mt-7 w-[17rem] 2xl:w-[23rem]">
                                        <label className="text-lg text-primary-default font-bold font-sans my-4 mb-4 2xl:text-2xl">
                                            Amount of Milk Options
                                        </label>
                                        <select className="bg-white text-primary-default text-xs py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full">
                                            <option value="">Milk Amount Options</option>
                                            {sortedMilkAmount.map((amount, index) => (
                                            <option key={index} value={amount}>
                                                {amount}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    {editable === true && (
                                    <button
                                        className="px-4 py-2 mr-4 w-[7rem] h-8 mt-12 bg-pink-500 text-xs text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={openAddModal}
                                    >
                                        Edit Amount
                                    </button>
                                    )}
                                </div>
                           
                                {/* Baby Category Options */}
                                <div className='flex flex-row gap-7 items-center'>
                                    <div className="border-b border-primary-default mt-7 w-[17rem] 2xl:w-[23rem]">
                                        <label className="text-lg text-primary-default font-bold font-sans my-4 mb-4 2xl:text-2xl">
                                            Baby Category Options
                                        </label>
                                        <select className="bg-white text-primary-default text-xs py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full">
                                            <option value="">Select Baby Category</option>
                                            {data.options.BabyCategory.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    {editable === true && (
                                        <button
                                            className="px-4 py-2 mr-4 w-[7rem] h-8 mt-12 bg-pink-500 text-xs text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={openAddCategory}
                                        >
                                            Edit Categories
                                        </button>
                                    )}
                                </div>
                                {/* Methods of Obtaining */}
                                <div className='flex flex-row gap-7 items-center'>
                                    <div className="border-b border-primary-default mt-7 w-[17rem] 2xl:w-[23rem]">
                                        <label className="text-lg text-primary-default font-bold font-sans my-4 mb-4 2xl:text-2xl">
                                            Methods of Obtaining Options
                                        </label>
                                        <select className="bg-white text-primary-default text-xs py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full">
                                            <option value="">Select Method of Obtaining</option>
                                            {data.options.method.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    {editable === true && (
                                        <button
                                            className="px-4 py-2 mr-4 w-[7rem] h-8 mt-12 bg-pink-500 text-xs text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={openAddMethod}
                                        >
                                            Edit Methods
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                        );
                      }
            
            })}
      
        </>
    )
}

export const RenderDonorCheckBoxField = ({data, handleChange, editable, openAddMethod}) => {
    if(data)
    return (
        <>
            {Object.entries(data).map(([fieldName, fieldConfig]) => {
            // console.log("fieldName: ", fieldName)
            // console.log("fieldConfig: ", fieldConfig)
                if( (
                    fieldName === "fullName"||
                    fieldName === "phoneNumber"||
                    fieldName === "emailAddress"||
                    fieldName === "homeAddress"||
                    fieldName === "milkAmount")) {
                        return(
                            <div 
                            className='flex flex-row gap-12 mb-2 '>
                                <div className='relative'>
                                 <Toggle
                                    disabled={editable === false}
                                    checked={fieldConfig}
                                    onChange={() => handleChange(fieldName, !fieldConfig)}
                                    icons={false}
                                    color="#E60965"
                                    size={10}
                                    className='absolute custom-toggle'
                                />
                                </div>
                                <div
                                className='font-sans text-sm mt-0 2xl:text-md'
                                > {data.placeholder[fieldName] + " Field"}</div>
                            </div>
                        )
                    } else if (fieldName === "options") {
                        return (
                          <>
                                {/* Method Options */}
                                <div className='flex flex-row gap-7 items-center'>
                                    <div className="border-b border-primary-default mt-7 w-[17rem] 2xl:w-[20rem]">
                                        <label className="text-lg text-primary-default font-bold font-sans my-4 mb-4 2xl:text-2xl">
                                            Delivery Method Options
                                        </label>
                                        <select className="bg-white text-primary-default text-xs py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full">
                                            <option value="">Select Delivery Method</option>
                                            {data.options.method.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    {editable === true && (
                                        <button
                                            className="px-4 py-2 mr-4 w-[7rem] h-8 mt-12 bg-pink-500 text-xs text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={openAddMethod}
                                        >
                                            Edit Methods
                                        </button>
                                    )}
                                </div>
                          </>
                          
                        );
                      }
            })}
      
        </>
    )
}