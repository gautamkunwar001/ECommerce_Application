import React from 'react'
import Layout from '../components/layout/Layout';

function Pagenotfound() {
  return (
    <div>
      <Layout title ={"Page not found"}>
        
        <div className='pnf'>
          <h1 className="pnf-title">404</h1>
          <h2 className='pnf-heading'> Oops ! Page not Found</h2>
          <a href="/" className='pnf-btn'>
          Go back</a>
        </div>
      </Layout>
    </div>
  )
}

export default Pagenotfound;
