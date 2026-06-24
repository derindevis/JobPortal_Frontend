export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return "user";
  
  try {
    const payload = token.split(".")[1];
    if (!payload) return "user";
    
    const decoded = JSON.parse(atob(payload));
    return decoded.role || "user";
  } catch (error) {
    console.error("Failed to parse JWT token:", error);
    // If token is invalid, it's safer to clear it
    localStorage.removeItem("token");
    return "user";
  }
};
