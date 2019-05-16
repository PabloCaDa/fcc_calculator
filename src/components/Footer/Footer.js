import React from 'react'

const footerStyle = {
    backgroundColor: '#397175',
    color: '#3D3641',
    padding: '10px 20px',
    textAlign: 'center',
    height:'10vh'
}

const Footer = () => {
  return (
    <div style={footerStyle}>
      <h4>Created by <i className="far fa-copyright"></i> Pablo Cabrera Darias</h4>
    </div>
  )
}

export default Footer
