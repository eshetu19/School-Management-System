import api from "./api";

export const gradeService = {
  getByStudent: async (studentId, term = null) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { subject: "Mathematics", score: 85, grade: "A", term: "Term 1", teacher: "Mrs. Smith" },
          { subject: "Science", score: 78, grade: "B+", term: "Term 1", teacher: "Mr. Johnson" },
          { subject: "English", score: 92, grade: "A+", term: "Term 1", teacher: "Mrs. Davis" }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/grades/student/${studentId}${term ? `?term=${term}` : ''}`);
  },
  
  getByClassAndSubject: async (classId, subject, term) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { studentId: 1, name: "John Doe", rollNumber: "101", score: 85, grade: "A" },
          { studentId: 2, name: "Jane Smith", rollNumber: "102", score: 78, grade: "B+" }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/grades/class/${classId}/subject/${subject}/term/${term}`);
  },
  
  createOrUpdate: async (gradeData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Grades saved successfully" });
      }, 500);
    });
    
    // Actual API call:
    // return api.post("/grades", gradeData);
  },
  
  delete: async (gradeId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
    
    // Actual API call:
    // return api.delete(`/grades/${gradeId}`);
  },
  
  getAverage: async (studentId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ average: 85.5, totalSubjects: 6, highest: 92, lowest: 78 });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/grades/student/${studentId}/average`);
  },
};

export default gradeService;