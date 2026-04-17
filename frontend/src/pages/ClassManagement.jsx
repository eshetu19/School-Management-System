import { useState, useEffect } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "../components/Alert";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({ className: "", section: "", teacherId: "" });
  const [assignmentData, setAssignmentData] = useState({ classId: "", studentId: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTimeout(() => {
      setClasses([
        { id: 1, className: "Class 9", section: "A", teacherId: 1, teacherName: "Mrs. Smith", studentCount: 32 },
        { id: 2, className: "Class 9", section: "B", teacherId: 2, teacherName: "Mr. Johnson", studentCount: 30 },
        { id: 3, className: "Class 10", section: "A", teacherId: 3, teacherName: "Mrs. Davis", studentCount: 28 }
      ]);
      setTeachers([
        { id: 1, name: "Mrs. Smith" },
        { id: 2, name: "Mr. Johnson" },
        { id: 3, name: "Mrs. Davis" }
      ]);
      setStudents([
        { id: 1, name: "John Doe", class: "" },
        { id: 2, name: "Jane Smith", class: "" }
      ]);
    }, 500);
  };

  const columns = [
    { header: "Class", accessor: "className" },
    { header: "Section", accessor: "section" },
    { header: "Class Teacher", accessor: "teacherName" },
    { header: "Students", accessor: "studentCount" }
  ];

  const handleAdd = () => {
    setSelectedClass(null);
    setFormData({ className: "", section: "", teacherId: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (classItem) => {
    setSelectedClass(classItem);
    setFormData({ className: classItem.className, section: classItem.section, teacherId: classItem.teacherId });
    setIsModalOpen(true);
  };

  const handleDelete = (classItem) => {
    setSelectedClass(classItem);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setClasses(classes.filter(c => c.id !== selectedClass.id));
    setAlert({ type: "success", message: "Class deleted successfully" });
    setIsDeleteDialogOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = () => {
    const teacher = teachers.find(t => t.id == formData.teacherId);
    if (selectedClass) {
      setClasses(classes.map(c => c.id === selectedClass.id ? { ...c, ...formData, teacherName: teacher?.name } : c));
      setAlert({ type: "success", message: "Class updated successfully" });
    } else {
      const newClass = { id: Date.now(), ...formData, teacherName: teacher?.name, studentCount: 0 };
      setClasses([...classes, newClass]);
      setAlert({ type: "success", message: "Class added successfully" });
    }
    setIsModalOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAssignStudent = () => {
    setStudents(students.map(s => s.id === assignmentData.studentId ? { ...s, class: assignmentData.classId } : s));
    setAlert({ type: "success", message: "Student assigned successfully" });
    setIsAssignModalOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };

  const actions = (row) => (
    <div className="flex gap-2">
      <Button onClick={() => handleEdit(row)} size="sm" variant="secondary">Edit</Button>
      <Button onClick={() => handleDelete(row)} size="sm" variant="danger">Delete</Button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <div className="flex gap-3">
          <Button onClick={() => setIsAssignModalOpen(true)} variant="secondary">Assign Student</Button>
          <Button onClick={handleAdd}>Add Class</Button>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <Table columns={columns} data={classes} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedClass ? "Edit Class" : "Add Class"} showConfirmButtons onConfirm={handleSubmit}>
        <Input label="Class Name" name="className" value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })} required />
        <Input label="Section" name="section" value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} required />
        <Select label="Class Teacher" options={teachers.map(t => ({ value: t.id, label: t.name }))} value={formData.teacherId} onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })} required />
      </Modal>

      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign Student to Class" showConfirmButtons onConfirm={handleAssignStudent}>
        <Select label="Select Student" options={students.map(s => ({ value: s.id, label: s.name }))} value={assignmentData.studentId} onChange={(e) => setAssignmentData({ ...assignmentData, studentId: e.target.value })} required />
        <Select label="Select Class" options={classes.map(c => ({ value: c.id, label: `${c.className} ${c.section}` }))} value={assignmentData.classId} onChange={(e) => setAssignmentData({ ...assignmentData, classId: e.target.value })} required />
      </Modal>

      <ConfirmDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} message={`Delete class ${selectedClass?.className} ${selectedClass?.section}?`} />
    </div>
  );
};

export default ClassManagement;