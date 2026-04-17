import api from "./api";

export const registrationService = {
  submit: async (registrationData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Registration submitted successfully", id: Date.now() });
      }, 1500);
    });
    
    // Actual API call:
    // const formData = new FormData();
    // Object.keys(registrationData).forEach(key => {
    //   formData.append(key, registrationData[key]);
    // });
    // return api.post("/registrations", formData, {
    //   headers: { "Content-Type": "multipart/form-data" }
    // });
  },
  
  getAll: async (status = null) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, firstName: "Alice", lastName: "Brown", email: "alice@email.com", phone: "1234567890", parentName: "Mr. Brown", gradeApplying: "9A", status: "pending", submittedDate: "2025-03-01" },
          { id: 2, firstName: "Bob", lastName: "Wilson", email: "bob@email.com", phone: "1234567891", parentName: "Mrs. Wilson", gradeApplying: "10B", status: "pending", submittedDate: "2025-03-02" }
        ]);
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/registrations${status ? `?status=${status}` : ''}`);
  },
  
  getById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: parseInt(id),
          firstName: "Alice",
          lastName: "Brown",
          email: "alice@email.com",
          phone: "1234567890",
          parentName: "Mr. Brown",
          parentPhone: "0987654321",
          gradeApplying: "9A",
          previousSchool: "ABC School",
          address: "456 Oak St",
          status: "pending",
          submittedDate: "2025-03-01"
        });
      }, 500);
    });
    
    // Actual API call:
    // return api.get(`/registrations/${id}`);
  },
  
  approve: async (id, studentData = null) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Registration approved successfully" });
      }, 500);
    });
    
    // Actual API call:
    // return api.post(`/registrations/${id}/approve`, studentData);
  },
  
  reject: async (id, reason = null) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Registration rejected" });
      }, 500);
    });
    
    // Actual API call:
    // return api.post(`/registrations/${id}/reject`, { reason });
  },
};

export default registrationService;