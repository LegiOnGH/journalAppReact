import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function CreateEntryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState("HAPPY");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/journal/createEntry", {
        title,
        content,
        sentiment
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating entry:", err);
    }
  };

  return (
    <div>
      <h2>Create Entry</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
        >
          <option value="HAPPY">Happy 😊</option>
          <option value="SAD">Sad 😢</option>
          <option value="ANGRY">Angry 😡</option>
          <option value="ANXIOUS">Anxious 😰</option>
        </select>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateEntryPage;