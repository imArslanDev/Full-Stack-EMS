import { useCallback, useEffect } from "react";
import { useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import { GeneratePayslipForm, Loading, PayslipList } from "../components";

const Payslips = () => {
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;

  const fetchPaySlips = useCallback(async () => {
    setPaySlips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPaySlips();
  }, [fetchPaySlips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);

  if(loading) return <Loading/>
  return <div className="animate-fade-in">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="page-title">Payslips</h1>
        <p className="page-subtitle">{isAdmin ? "Generate and manage employees payslips" : "Your payslip history"}</p>
      </div>
      {isAdmin &&  <GeneratePayslipForm employees={employees} onSuccess={fetchPaySlips}/>}
    </div>
    <PayslipList isAdmin={isAdmin} payslips={paySlips} />

  </div>;
};

export default Payslips;
