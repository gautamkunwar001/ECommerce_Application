import React , { useState,useEffect } from 'react';
import useCategory from '../hooks/useCategory';
import Layout from '../components/layout/Layout'
function Categories() {
    const categories = useCategory();
  return (
   <Layout title={'All Categories'}>
    <div className="container">
        <div className="row">
            {categories.map((c) => (
                <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                     <a href={`/category/${c.slug}`} className="btn btn-primary">{c.name}</a>
                    
                </div>
            ))}
        </div>
    </div>
    </Layout>
  )
}

export default Categories
