import { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Select from "../components/Select";
import DatePicker from "../components/DatePicker";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  const classes = [
    { value: "9A", label: "Class 9A" },
    { value: "9B", label: "Class 9B" },
    { value: "10A", label: "Class 10A" },
    { value: "10B", label: "Class 10B" }
  ];

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
    }
  }, [selectedClass]);

  const fetchStudents = async () => {
    setLoading(true);
    setTimeout(() => {
      setStudents([
        { id: 1, name: "John Doe", rollNumber: "101", status: "present" },
        { id: 2, name: "Jane Smith", rollNumber: "102", status: "present" },
        { id: 3, name: "Mike Johnson", rollNumber: "103", status: "absent" },
        { id: 4, name: "Sarah Williams", rollNumber: "104", status: "late" }
      ]);
      setLoading(false);
    }, 500);
  };

  const updateStatus = (studentId, status) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, status } : s));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setTimeout(() => {
      setAlert({ type: "success", message: "Attendance saved successfully" });
      setSaving(false);
      setTimeout(() => setAlert(null), 3000);
    }, 500);
  };

  const getStatusColor = (status) => {
    if (status === "present") return "bg-green-100 border-green-500 text-green-700";
    if (status === "absent") return "bg-red-100 border-red-500 text-red-700";
    if (status === "late") return "bg-yellow-100 border-yellow-500 text-yellow-700";
    return "bg-gray-100";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select label="Select Class" options={classes} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required />
        <DatePicker label="Select Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && selectedClass && (
        <Card title={`Attendance for Class ${selectedClass} - ${selectedDate}`}>
          <div className="space-y-3">
            {students.map(student => (
              <div key={student.id} className={`p-4 border rounded-lg ${getStatusColor(student.status)}`}>
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-sm opacity-75">Roll No: {student.rollNumber}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => updateStatus(student.id, "present")} size="sm" variant={student.status === "present" ? "success" : "outline"}>Present</Button>
                    <Button onClick={() => updateStatus(student.id, "absent")} size="sm" variant={student.status === "absent" ? "danger" : "outline"}>Absent</Button>
                    <Button onClick={() => updateStatus(student.id, "late")} size="sm" variant={student.status === "late" ? "secondary" : "outline"}>Late</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button onClick={handleSubmit} loading={saving} fullWidth>Save Attendance</Button>
          </div>
        </Card>
      )}

      {!selectedClass && !loading && (
        <Card className="text-center text-gray-500 py-8">Please select a class to mark attendance</Card>
      )}
    </div>
  );
};

export default Attendance;