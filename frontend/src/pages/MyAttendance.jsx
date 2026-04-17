import { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import AttendanceCalendar from "../components/AttendanceCalendar";

const MyAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({});
  const [summary, setSummary] = useState({ present: 0, absent: 0, late: 0, total: 0, percentage: 0 });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchAttendance();
  }, [currentMonth]);

  const fetchAttendance = async () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate attendance data for current month
      const mockData = {};
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      let present = 0, absent = 0, late = 0;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const random = Math.random();
        if (random < 0.7) {
          mockData[dateStr] = "present";
          present++;
        } else if (random < 0.85) {
          mockData[dateStr] = "late";
          late++;
        } else {
          mockData[dateStr] = "absent";
          absent++;
        }
      }
      
      setAttendanceData(mockData);
      setSummary({
        present,
        absent,
        late,
        total: present + absent + late,
        percentage: ((present / (present + absent + late)) * 100).toFixed(1)
      });
      setLoading(false);
    }, 500);
  };

  const handleDateClick = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const status = attendanceData[dateStr];
    alert(`Date: ${dateStr}\nStatus: ${status?.toUpperCase() || "No data"}`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Overall Attendance</p>
          <p className="text-3xl font-bold text-blue-600">{summary.percentage}%</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Present</p>
          <p className="text-2xl font-bold text-green-600">{summary.present}</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Late</p>
          <p className="text-2xl font-bold text-yellow-600">{summary.late}</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Absent</p>
          <p className="text-2xl font-bold text-red-600">{summary.absent}</p>
        </Card>
      </div>

      <AttendanceCalendar
        attendanceData={attendanceData}
        onDateClick={handleDateClick}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />

      <Card title="Attendance Summary" className="mt-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total School Days:</span>
            <span className="font-semibold">{summary.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Days Present:</span>
            <span className="font-semibold text-green-600">{summary.present}</span>
          </div>
          <div className="flex justify-between">
            <span>Days Late:</span>
            <span className="font-semibold text-yellow-600">{summary.late}</span>
          </div>
          <div className="flex justify-between">
            <span>Days Absent:</span>
            <span className="font-semibold text-red-600">{summary.absent}</span>
          </div>
          <div className="pt-2 border-t mt-2">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: `${summary.percentage}%` }}></div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">{summary.percentage}% Attendance</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyAttendance;