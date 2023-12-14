import { useEffect } from "react";
import { columns } from "./components/Column";
import { DataTable } from "./components/DataTable";
import { fetchLawyersAsync } from "./state/lawyer/lawyerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";

function App() {
  const lawyers = useSelector((state: RootState) => state.lawyer.lawyers);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLawyersAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-4xl font-bold">Lawyer firm</h1>
      <div className="p-4">
        <DataTable columns={columns} data={lawyers} />
      </div>
    </div>
  );
}

export default App;
