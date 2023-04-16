import { Login } from '@/components'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import React from 'react'

function LoginPage() {
  return (
    <SEO metaTitle='Davomat TSUE login page'>
        <Login/>
    </SEO>
  )
}

export default LoginPage