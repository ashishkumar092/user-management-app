import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  // Fetch users (READ)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fetch users error:", err));
  }, []);

  // Shared submit handler: creates or updates depending on editId
  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return alert("Please enter name & email.");

    if (editId) {
      // UPDATE (PUT)
      fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((updated) => {
          setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, ...updated } : u)));
          resetForm();
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // CREATE (POST)
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((newUser) => {
          setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
          resetForm();
        })
        .catch((err) => console.error("Create error:", err));
    }
  };

  // When Edit clicked, populate the single form
  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name || "", email: user.email || "" });
    // Optionally scroll into view:
    document.getElementById("user-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Delete user
  const handleDelete = (id) => {
    if (!confirm("Delete this user?")) return;
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" })
      .then(() => setUsers((prev) => prev.filter((u) => u.id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  // Cancel editing / reset form
  const resetForm = () => {
    setEditId(null);
    setForm({ name: "", email: "" });
  };

  return (
    <div className="app-container">
      <h1>User CRUD App</h1>

      {/* Single Shared Form */}
      <div id="user-form" className="form-box">
        <h3>{editId ? "Edit User" : "Create New User"}</h3>

        <div className="form-row">
          <input
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-actions">
          <button className="primary-btn" onClick={handleSubmit}>
            {editId ? "Update" : "Add User"}
          </button>

          {editId ? (
            <button className="secondary-btn" onClick={resetForm}>
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      {/* User Cards */}
      <div className="card-container">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>

            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEdit(user)}>
                Edit
              </button>

              <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

