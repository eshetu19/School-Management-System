import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Select from "../components/Select";
import DatePicker from "../components/DatePicker";
import LoadingSpinner from "../components/LoadingSpinner";

const AttendanceReports = () => {
  const [reportType, setReportType] = useState("class");
  const [selectedClass, setSelectedClass] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const classes = [
    { value: "9A", label: "Class 9A" },
    { value: "9B", label: "Class 9B" },
    { value: "10A", label: "Class 10A" },
    { value: "10B", label: "Class 10B" }
  ];

  const reportTypes = [
    { value: "class", label: "Class-wise Report" },
    { value: "student", label: "Student-wise Report" },
    { value: "monthly", label: "Monthly Summary" }
  ];

  const generateReport = async () => {
    setLoading(true);
    setTimeout(() => {
      if (reportType === "class") {
        setReportData({
          title: `Attendance Report - Class ${selectedClass}`,
          period: `${startDate} to ${endDate}`,
          data: [
            { name: "John Doe", rollNumber: "101", present: 18, absent: 2, late: 1, percentage: 86 },
            { name: "Jane Smith", rollNumber: "102", present: 20, absent: 1, late: 0, percentage: 95 },
            { name: "Mike Johnson", rollNumber: "103", present: 15, absent: 4, late: 2, percentage: 71 }
          ],
          summary: { totalStudents: 3, averageAttendance: 84 }
        });
      }
      setLoading(false);
    }, 1000);
  };

  const exportToCSV = () => {
    if (!reportData) return;
    const headers = ["Name", "Roll Number", "Present", "Absent", "Late", "Percentage"];
    const rows = reportData.data.map(s => [s.name, s.rollNumber, s.present, s.absent, s.late, s.percentage]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance Reports</h1>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select label="Report Type" options={reportTypes} value={reportType} onChange={(e) => setReportType(e.target.value)} />
          
          {reportType === "class" && (
            <Select label="Select Class" options={classes} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} />
          )}
          
          <DatePicker label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <DatePicker label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        
        <div className="mt-4">
          <Button onClick={generateReport} loading={loading}>Generate Report</Button>
        </div>
      </Card>

      {loading && <LoadingSpinner />}

      {reportData && !loading && (
        <Card title={reportData.title}>
          <p className="text-sm text-gray-500 mb-4">Period: {reportData.period}</p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2">Roll No</th>
                  <th className="px-4 py-2">Present</th>
                  <th className="px-4 py-2">Absent</th>
                  <th className="px-4 py-2">Late</th>
                  <th className="px-4 py-2">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {reportData.data.map((student, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2 text-center">{student.rollNumber}</td>
                    <td className="px-4 py-2 text-center text-green-600">{student.present}</td>
                    <td className="px-4 py-2 text-center text-red-600">{student.absent}</td>
                    <td className="px-4 py-2 text-center text-yellow-600">{student.late}</td>
                    <td className="px-4 py-2 text-center font-semibold">{student.percentage}%</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="5" className="px-4 py-2 font-bold">Average Attendance</td>
                  <td className="px-4 py-2 text-center font-bold">{reportData.summary.averageAttendance}%</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={exportToCSV} variant="secondary">Export to CSV</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AttendanceReports;