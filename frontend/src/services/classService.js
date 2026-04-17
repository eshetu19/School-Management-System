import api from "./api";

export const classService = {
  getAll: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, className: "Class 9", section: "A", teacherId: 1, teacherName: "Mrs. Smith", studentCount: 32 },
          { id: 2, className: "Class 9", section: "B", teacherId: 2, teacherName: "Mr. Johnson", studentCount: 30 },
          { id: 3, className: "Class 10", section: "A", teacherId: 3, teacherName: "Mrs. Davis", studentCount: 28 }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get("/classes");
  },
  
  getById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: parseInt(id), className: "Class 10", section: "A", teacherId: 1 });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/classes/${id}`);
  },
  
  create: async (classData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now(), ...classData });
      }, 500);
    });
    
    // Actual API call:
    // return api.post("/classes", classData);
  },
  
  update: async (id, classData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id, ...classData });
      }, 500);
    });
    
    // Actual API call:
    // return api.put(`/classes/${id}`, classData);
  },
  
  delete: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
    
    // Actual API call:
    // return api.delete(`/classes/${id}`);
  },
  
  assignStudent: async (classId, studentId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, classId, studentId });
      }, 500);
    });
    
    // Actual API call:
    // return api.post(`/classes/${classId}/assign-student`, { studentId });
  },
  
  getStudents: async (classId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "John Doe", rollNumber: "101" },
          { id: 2, name: "Jane Smith", rollNumber: "102" }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/classes/${classId}/students`);
  },
};

export default classService;