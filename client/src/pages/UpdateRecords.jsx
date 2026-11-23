import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import RecordForm from "../components/RecordForm";
import { useToast } from "../components/Toast";
import { errorInfo, getRecord, updateRecord } from "../lib/api";

function UpdateRecord() {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    getRecord(id)
      .then(setRecord)
      .catch((e) => {
        const info = errorInfo(e, "Failed to fetch pet record");
        setLoadError(info.notFound ? "This record doesn’t exist or was deleted." : info.message);
      });
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const saved = await updateRecord(id, values);
      toast(`${saved.petName}’s record was updated`);
      navigate("/view");
    } catch (e) {
      const { message, fields } = errorInfo(e, "Failed to update pet record");
      setServerErrors(fields);
      toast(message, "error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/view" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
        <Icon name="back" className="h-4 w-4" /> Back to records
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {record ? `Edit ${record.petName}` : "Edit record"}
      </h1>
      {record?.updatedAt && (
        <p className="mt-1 text-sm text-slate-500">Last updated {new Date(record.updatedAt).toLocaleString()}</p>
      )}
      <div className="mt-6">
        {loadError ? (
          <div role="alert" className="card flex flex-col items-center gap-3 p-10 text-center">
            <span className="text-red-600"><Icon name="alert" className="h-8 w-8" /></span>
            <p className="font-medium text-slate-900">{loadError}</p>
            <Link to="/view" className="btn-secondary mt-2">Back to records</Link>
          </div>
        ) : record ? (
          <RecordForm initial={record} submitLabel="Save changes" onSubmit={handleSubmit} serverErrors={serverErrors} />
        ) : (
          <div aria-busy="true" aria-label="Loading record" className="card h-96 animate-pulse bg-slate-100" />
        )}
      </div>
    </div>
  );
}

export default UpdateRecord;
