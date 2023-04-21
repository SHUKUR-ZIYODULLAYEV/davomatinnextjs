
import SEO from '@/layout/seo/seo'
import Layout from '@/layout/layout'
import { AppDispatch, RootState } from "@/store/store";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTableList, getFaculties, getTableList } from '@/slices/tablesSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {allTableList, tableList, faculties} = useSelector((state: RootState) => state.tables)
  // console.log("allTableList:", allTableList);
  // console.log("tableList:", tableList);
  console.log("faculties:", faculties);
  const GetAllTableList = () => {
    dispatch(
      getAllTableList({
        start: "2023-04-18",
        end: "2023-04-18"
      })
    );
    dispatch(
      getTableList({
        start: "2023-04-18",
        end: "2023-04-18"
      })
    );
    dispatch(
      getFaculties()
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
