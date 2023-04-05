import PageHeader from '@/components/PageHeader'
import Grid from '@/components/product/Grid'
import Layout from '@/layout/Layout'
import React from 'react'

type Props = {}

import data from '../data2.json'

const Favorites = (props: Props) => {
  return (
    <Layout title={"Favorites"}>
        <PageHeader text='Favorites' />

        <Grid content={data.products} />
    </Layout>
  )
}

export default Favorites