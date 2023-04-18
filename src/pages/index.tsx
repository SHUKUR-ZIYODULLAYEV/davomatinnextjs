
import SEO from '@/layout/seo/seo'
import Layout from '@/layout/layout'
import { AppDispatch, RootState } from "@/store/store";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTableList } from '@/slices/tablesSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {allTableList} = useSelector((state: RootState) => state.tables)
  console.log("allTableList:", allTableList);
  const GetAllTableList = () => {
    dispatch(
      getAllTableList({
        start: "2023-04-18",
        end: "2023-04-18"
      })
    );
  }
  return (
    <SEO metaTitle='Davomat TSUE'>
      <Layout>
        <button onClick={() => GetAllTableList()} >Click</button>
      </Layout>
    </SEO>
  )
}
