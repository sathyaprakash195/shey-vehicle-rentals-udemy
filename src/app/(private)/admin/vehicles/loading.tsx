import Spinner from '@/components/spinner'
import React from 'react'

function Loading() {
  return (
    <div className='flex justify-center mt-40 items-center'>
        <Spinner />
    </div>
  )
}

export default Loading