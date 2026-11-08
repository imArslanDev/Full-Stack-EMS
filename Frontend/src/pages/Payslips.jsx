import { useCallback, useEffect, useState } from "react";
import { GeneratePayslipForm, Loading, PayslipList } from "../components";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Payslips = () => {
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const fetchPaySlips = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get("/payslips");
      setPaySlips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchPaySlips();
    }
  }, [authLoading, fetchPaySlips, user]);

  useEffect(() => {
    if (!authLoading && isAdmin)
      api
        .get("/employees")
        .then((res) => setEmployees(res.data.filter((e) => !e.isDeleted)))
        .catch((error) =>
          toast.error(error.response?.data?.error || error.message),
        );
  }, [authLoading, isAdmin]);


  if (authLoading || loading) return <Loading />;
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employees payslips"
              : "Your payslip history"}
          </p>
        </div>
        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={fetchPaySlips}
          />
        )}
      </div>
      <PayslipList isAdmin={isAdmin} payslips={paySlips} />
    </div>
  );
};

export default Payslips;
