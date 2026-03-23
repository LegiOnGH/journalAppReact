import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function ViewEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState({
    title: "",
    content: "",
    sentiment: "HAPPY"
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await apiClient.get(`/journal/get/${id}`);
        console.log("Entry:", res.data);
        setEntry(res.data);
      } catch (err) {
        console.error("Error fetching entry:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

const handleDelete = async () => {
  try {
    await apiClient.delete(`/journal/delete/${id}`);
    navigate("/dashboard");
  } catch (err) {
    console.error("Error deleting entry:", err);
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    await apiClient.put(`/journal/update/${id}`, entry);
    navigate("/dashboard");
  } catch (err) {
    console.error("Error updating entry:", err);
  }
};

  return (
    <div>
      <h2>View Entry</h2>

      {loading ? (
        <p>Loading...</p>
      ) : !entry ? (
        <p>Entry not found</p>
      ) : editMode ? (

  <form onSubmit={handleUpdate}>
    <input
      value={entry.title}
      onChange={(e) =>
        setEntry({ ...entry, title: e.target.value })
      }
    />
    <br /><br />
    <textarea
      value={entry.content}
      onChange={(e) =>
        setEntry({ ...entry, content: e.target.value })
      }
    />
    <br /><br />
    <select
      value={entry.sentiment}
      onChange={(e) =>
        setEntry({ ...entry, sentiment: e.target.value })
      }
    >
      <option value="HAPPY">😊</option>
      <option value="SAD">😢</option>
      <option value="ANGRY">😡</option>
      <option value="ANXIOUS">😰</option>
    </select>
    <br /><br />
    <button type="submit">Update</button>
  </form>

) : (

  <div>
    <h3>{entry.title}</h3>
    <p>{entry.content}</p>
    <p>{entry.date}</p>
    <button onClick={() => setEditMode(true)}>
      Edit
    </button>
    {"  "}
    <button onClick={handleDelete} style={{ color: "red" }}>
      Delete Entry
    </button>
  </div>

)}
</div>
  );
}

export default ViewEntryPage;