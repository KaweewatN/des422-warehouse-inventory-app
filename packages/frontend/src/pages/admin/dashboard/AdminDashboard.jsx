import apiService from "../../../service/apiService";

export default function AdminDashboard() {
  const fetchData = async () => {
    try {
      const data = await apiService.get("/user/info");
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  fetchData();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
}
