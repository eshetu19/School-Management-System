import api from "./api";

export const teacherService = {
  getAll: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, firstName: "Sarah", lastName: "Smith", email: "sarah@school.com", phone: "1234567890", subject: "Mathematics", qualification: "M.Sc", joinDate: "2022-08-01" },
          { id: 2, firstName: "John", lastName: "Johnson", email: "john@school.com", phone: "1234567891", subject: "Science", qualification: "M.Sc", joinDate: "2022-08-01" }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get("/teachers");
  },
  
  getById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: parseInt(id), firstName: "Sarah", lastName: "Smith", email: "sarah@school.com", subject: "Mathematics" });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/teachers/${id}`);
  },
  
  create: async (teacherData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now(), ...teacherData });
      }, 500);
    });
    
    // Actual API call:
    // return api.post("/teachers", teacherData);
  },
  
  update: async (id, teacherData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id, ...teacherData });
      }, 500);
    });
    
    // Actual API call:
    // return api.put(`/teachers/${id}`, teacherData);
  },
  
  delete: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
    
    // Actual API call:
    // return api.delete(`/teachers/${id}`);
  },
  
  assignSubject: async (teacherId, subject) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, teacherId, subject });
      }, 500);
    });
    
    // Actual API call:
    // return api.post(`/teachers/${teacherId}/assign-subject`, { subject });
  },
};

export default teacherService;