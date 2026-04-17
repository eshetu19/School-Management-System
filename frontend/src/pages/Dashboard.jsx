import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import GradeChart from "../components/GradeChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext, not localStorage
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    attendanceRate: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingRegistrations, setPendingRegistrations] = useState(0);
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      // Simulate API calls - Replace with actual API later
      setTimeout(() => {
        if (user?.role === "admin") {
          setStats({
            totalStudents: 450,
            totalTeachers: 35,
            totalClasses: 18,
            attendanceRate: 92,
          });
          setRecentActivities([
            {
              id: 1,
              action: "New Student registered",
              time: "2 hours ago",
              user: "John Doe",
            },
            {
              id: 2,
              action: "Attendance marked for Class 10A",
              time: "5 hours ago",
              user: "Mr. Chedasa",
            },
            {
              id: 3,
              action: "Grades Updated for Mathematics",
              time: "1 day ago",
              user: "Chala Bulteksi",
            },
          ]);
          setPendingRegistrations(8);
          setGradeData([
            { name: "A", value: 85 },
            { name: "B", value: 78 },
            { name: "C", value: 52 },
            { name: "D", value: 35 },
            { name: "F", value: 12 },
          ]);
        } else if (user?.role === "teacher") {
          setStats({
            totalStudents: 85,
            totalTeachers: 0,
            totalClasses: 4,
            attendanceRate: 88,
          });
          setRecentActivities([
            {
              id: 1,
              action: "Class 10-B 3 students Absent",
              time: "Today",
              user: "",
            },
            {
              id: 2,
              action: "Mathematics test Scheduled",
              time: "yesterday",
              user: "",
            },
          ]);
          setPendingRegistrations(0);
        } else if (user?.role === "student") {
          setStats({
            totalStudents: 0,
            totalTeachers: 0,
            totalClasses: 0,
            attendanceRate: 94,
          });
          setRecentActivities([
            { id: 1, action: "Mathematics: 85%", time: "last week", user: "" },
            { id: 2, action: "Science: 78%", time: "last week", user: "" },
          ]);
        }
        setLoading(false);
      }, 800);
    };

    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return (
      <div className="p-6 text-center">Please login to view dashboard</div>
    );
  }

  const renderAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalStudents}
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-black text-sm">Total Teachers</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalTeachers}
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Total Classes</h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalClasses}
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Attendance Rate</h3>
          <p className="text-3xl font-bold text-orange-600">
            {stats.attendanceRate}%
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Quick Actions">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/students")} size="sm">
              Manage Students
            </Button>
            <Button
              onClick={() => navigate("/attendance-reports")}
              size="sm"
              variant="secondary"
            >
              View Reports
            </Button>
            <Button
              onClick={() => navigate("/registrations")}
              size="sm"
              variant="success"
            >
              Pending Approvals ({pendingRegistrations})
            </Button>
          </div>
        </Card>
        <GradeChart data={gradeData} type="bar" title="Grade Distribution" />
      </div>

      <Card title="Recent Activities">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex justify-between items-center py-3 border-b last:border-0"
          >
            <div>
              <p className="text-gray-800">{activity.action}</p>
              {activity.user && (
                <p className="text-xs text-gray-500">by {activity.user}</p>
              )}
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </Card>
    </>
  );

  const renderTeacherDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">My Students</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalStudents}
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">My Classes</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalClasses}
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Attendance Rate</h3>
          <p className="text-3xl font-bold text-orange-600">
            {stats.attendanceRate}%
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Pending Tasks</h3>
          <p className="text-3xl font-bold text-red-600">3</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Today's Classes">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Class 10A - Mathematics</span>
              <span className="text-gray-500">9:00 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Class 10B - Mathematics</span>
              <span className="text-gray-500">11:00 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Class 9A - Biology</span>
              <span className="text-gray-500">2:00 PM</span>
            </li>
          </ul>
        </Card>
        <Card title="Quick Actions">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/attendance")} size="sm">
              Mark Attendance
            </Button>
            <Button
              onClick={() => navigate("/grades")}
              size="sm"
              variant="secondary"
            >
              Enter Grades
            </Button>
            <Button
              onClick={() => navigate("/my-students")}
              size="sm"
              variant="outline"
            >
              View Students
            </Button>
          </div>
        </Card>
      </div>

      <Card title="Recent Activities">
        {recentActivities.map((activity, idx) => (
          <div key={idx} className="py-3 border-b last:border-0">
            <p className="text-gray-800">{activity.action}</p>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        ))}
      </Card>
    </>
  );

  const renderStudentDashboard = () => (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Overall Attendance</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.attendanceRate}%
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Average Grade</h3>
          <p className="text-3xl font-bold text-blue-600">B+</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-gray-500 text-sm">Rank In Class</h3>
          <p className="text-3xl font-bold text-green-600">12/45</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Recent Grades">
          {recentActivities.map((activity, idx) => (
            <div
              key={idx}
              className="flex justify-between py-2 border-b last:border-0"
            >
              <span>{activity.action.split(":")[0]}</span>
              <span className="font-semibold">
                {activity.action.split(":")[1]}
              </span>
            </div>
          ))}
        </Card>
        <Card title="Upcoming Events">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Mathematics Exam</span>
              <span className="text-sm text-gray-500">Mar 25, 2025</span>
            </li>
            <li className="flex justify-between">
              <span>Biology Project Due</span>
              <span className="text-sm text-gray-500">Mar 28, 2025</span>
            </li>
            <li className="flex justify-between">
              <span>Parent-Teacher Meeting</span>
              <span className="text-sm text-gray-500">Apr 5, 2025</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Quick Links">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/my-grades")} size="sm">
            View All Grades
          </Button>
          <Button
            onClick={() => navigate("/my-attendance")}
            size="sm"
            variant="secondary"
          >
            View Attendance
          </Button>
          <Button
            onClick={() => navigate("/profile")}
            size="sm"
            variant="secondary"
          >
            Update Profile
          </Button>
        </div>
      </Card>
    </>
  );

  return (
    <div className="p-6 xl:px-12 xl:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-slate-600 mt-2">
          Here's what's happening with your {user?.role} account today.
        </p>
      </div>
      {user?.role === "admin" && renderAdminDashboard()}
      {user?.role === "teacher" && renderTeacherDashboard()}
      {user?.role === "student" && renderStudentDashboard()}
    </div>
  );
};

export default Dashboard;
