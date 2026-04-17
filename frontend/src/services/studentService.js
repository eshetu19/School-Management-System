import api from "./api";

export const studentService = {
  getAll: async (page = 1, limit = 10, search = "") => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          students: [
            { id: 1, firstName: "John", lastName: "Doe", email: "john@school.com", phone: "1234567890", class: "10A", rollNumber: "101", parentName: "Mr. Doe", parentPhone: "0987654321" },
            { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@school.com", phone: "1234567891", class: "10B", rollNumber: "102", parentName: "Mrs. Smith", parentPhone: "0987654322" },
            { id: 3, firstName: "Mike", lastName: "Johnson", email: "mike@school.com", phone: "1234567892", class: "9A", rollNumber: "103", parentName: "Mr. Johnson", parentPhone: "0987654323" }
          ],
          total: 3,
          page,
          totalPages: 1
        });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/students?page=${page}&limit=${limit}&search=${search}`);
  },
  
  getById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: parseInt(id),
          firstName: "John",
          lastName: "Doe",
          email: "john@school.com",
          phone: "1234567890",
          class: "10A",
          rollNumber: "101",
          parentName: "Mr. Doe",
          parentPhone: "0987654321",
          address: "123 Main St",
          dateOfBirth: "2008-05-15"
        });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/students/${id}`);
  },
  
  create: async (studentData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now(), ...studentData });
      }, 500);
    });
    
    // Actual API call:
    // return api.post("/students", studentData);
  },
  
  update: async (id, studentData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id, ...studentData });
      }, 500);
    });
    
    // Actual API call:
    // return api.put(`/students/${id}`, studentData);
  },
  
  delete: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
    
    // Actual API call:
    // return api.delete(`/students/${id}`);
  },
  
  getByClass: async (className) => {
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
    // return api.get(`/students/class/${className}`);
  },
};

export default studentService;