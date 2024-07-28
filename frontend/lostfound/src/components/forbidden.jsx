import React from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
  
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1 style={{ fontSize: '4rem',fontFamily:"sans-serif " }}>403</h1>
          <p style={{ fontSize: '1.5rem' }}>You are not authorized to  access this page</p>
          <Link to="/" style={{ fontSize: '1rem', color: '#007BFF', textDecoration: 'underline' }}>
            Go back to Home
          </Link>
          </div>
  )
}

export default Error
