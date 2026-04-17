import { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import GradeChart from "../components/GradeChart";

const MyGrades = () => {
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const [summary, setSummary] = useState({ total: 0, average: 0, highest: 0, lowest: 0 });

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    setTimeout(() => {
      const gradeData = [
        { subject: "Mathematics", score: 85, grade: "A", term: "Term 1", teacher: "Mrs. Smith" },
        { subject: "Science", score: 78, grade: "B+", term: "Term 1", teacher: "Mr. Johnson" },
        { subject: "English", score: 92, grade: "A+", term: "Term 1", teacher: "Mrs. Davis" },
        { subject: "History", score: 88, grade: "A", term: "Term 1", teacher: "Mr. Brown" },
        { subject: "Mathematics", score: 90, grade: "A+", term: "Term 2", teacher: "Mrs. Smith" },
        { subject: "Science", score: 82, grade: "A", term: "Term 2", teacher: "Mr. Johnson" }
      ];
      setGrades(gradeData);
      
      const scores = gradeData.map(g => g.score);
      setSummary({
        total: scores.length,
        average: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
        highest: Math.max(...scores),
        lowest: Math.min(...scores)
      });
      setLoading(false);
    }, 500);
  };

  const chartData = grades.reduce((acc, grade) => {
    const existing = acc.find(item => item.name === grade.subject);
    if (existing) {
      existing.value = ((existing.value + grade.score) / 2).toFixed(1);
    } else {
      acc.push({ name: grade.subject, value: grade.score });
    }
    return acc;
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Grades</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Total Subjects</p>
          <p className="text-2xl font-bold text-blue-600">{summary.total}</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Average Score</p>
          <p className="text-2xl font-bold text-green-600">{summary.average}%</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Highest Score</p>
          <p className="text-2xl font-bold text-purple-600">{summary.highest}%</p>
        </Card>
        <Card className="text-center">
          <p className="text-gray-500 text-sm">Lowest Score</p>
          <p className="text-2xl font-bold text-orange-600">{summary.lowest}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GradeChart data={chartData} type="bar" title="Subject Performance" />
        <GradeChart data={chartData} type="pie" title="Grade Distribution" />
      </div>

      <Card title="Grade Details">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Grade</th>
                <th className="px-4 py-2">Term</th>
                <th className="px-4 py-2">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2 font-medium">{grade.subject}</td>
                  <td className="px-4 py-2 text-center">{grade.score}%</td>
                  <td className="px-4 py-2 text-center font-semibold">{grade.grade}</td>
                  <td className="px-4 py-2 text-center">{grade.term}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-500">{grade.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MyGrades;