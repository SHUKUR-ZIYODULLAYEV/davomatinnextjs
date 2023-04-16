import React from 'react'
import Head from 'next/head'
import { siteConfig } from '@/components/config/site.config'
import { SeoProps } from './seo.props'

function SEO({children, author = siteConfig.author, metaDescription = siteConfig.metaDescription, metaKeyword = siteConfig.metaKeyword, metaTitle}: SeoProps) {
  return (
    <>
        <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=5' />
            <title> {metaTitle} </title>
            <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
            <meta name="keywords" content={metaKeyword} />
            <meta name='author' content={author} />
            <meta name="description" content={metaDescription} />
            <link rel="icon" type="image/png" href="https://edu.tsue.uz/pluginfile.php/1/core_admin/logo/0x200/1646244461/blueCircleLogo.png" />
        </Head>
        {children}
    </>
  )
}

export default SEO