const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

const validateRollNumber = (rollNumber) => {
  return rollNumber && rollNumber.trim().length > 0;
};

const validateGradeScore = (score) => {
  return score >= 0 && score <= 100;
};

module.exports = {
  validateEmail,
  validatePhone,
  validateName,
  validateRollNumber,
  validateGradeScore,
};