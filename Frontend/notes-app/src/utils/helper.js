// src/utils/helper.js

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const names = name.trim().split(" ");
  const initials = names.map((n) => n[0].toUpperCase()).join("");
  return initials;
}