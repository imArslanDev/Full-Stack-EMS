import { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, Search } from "lucide-react";
import { EmployeeCard, Loading } from "../components";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setSelectDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModel, setShowCreateModel] = useState(false);

  const fetchEmployees = useCallback(async (params) => {
    setLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectDept ? emp.department === selectDept : emp,
      ),
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Search Filter
  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLocaleLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 size-4" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10!"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={selectDept}
          onChange={(e) => setSelectDept(e.target.value)}
          className="max-w-40"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.length === 0 ? (
            <p>No Employee Found</p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Employees;