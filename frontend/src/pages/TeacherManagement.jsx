import { useState, useEffect } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", subject: "", qualification: "", joinDate: ""
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setTimeout(() => {
      setTeachers([
        { id: 1, firstName: "Sarah", lastName: "Smith", email: "sarah@school.com", phone: "1234567890", subject: "Mathematics", qualification: "M.Sc", joinDate: "2022-08-01" },
        { id: 2, firstName: "John", lastName: "Johnson", email: "john@school.com", phone: "1234567891", subject: "Science", qualification: "M.Sc", joinDate: "2022-08-01" }
      ]);
      setSubjects(["Mathematics", "Science", "English", "History", "Physics", "Chemistry"]);
    }, 500);
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Email", accessor: "email" },
    { header: "Subject", accessor: "subject" },
    { header: "Qualification", accessor: "qualification" }
  ];

  const handleAdd = () => {
    setSelectedTeacher(null);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", qualification: "", joinDate: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setTeachers(teachers.filter(t => t.id !== selectedTeacher.id));
    setAlert({ type: "success", message: "Teacher deleted successfully" });
    setIsDeleteDialogOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = () => {
    if (selectedTeacher) {
      setTeachers(teachers.map(t => t.id === selectedTeacher.id ? { ...formData, id: t.id } : t));
      setAlert({ type: "success", message: "Teacher updated successfully" });
    } else {
      const newTeacher = { ...formData, id: Date.now() };
      setTeachers([...teachers, newTeacher]);
      setAlert({ type: "success", message: "Teacher added successfully" });
    }
    setIsModalOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };

  const actions = (row) => (
    <div className="flex gap-2">
      <Button onClick={() => handleEdit(row)} size="sm" variant="secondary">Edit</Button>
      <Button onClick={() => handleDelete(row)} size="sm" variant="danger">Delete</Button>
    </div>
  );

  const subjectOptions = subjects.map(s => ({ value: s, label: s }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Teachers</h1>
        <Button onClick={handleAdd}>Add Teacher</Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <Table columns={columns} data={teachers} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedTeacher ? "Edit Teacher" : "Add Teacher"} showConfirmButtons onConfirm={handleSubmit}>
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <Input label="Phone" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <Select label="Subject" options={subjectOptions} value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
        <Input label="Qualification" name="qualification" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
        <Input label="Join Date" type="date" name="joinDate" value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })} />
      </Modal>

      <ConfirmDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} message={`Delete teacher ${selectedTeacher?.firstName} ${selectedTeacher?.lastName}?`} />
    </div>
  );
};

export default TeacherManagement;