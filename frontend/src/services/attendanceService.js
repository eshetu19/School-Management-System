import api from "./api";

export const attendanceService = {
  markAttendance: async (classId, date, attendanceData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Attendance saved successfully" });
      }, 500);
    });
    
    // Actual API call:
    // return api.post("/attendance", { classId, date, attendanceData });
  },
  
  getByClassAndDate: async (classId, date) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { studentId: 1, name: "John Doe", rollNumber: "101", status: "present" },
          { studentId: 2, name: "Jane Smith", rollNumber: "102", status: "absent" }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/attendance/class/${classId}/date/${date}`);
  },
  
  getByStudent: async (studentId, month, year) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {};
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const random = Math.random();
          if (random < 0.7) mockData[dateStr] = "present";
          else if (random < 0.85) mockData[dateStr] = "late";
          else mockData[dateStr] = "absent";
        }
        resolve(mockData);
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/attendance/student/${studentId}?month=${month}&year=${year}`);
  },
  
  getSummary: async (classId, startDate, endDate) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalDays: 20,
          summary: [
            { studentId: 1, name: "John Doe", present: 18, absent: 1, late: 1, percentage: 90 },
            { studentId: 2, name: "Jane Smith", present: 15, absent: 3, late: 2, percentage: 75 }
          ]
        });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/attendance/summary/class/${classId}?start=${startDate}&end=${endDate}`);
  },
};

export default attendanceService;