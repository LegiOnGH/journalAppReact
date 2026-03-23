import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function DashboardPage() {
    const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await apiClient.get("/journal/getAll");
        console.log("Entries:", res.data);
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        entries.map((entry, index) => (
          <div key={index}
          onClick={() => navigate(`/journal/${entry.id}`)}
          >
            <p style = {{cursor: "pointer"}}>{entry.title || "No Title"}
                {entry.sentiment === "HAPPY" && "😊"}
                {entry.sentiment ==="SAD" && "😢"}
                {entry.sentiment === "ANGRY" && "😡"}
                {entry.sentiment === "ANXIOUS" && "😰"}
                </p>
          </div>
        ))
      )}
    </div>
  );
}

export default DashboardPage;