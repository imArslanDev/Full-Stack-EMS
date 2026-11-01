import {
  ArrowRightIcon,
  Building2,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active Workforce",
    },
    {
      icon: Building2,
      value: data.totalDepartments,
      label: "Departments",
      subtitle: "Organization units",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      subtitle: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
  ];
  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, Admin - here's your overview
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
          >
            <div>
              <div className="absolute top-0 left-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70" />
              <p className="text-sm font-medium text-slate-700">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </p>
            </div>
            <stat.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
