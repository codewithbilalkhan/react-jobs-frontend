import React from 'react'
import { ClipLoader } from 'react-spinners'
const override = {
display : 'block',
margin: "10px auto"

}
const Spinner = ({loading}) => {
  return (
  <ClipLoader color="#2563EB" loading={loading} size={150} cssOverride = {override} aria-label="Loading Spinner" data-testid="loader" />
  )
}

export default Spinner
