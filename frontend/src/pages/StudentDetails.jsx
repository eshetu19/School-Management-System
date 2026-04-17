import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import StudentAvatar from "../components/StudentAvatar";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const fetchStudentData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStudent({
        id: parseInt(id),
        firstName: "John",
        lastName: "Doe",
        email: "john@school.com",
        phone: "1234567890",
        class: "10A",
        rollNumber: "101",
        parentName: "Mr. Doe",
        parentPhone: "0987654321",
        address: "123 Main St, City",
        dateOfBirth: "2008-05-15",
        gender: "Male",
        joinDate: "2023-06-01"
      });
      setGrades([
        { subject: "Mathematics", score: 85, grade: "A", term: "Term 1" },
        { subject: "Science", score: 78, grade: "B+", term: "Term 1" },
        { subject: "English", score: 92, grade: "A+", term: "Term 1" }
      ]);
      setAttendance([
        { date: "2025-03-10", status: "Present" },
        { date: "2025-03-11", status: "Present" },
        { date: "2025-03-12", status: "Absent" }
      ]);
      setLoading(false);
    }, 500);
  };

  if (loading) return <LoadingSpinner />;

  const attendancePercentage = (attendance.filter(a => a.status === "Present").length / attendance.length) * 100;

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)} variant="secondary" className="mb-4">← Back</Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <StudentAvatar name={`${student.firstName} ${student.lastName}`} size="xl" />
          </div>
          <h2 className="text-xl font-bold">{student.firstName} {student.lastName}</h2>
          <p className="text-gray-500">Roll No: {student.rollNumber}</p>
          <p className="text-blue-600 font-semibold mt-2">Class {student.class}</p>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">📧 {student.email}</p>
            <p className="text-sm text-gray-600">📞 {student.phone}</p>
          </div>
        </Card>

        {/* Personal Information */}
        <Card title="Personal Information">
          <div className="space-y-2">
            <p><strong>Full Name:</strong> {student.firstName} {student.lastName}</p>
            <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Join Date:</strong> {student.joinDate}</p>
            <p><strong>Address:</strong> {student.address}</p>
          </div>
        </Card>

        {/* Parent Information */}
        <Card title="Parent Information">
          <div className="space-y-2">
            <p><strong>Parent Name:</strong> {student.parentName}</p>
            <p><strong>Parent Phone:</strong> {student.parentPhone}</p>
            <p><strong>Emergency Contact:</strong> {student.parentPhone}</p>
          </div>
        </Card>

        {/* Grades Section */}
        <Card title="Grades" className="lg:col-span-2">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr><th className="px-4 py-2 text-left">Subject</th><th>Score</th><th>Grade</th><th>Term</th></tr>
            </thead>
            <tbody>
              {grades.map((g, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{g.subject}</td>
                  <td className="px-4 py-2">{g.score}%</td>
                  <td className="px-4 py-2 font-semibold">{g.grade}</td>
                  <td className="px-4 py-2">{g.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Attendance Section */}
        <Card title="Attendance Summary">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">{attendancePercentage.toFixed(0)}%</p>
            <p className="text-gray-500">Overall Attendance</p>
          </div>
          <div className="mt-4 space-y-1">
            {attendance.slice(0, 5).map((a, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{a.date}</span>
                <span className={a.status === "Present" ? "text-green-600" : "text-red-600"}>{a.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetails;