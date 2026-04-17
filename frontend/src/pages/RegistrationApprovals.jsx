import { useState, useEffect } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";

const RegistrationApprovals = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setTimeout(() => {
      setRegistrations([
        { id: 1, firstName: "Alice", lastName: "Brown", email: "alice@email.com", phone: "1234567890", parentName: "Mr. Brown", gradeApplying: "9A", status: "pending", submittedDate: "2025-03-01" },
        { id: 2, firstName: "Bob", lastName: "Wilson", email: "bob@email.com", phone: "1234567891", parentName: "Mrs. Wilson", gradeApplying: "10B", status: "pending", submittedDate: "2025-03-02" },
        { id: 3, firstName: "Charlie", lastName: "Davis", email: "charlie@email.com", phone: "1234567892", parentName: "Mr. Davis", gradeApplying: "9B", status: "pending", submittedDate: "2025-03-03" }
      ]);
    }, 500);
  };

  const columns = [
    { header: "Name", accessor: (row) => `${row.firstName} ${row.lastName}` },
    { header: "Email", accessor: "email" },
    { header: "Parent", accessor: "parentName" },
    { header: "Applying For", accessor: "gradeApplying" },
    { header: "Submitted", accessor: "submittedDate" },
    { header: "Status", accessor: "status" }
  ];

  const handleView = (registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const handleApprove = (registration) => {
    setSelectedRegistration(registration);
    setActionType("approve");
    setIsConfirmOpen(true);
  };

  const handleReject = (registration) => {
    setSelectedRegistration(registration);
    setActionType("reject");
    setIsConfirmOpen(true);
  };

  const confirmAction = () => {
    const newStatus = actionType === "approve" ? "approved" : "rejected";
    setRegistrations(registrations.map(r => 
      r.id === selectedRegistration.id ? { ...r, status: newStatus } : r
    ));
    setAlert({ type: "success", message: `Registration ${actionType}d successfully` });
    setIsConfirmOpen(false);
    setIsModalOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };

  const actions = (row) => (
    <div className="flex gap-2">
      <Button onClick={() => handleView(row)} size="sm" variant="secondary">View</Button>
      {row.status === "pending" && (
        <>
          <Button onClick={() => handleApprove(row)} size="sm" variant="success">Approve</Button>
          <Button onClick={() => handleReject(row)} size="sm" variant="danger">Reject</Button>
        </>
      )}
    </div>
  );

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700"
    };
    return <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>{status.toUpperCase()}</span>;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registration Approvals</h1>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <Table columns={columns} data={registrations} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registration Details" size="lg">
        {selectedRegistration && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <p><strong>Full Name:</strong> {selectedRegistration.firstName} {selectedRegistration.lastName}</p>
              <p><strong>Email:</strong> {selectedRegistration.email}</p>
              <p><strong>Phone:</strong> {selectedRegistration.phone}</p>
              <p><strong>Parent Name:</strong> {selectedRegistration.parentName}</p>
              <p><strong>Parent Phone:</strong> {selectedRegistration.parentPhone || "N/A"}</p>
              <p><strong>Applying for:</strong> {selectedRegistration.gradeApplying}</p>
              <p><strong>Previous School:</strong> {selectedRegistration.previousSchool || "N/A"}</p>
              <p><strong>Address:</strong> {selectedRegistration.address || "N/A"}</p>
              <p><strong>Submitted:</strong> {selectedRegistration.submittedDate}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedRegistration.status)}</p>
            </div>
            {selectedRegistration.documents && (
              <div className="border-t pt-3">
                <p><strong>Documents:</strong></p>
                <a href="#" className="text-blue-600 text-sm">View Uploaded Documents</a>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmAction}
        title={`${actionType === "approve" ? "Approve" : "Reject"} Registration`}
        message={`Are you sure you want to ${actionType} the registration for ${selectedRegistration?.firstName} ${selectedRegistration?.lastName}?`}
        confirmVariant={actionType === "approve" ? "success" : "danger"}
      />
    </div>
  );
};

export default RegistrationApprovals;