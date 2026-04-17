import { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

const Grades = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
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

  const subjects = [
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" }
  ];

  const terms = [
    { value: "term1", label: "Term 1" },
    { value: "term2", label: "Term 2" },
    { value: "final", label: "Final Exam" }
  ];

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchStudents();
    }
  }, [selectedClass, selectedSubject]);

  const fetchStudents = async () => {
    setLoading(true);
    setTimeout(() => {
      setStudents([
        { id: 1, name: "John Doe", rollNumber: "101", score: 85, grade: "A" },
        { id: 2, name: "Jane Smith", rollNumber: "102", score: 78, grade: "B+" },
        { id: 3, name: "Mike Johnson", rollNumber: "103", score: 92, grade: "A+" }
      ]);
      setLoading(false);
    }, 500);
  };

  const updateScore = (studentId, score) => {
    let grade = "F";
    if (score >= 90) grade = "A+";
    else if (score >= 80) grade = "A";
    else if (score >= 70) grade = "B+";
    else if (score >= 60) grade = "B";
    else if (score >= 50) grade = "C";
    else if (score >= 40) grade = "D";
    
    setStudents(students.map(s => s.id === studentId ? { ...s, score: parseInt(score), grade } : s));
  };

  const handleSubmit = async () => {
    if (!selectedTerm) {
      setAlert({ type: "warning", message: "Please select a term" });
      return;
    }
    
    setSaving(true);
    setTimeout(() => {
      setAlert({ type: "success", message: "Grades saved successfully" });
      setSaving(false);
      setTimeout(() => setAlert(null), 3000);
    }, 500);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Enter Grades</h1>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select label="Select Class" options={classes} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required />
        <Select label="Select Subject" options={subjects} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required />
        <Select label="Select Term" options={terms} value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} required />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && selectedClass && selectedSubject && (
        <Card title={`Grades: Class ${selectedClass} - ${subjects.find(s => s.value === selectedSubject)?.label}`}>
          <div className="space-y-4">
            {students.map(student => (
              <div key={student.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={student.score || ""}
                    onChange={(e) => updateScore(student.id, e.target.value)}
                    className="w-24 mb-0"
                    placeholder="Score"
                  />
                  <span className={`px-3 py-1 rounded font-semibold text-sm ${
                    student.grade === "A+" ? "bg-green-100 text-green-700" :
                    student.grade === "A" ? "bg-blue-100 text-blue-700" :
                    student.grade === "B+" ? "bg-cyan-100 text-cyan-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {student.grade || "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button onClick={handleSubmit} loading={saving} fullWidth>Save Grades</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Grades;