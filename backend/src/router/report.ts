import express from 'express'
import { getTopDonorByBarangay } from '../controllers/Admin/Reports/getTopPerBarangay/getTopDonor'
import { tokenVerification } from '../middleware/Authentication'
import { getTopRequestorByBarangay } from '../controllers/Admin/Reports/getTopPerBarangay/getTopRequesto.r'

export default (router: express.Router) => {
    // router.get('kalinga/getTopDonorByBarangay/:barangay', tokenVerification, getTopDonorByBarangay)
    // router.get('kalinga/getTopRequestorByBarangay/:barangay', tokenVerification, getTopRequestorByBarangay)
    router.get('/kalinga/getTopDonorByBarangay/:barangay', getTopDonorByBarangay)
    router.get('/kalinga/getTopRequestorByBarangay/:barangay', getTopRequestorByBarangay)
}