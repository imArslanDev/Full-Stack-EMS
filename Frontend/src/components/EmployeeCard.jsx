
const EmployeeCard = ({employee, onDelete, onEdit}) => {
  return (
    <div className="group relative card card-hover overflow-hidden">

      <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-slate-100 to-slate-50">
        <div className="w-full h-full flex items-center justify-center">
        {/* Circle Icon */}
          <div className="size-20 rounded-full bg-linear-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-indigo-400">{employee.firstName[0]} {employee.lastName[0]}</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-3 left-3 flex gap-2">
        <span>{employee.department || "Remote"}</span>
        {employee.isDeleted && <span className="bg-red-500/60 font-medium text-white px-2.5 py-1 text-xs rounded">DELETED</span>}
      </div>

      <div className="p-5">
        <h3 className="text-slate-900">{employee.firstName} {employee.lastName}</h3>
        <p className="text-xs text-slate-500">{employee.position}</p>
      </div>
    </div>
  )
}

export default EmployeeCard