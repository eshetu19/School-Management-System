import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert from "../components/Alert";
import FileUpload from "../components/FileUpload";
import StudentAvatar from "../components/StudentAvatar";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePhoto: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
      profilePhoto: user?.profilePhoto || "",
      phone: user?.phone || "1234567890",
      address: user?.address || "123 School Street",
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          profilePhoto: formData.profilePhoto,
        };
        updateProfile(updatedUser);
      }
      setAlert({ type: "success", message: "Profile updated successfully" });
      setIsEditing(false);
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }, 500);
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setAlert({ type: "error", message: "New passwords do not match" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setAlert({ type: "success", message: "Password changed successfully" });
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }, 500);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <StudentAvatar
              name={user?.name || "User"}
              photoUrl={formData.profilePhoto || user?.profilePhoto}
              size="xl"
            />
          </div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-500 capitalize">{user?.role}</p>
          <p className="text-sm text-gray-400 mt-2">Member since 2024</p>
          <div className="mt-4">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="secondary"
              size="sm"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </Card>

        {/* Profile Information */}
        <Card title="Profile Information" className="lg:col-span-2">
          {isEditing ? (
            <div className="space-y-4">
              <FileUpload
                label="Profile Photo"
                name="profilePhoto"
                accept="image/*"
                maxSize={3}
                onFileSelect={(file) => {
                  if (!file) {
                    setFormData((prev) => ({ ...prev, profilePhoto: "" }));
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData((prev) => ({
                      ...prev,
                      profilePhoto: reader.result,
                    }));
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
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
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <div className="flex gap-3">
                <Button onClick={handleUpdateProfile} loading={loading}>
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="secondary">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p>
                <strong>Full Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                <span className="capitalize">{user?.role}</span>
              </p>
            </div>
          )}
        </Card>

        {/* Change Password */}
        <Card title="Change Password" className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <Button onClick={handleChangePassword} variant="secondary">
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
