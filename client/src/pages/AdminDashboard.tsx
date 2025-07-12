import AdminPanel from "../components/admin/AdminPanel";

const AdminDashboard = () => {
  return <AdminPanel />;
};
const handleLogout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin"; // redirect to login
};
<button onClick={handleLogout}>Logout</button>

export default AdminDashboard;