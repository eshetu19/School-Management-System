import { useState, useEffect } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    class: "",
    rollNumber: "",
    parentName: "",
    parentPhone: ""
  });

  const classes = [
    { value: "9A", label: "Class 9A" },
    { value: "9B", label: "Class 9B" },
    { value: "10A", label: "Class 10A" },
    { value: "10B", label: "Class 10B" }
  ];

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, currentPage]);

  const fetchStudents = async () => {
    setLoading(true);
    // Simulate API call - Replace with actual fetch
    setTimeout(() => {
      const mockStudents = [
        { id: 1, firstName: "John", lastName: "Doe", email: "john@school.com", phone: "1234567890", class: "10A", rollNumber: "101", parentName: "Mr. Doe", parentPhone: "0987654321" },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@school.com", phone: "1234567891", class: "10B", rollNumber: "102", parentName: "Mrs. Smith", parentPhone: "0987654322" },
        { id: 3, firstName: "Mike", lastName: "Johnson", email: "mike@school.com", phone: "1234567892", class: "9A", rollNumber: "103", parentName: "Mr. Johnson", parentPhone: "0987654323" }
      ];
      setStudents(mockStudents);
      setTotalPages(3);
      setLoading(false);
    }, 500);
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Email", accessor: "email" },
    { header: "Class", accessor: "class" },
    { header: "Roll Number", accessor: "rollNumber" }
  ];

  const handleAdd = () => {
    setSelectedStudent(null);
    setFormData({
      firstName: "", lastName: "", email: "", phone: "", class: "", rollNumber: "", parentName: "", parentPhone: ""
    });
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    // Simulate API delete
    setTimeout(() => {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setAlert({ type: "success", message: "Student deleted successfully" });
      setIsDeleteDialogOpen(false);
      setTimeout(() => setAlert(null), 3000);
    }, 500);
  };

  const handleSubmit = async () => {
    if (selectedStudent) {
      // Update existing
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...formData, id: s.id } : s));
      setAlert({ type: "success", message: "Student updated successfully" });
    } else {
      // Add new
      const newStudent = { ...formData, id: Date.now() };
      setStudents([...students, newStudent]);
      setAlert({ type: "success", message: "Student added successfully" });
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

  const filteredStudents = students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        <Button onClick={handleAdd}>Add Student</Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="mb-4">
        <SearchBar onSearch={setSearchTerm} placeholder="Search students..." />
      </div>

      <Table columns={columns} data={filteredStudents} actions={actions} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedStudent ? "Edit Student" : "Add Student"} showConfirmButtons onConfirm={handleSubmit}>
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <Input label="Phone" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <Select label="Class" name="class" options={classes} value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} required />
        <Input label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} required />
        <Input label="Parent Name" name="parentName" value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} />
        <Input label="Parent Phone" name="parentPhone" value={formData.parentPhone} onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })} />
      </Modal>

      <ConfirmDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} message={`Delete ${selectedStudent?.firstName} ${selectedStudent?.lastName}?`} />
    </div>
  );
};

export default ManageStudents;