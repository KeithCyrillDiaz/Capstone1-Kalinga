import React, {useState, useEffect} from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; 
import './toggle.css'

export const RenderRequestorCheckBoxField = ({data, handleChange, editable, openAddModal, maintenanceStatus}) => {
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
                                <div
                                className='flex flex-direction gap-7 items-center'
                                >
                                    <div className=" border-b border-primary-default mt-7 w-[17rem] 2xl:w-[20rem]">
                                    <label className=" text-lg text-primary-default font-bold font-sans my-4 mb-4
                                        2xl:text-2xl">Amount of Milk Options</label>
                                    <select
                                        className="bg-white text-primary-default text-xs py-1 px-5 pr-10 rounded-sm hover:cursor-pointer w-full"
                                        >
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
                                            className="px-4 py-2 mr-4 bg-pink-500 text-xs text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={openAddModal}
                                            >
                                                Edit Amount
                                        </button>
                                    )}
                                </div>
                        )
                    }
            })}
      
        </>
    )
}

export const RenderDonorCheckBoxField = ({data, handleChange, editable, openAddModal, maintenanceStatus}) => {
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
                    } 
            })}
      
        </>
    )
}