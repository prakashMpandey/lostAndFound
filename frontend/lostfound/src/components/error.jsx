import React from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
  
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1 style={{ fontSize: '4rem',fontFamily:"sans-serif " }}>404</h1>
          <p style={{ fontSize: '1.5rem' }}>The page you are looking for does not exist.</p>
          <Link to="/" style={{ fontSize: '1rem', color: '#007BFF', textDecoration: 'underline' }}>
            Go back to Home
          </Link>
          </div>
  )
}

export default Error
