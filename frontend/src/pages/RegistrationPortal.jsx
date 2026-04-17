import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import DatePicker from "../components/DatePicker";
import FileUpload from "../components/FileUpload";
import Alert from "../components/Alert";
import { useAuth } from "../contexts/AuthContext";

const RegistrationPortal = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    previousSchool: "",
    gradeApplying: "",
    password: "",
    confirmPassword: "",
    documents: null,
  });

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const grades = [
    { value: "9A", label: "Class 9A" },
    { value: "9B", label: "Class 9B" },
    { value: "10A", label: "Class 10A" },
    { value: "10B", label: "Class 10B" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, documents: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    }

    setLoading(true);
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

    const result = await register(fullName, formData.email, formData.password);

    if (result.success) {
      setAlert({
        type: "success",
        message: "Registration successful! Redirecting to your dashboard...",
      });
      setTimeout(() => navigate("/dashboard"), 1200);
    } else {
      setAlert({
        type: "error",
        message: result.error || "Failed to register",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Student Registration Portal
          </h1>
          <p className="text-gray-600 mt-2">
            Please fill in all required information
          </p>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <DatePicker
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <Select
              label="Gender"
              name="gender"
              options={genders}
              value={formData.gender}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="Parent Name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
            />
            <Input
              label="Parent Phone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              required
            />
            <Input
              label="Previous School"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
            />
            <Select
              label="Applying for Grade"
              name="gradeApplying"
              options={grades}
              value={formData.gradeApplying}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <FileUpload
            label="Upload Documents (Birth Certificate, Report Card)"
            name="documents"
            onFileSelect={handleFileSelect}
            accept=".pdf,.jpg,.png"
            maxSize={5}
            required
          />

          <div className="flex gap-3 mt-6">
            <Button type="submit" loading={loading}>
              Submit Registration
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationPortal;
