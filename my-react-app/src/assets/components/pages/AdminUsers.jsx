import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const styles = {
    container: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      padding: "20px",
      borderRadius: "8px",
      fontFamily: "'Segoe UI', sans-serif",
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "20px",
      color: "#ffcc00",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#2a2a2a",
      borderRadius: "8px",
      overflow: "hidden",
    },
    th: {
      backgroundColor: "#333",
      color: "#ffcc00",
      padding: "12px",
      textAlign: "left",
      fontWeight: "bold",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #444",
    },
    button: {
      backgroundColor: "transparent",
      border: "none",
      color: "#ff5555",
      cursor: "pointer",
      textDecoration: "underline",
      transition: "color 0.2s",
    },
    buttonHover: {
      color: "#ff7777",
    },
    rowHover: {
      backgroundColor: "#3a3a3a",
    },
  };

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Пользователи</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = styles.rowHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>{u.role}</td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onMouseEnter={(e) =>
                    (e.target.style.color = styles.buttonHover.color)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = styles.button.color)
                  }
                  onClick={() => handleDelete(u.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
