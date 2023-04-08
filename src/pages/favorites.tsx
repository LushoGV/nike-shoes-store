import {useState, useEffect} from 'react'
import { useUserContext } from '@/context/useUserContext'
import { getAllProducts } from '@/utils/dataFunctions'
import { product } from '.'

import PageHeader from '@/components/PageHeader'
import Grid from '@/components/product/Grid'
import Layout from '@/layout/Layout'

type Props = {}

const Favorites = (props: Props) => {
  const [favoritesArr, setFavoritesArr] = useState<product[]>([])
  const {favorites} = useUserContext()
  
  const getData = async () => {
    const data = await getAllProducts()
    setFavoritesArr(favorites.map((element) => data.filter(item => item.id.toString() == element)[0]))
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <Layout title={"Favorites"}>
        <PageHeader text='Favorites' />
        <Grid content={favoritesArr} />
    </Layout>
  )
}

export default Favorites