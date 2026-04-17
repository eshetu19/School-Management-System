import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const MyStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMyStudents();
  }, []);

  const fetchMyStudents = async () => {
    setTimeout(() => {
      setStudents([
        { id: 1, name: "John Doe", rollNumber: "101", class: "10A", attendance: 92, averageGrade: "A" },
        { id: 2, name: "Jane Smith", rollNumber: "102", class: "10A", attendance: 88, averageGrade: "B+" },
        { id: 3, name: "Mike Johnson", rollNumber: "103", class: "10B", attendance: 95, averageGrade: "A+" }
      ]);
      setLoading(false);
    }, 500);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Roll Number", accessor: "rollNumber" },
    { header: "Class", accessor: "class" },
    { header: "Attendance %", accessor: "attendance" },
    { header: "Avg Grade", accessor: "averageGrade" }
  ];

  const actions = (row) => (
    <div className="flex gap-2">
      <Button onClick={() => navigate(`/student-details/${row.id}`)} size="sm" variant="secondary">View</Button>
      <Button onClick={() => navigate("/attendance")} size="sm">Mark Attendance</Button>
      <Button onClick={() => navigate("/grades")} size="sm" variant="outline">Enter Grade</Button>
    </div>
  );

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Students</h1>

      <div className="mb-4">
        <SearchBar onSearch={setSearchTerm} placeholder="Search students..." />
      </div>

      <Table columns={columns} data={filteredStudents} actions={actions} />
    </div>
  );
};

export default MyStudents;