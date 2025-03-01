import jwtDecode from "jwt-decode";

export const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true; // No token, so consider it expired

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        console.error("Invalid token format:", error);
        return true;
    }
};
