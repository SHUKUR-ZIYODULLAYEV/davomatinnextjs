
import SEO from '@/layout/seo/seo'
import Layout from '@/layout/layout'
import { AppDispatch, RootState } from "@/store/store";
import { useSelector, useDispatch } from 'react-redux';
import { GetDeputyDean, GetRooms, GetTutors, getAllTableList, getFaculties, getGroups, getTableList } from '@/slices/tablesSlice';
import { GetHemisDepartment, GetHemisFaculties } from '@/slices/hemisSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {allTableList, tableList, faculties, groups, rooms, tutors, deputies} = useSelector((state: RootState) => state.tables)
  const {hemisFaculties, hemisDepartments} = useSelector((state: RootState) => state.hemis)
  // console.log("allTableList:", allTableList);
  // console.log("tableList:", tableList);
  // console.log("faculties:", faculties);
  // console.log("groups:", groups);
  // console.log("rooms:", rooms);
  // console.log("tutors:", tutors);
  // console.log("deputies:", deputies);
  // console.log("deputies:", deputies);
  // console.log("hemisFaculties:", hemisFaculties);
  console.log("hemisDepartments:", hemisDepartments);
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
    dispatch(
      getGroups({
        faculty_id: 2,
      })
    );
    dispatch(
      GetRooms({
        building: "1-bino",
        room_type: "Seminar",
        floor: "1-qavat"
      })
    );
    dispatch(
      GetTutors()
    );
    dispatch(
      GetDeputyDean()
    );
    dispatch(
      GetHemisFaculties()
    );
    dispatch(
      GetHemisDepartment({
        faculty_id: 1
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
