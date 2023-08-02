import React from 'react'

export default function Connecting () {
  return (
    <svg
      className='connecting'
      version='1.1'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'>
      <circle stroke='none' cx='30' cy='47' r='6'>
        <animate
          attributeName='opacity'
          dur='1s'
          values='0;1;0'
          repeatCount='indefinite'
          begin='0.1'
        />
      </circle>
      <circle stroke='none' cx='50' cy='47' r='6'>
        <animate
          attributeName='opacity'
            dur='1s'
            values='0;1;0'
            repeatCount='indefinite'
            begin='0.2'
          />
      </circle>
      <circle stroke='none' cx='70' cy='47' r='6'>
        <animate
          attributeName='opacity'
          dur='1s'
          values='0;1;0'
          repeatCount='indefinite'
          begin='0.3'
        />
      </circle>
    </svg>
  )
}
