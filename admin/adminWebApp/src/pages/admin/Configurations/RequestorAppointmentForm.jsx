import React, { useState, useEffect } from 'react'
import { 
    IoIosCheckbox, 
    IoIosCheckboxOutline 
} from "react-icons/io";
import { getFormFormat, updateRequestorFormFormat } from '../../../api/Configurations/FormsFormat';
import { RenderRequestorCheckBoxField } from '../../../components/Configurations/RenderCheckBoxField';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; 
import '../../../components/Configurations/toggle.css'
import { getMaintenace, updateMaintenaceStatus } from '../../../api/Configurations/Maintenance';
import Modal from '../../../modal/Modal';
import { Loader } from '../../../components/loader';
import { AddBabyCategoryOption, AddMethodCategoryOption, AddMilkAmountOption } from '../../../modal/Configurations/AddNewOptions';
import { useNavigate } from 'react-router-dom';


const RequestorAppointmentForm = () => {

    const navigate = useNavigate()
    const [formFormatConfiguration, setFormFormatConfiguration] = useState({})
    const [loading, setLoading] = useState(false)
    const [maintenance, setMaintenace] = useState({})
  
    const [message, setMessage] = useState("")

    //Modal
    const [openModal, setOpenModal] = useState(false)
    const [openAddAmountModal, setOpenAddAmountModal] = useState(false)
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false)
    const [openAddMethodModal, setOpenAddMethodModal] = useState(false)
    const [saveDetailsModal, setSaveDetailsModal] = useState(false)
    

    const saveDetails = async () => {
        setSaveDetailsModal(false)
        setLoading(true)
        const result = await updateRequestorFormFormat({value: formFormatConfiguration})
        const { updateResult } = result.data
        console.log("updateResult: ", updateResult)
        await updateMaintenaceStatus({value: false})
        fetchFormatConfiguration()
        fetchMaintenance()
        setMaintenace(false)
        setLoading(false)
    }

    const handleChange = async (name, value, actionType, subName) => {
        if(name === "maintenanceStatus"){
            setOpenModal(false)
            setMaintenace({
                ...maintenance,
                [name]: value
            })
            await updateMaintenaceStatus({value: value})
            return
        }   
        if(name === "options"){
            if(actionType === "Add"){
                console.log("subName Add: ", subName)
                const isOptionExist = formFormatConfiguration.options[subName].includes(value);
                if(isOptionExist)return
                setFormFormatConfiguration({
                    ...formFormatConfiguration,
                    options: {
                        ...formFormatConfiguration.options,
                        [subName]: [
                            ...formFormatConfiguration.options[subName], 
                            value
                        ]
                    }
                })
                return
            } else {
                console.log("value: ", value)
                console.log("subName Remove: ", subName)
                const updated = formFormatConfiguration.options[subName].filter(item => item !== value);
                    setFormFormatConfiguration({
                        ...formFormatConfiguration,
                        options: {
                            ...formFormatConfiguration.options,
                            [subName]: updated
                        }
                    })
                return
            } 
           
        }

        setFormFormatConfiguration({
            ...formFormatConfiguration,
            [name]: value
        })
        return
    }

    const fetchMaintenance = async () => {
        setLoading(true)
        const result = await getMaintenace()
        setLoading(false)
        const { maintenance } = result
        setMaintenace(maintenance)
        console.log("maintenance: ",maintenance)
        return
    }

    const fetchFormatConfiguration = async () => {
        setLoading(true)
        const result = await getFormFormat()
        setLoading(false)
        const {donationAppointmentConfig, requestAppointmentConfig} = result
        setFormFormatConfiguration(requestAppointmentConfig)
        console.log("requestAppointmentConfig: ",requestAppointmentConfig)
        return
    }
    console.log("maintenance: ",maintenance)

    useEffect(() => {
        fetchFormatConfiguration()
        fetchMaintenance()
    },[])

    const handleAddCategory = () => {
        if (newCategory && !babyCategories.includes(newCategory)) {
          setBabyCategories([...babyCategories, newCategory]);
          setNewCategory('');
    
          // Optionally, send the new category to the server
          axios.post('/api/categories', { newCategory })
            .then(response => console.log('Category added:', response.data))
            .catch(error => console.error('Error adding category:', error));
        }
      };

    if(loading) {
        return (
            <Loader isLoading={loading}/>
        )
    }

    if(Object.keys(formFormatConfiguration).length !== 0 && Object.keys(maintenance).length !== 0)
    return (
        <section className="w-full h-full bg-primary-body overflow-hidden">
            <div className="p-8 pt-1">
                <h1 className="text-3xl text-primary-default font-bold font-sans my-4 mb-6">
                Requestor Appointment Form Configurations
                </h1>
                <h4
                className='text-sm'
                >Note: Toggle Maintenance first to edit</h4>
                <div
                className='flex flex-row items-center gap-2 mt-4'
                >   
                    <Toggle
                        checked={maintenance.maintenanceStatus}
                        onChange={() => {  
                            if (maintenance.maintenanceStatus === false) {
                                setMessage("Are you sure you want to activate maintenance mode for the Kalinga Mobile App?");
                                setOpenModal(true);
                            } else {
                                setMessage("Are you sure you want to deactivate maintenance mode for the Kalinga Mobile App?");
                                setOpenModal(true);
                            }
                        }}
                        // onChange={() => handleChange("maintenanceStatus", !maintenance.maintenanceStatus)}
                        icons={false}
                        color="#E60965"
                        size={10}
                        className='custom-toggle'
                    />
                    <div
                    className='font-sans text-sm mt-0 2xl:text-md'
                    > Maintenace Kalinga App</div>
                </div>
            
                    <h2 className="
                    text-xl text-primary-default font-bold font-sans my-4 mb-4
                    2xl:text-2xl
                    ">  
                        Personal Information
                    </h2>
                    {Object.keys(formFormatConfiguration).length !== 0 && (
                        <RenderRequestorCheckBoxField 
                        data={formFormatConfiguration} 
                        handleChange={handleChange} 
                        editable={maintenance.maintenanceStatus}
                        openAddModal={() => setOpenAddAmountModal(true)}
                        openAddCategory ={() => setOpenAddCategoryModal(true)}
                        openAddMethod = {() => setOpenAddMethodModal(true)}
                        />
                    )}
                   {maintenance.maintenanceStatus === true && (
                        <div className='flex flex-row items-center gap-2 ml-12'>
                            <button
                                className="mt-4 px-4 py-2 mr-4 bg-pink-500 text-xs text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => {
                                    setMessage("Are you sure you want to save these configurations and apply changes to the Kalinga Mobile App?");
                                    setSaveDetailsModal(true);
                                }}
                                >
                                    Save
                            </button>
                            <button
                                className="mt-4 px-4 py-2 mr-4 bg-white text-xs text-primary-default rounded-lg hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 ease-in-out"
                                onClick={() => {
                                    handleChange("maintenanceStatus", false)
                                    fetchFormatConfiguration()
                                }}
                            >
                                Cancel
                            </button>
                        </div>

                   )}
            </div>  
                    {saveDetailsModal && (
                            <Modal 
                            isOpen={saveDetailsModal}
                            message = {message}
                            onConfirm={() => saveDetails()}
                            onCancel={() => setSaveDetailsModal(false)}
                            />
                    )}
                    {openModal && (
                        <Modal 
                        isOpen={openModal}
                        message = {message}
                        onConfirm={() =>handleChange("maintenanceStatus", !maintenance.maintenanceStatus)}
                        onCancel={() => setOpenModal(false)}
                        />
                    )}
                    {openAddAmountModal && (
                        <AddMilkAmountOption
                        isOpen={true}
                        onConfirm={handleChange}
                        onCancel={() => setOpenAddAmountModal(false)}
                        />
                    )}
                    {openAddCategoryModal && (
                        <AddBabyCategoryOption
                        isOpen={true}
                        onConfirm={handleChange}
                        onCancel={() => setOpenAddCategoryModal(false)}
                        />
                    )}
                     {openAddMethodModal && (
                        <AddMethodCategoryOption
                        isOpen={true}
                        onConfirm={handleChange}
                        onCancel={() => setOpenAddMethodModal(false)}
                        />
                    )}
        </section>
    )
}

export default RequestorAppointmentForm