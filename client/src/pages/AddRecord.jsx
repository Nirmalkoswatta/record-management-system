import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import RecordForm from "../components/RecordForm";
import { useToast } from "../components/Toast";
import { createRecord, errorInfo } from "../lib/api";

function AddRecord() {
  const navigate = useNavigate();
  const toast = useToast();
  const [serverErrors, setServerErrors] = useState({});

  const handleSubmit = async (values) => {
    try {
      const saved = await createRecord(values);
      toast(`${saved.petName} was added`);
      navigate("/view");
    } catch (e) {
      const { message, fields } = errorInfo(e, "Failed to add pet record");
      setServerErrors(fields);
      toast(message, "error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/view" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
        <Icon name="back" className="h-4 w-4" /> Back to records
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Add a pet</h1>
      <p className="mb-6 mt-1 text-slate-600">Fields marked * are required.</p>
      <RecordForm submitLabel="Add record" onSubmit={handleSubmit} serverErrors={serverErrors} />
    </div>
  );
}

export default AddRecord;
