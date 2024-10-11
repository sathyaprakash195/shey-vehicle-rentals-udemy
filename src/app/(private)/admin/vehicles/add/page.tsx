import PageTitle from '@/components/page-title'
import React from 'react'
import VehicleForm from '../_components/vehicle-form'

function AddVehiclePage() {
  return (
    <div>
      <PageTitle title="Add Vehicle" />
      <VehicleForm 
       type='add'
        vehicleData={null}
      />
    </div>
  )
}

export default AddVehiclePage