import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import styles from "./Admin.module.css";

const API_BASE = "http://localhost:5000/api";

function Admin() {
  const navigate = useNavigate();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [limitDrafts, setLimitDrafts] = useState({}); // { uid: "5" }
  const [dataLoading, setDataLoading] = useState(false);

  // Upload tab state
  const [file, setFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(null);

  // ==========================
  // Access check
  // ==========================
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));

        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      } finally {
        setCheckingAccess(false);
      }
    });

    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
      loadHistory();
      loadPayments();
    }
  }, [isAdmin]);

  const getAuthHeaders = async () => {
    const token = await auth.currentUser.getIdToken();
    return { Authorization: `Bearer ${token}` };
  };

  const loadUsers = async () => {
    try {
      setDataLoading(true);
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API_BASE}/admin/users`, { headers });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load users.");
    } finally {
      setDataLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API_BASE}/admin/history`, { headers });
      setHistory(res.data.history || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load resume history.");
    }
  };

  const saveLimit = async (uid) => {
    const draft = limitDrafts[uid];
    if (draft === undefined || draft === "") return;

    try {
      const headers = await getAuthHeaders();
      await axios.patch(
        `${API_BASE}/admin/users/${uid}/limit`,
        { maxResume: Number(draft) },
        { headers }
      );
      await loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update limit.");
    }
  };

  const resetCount = async (uid) => {
    try {
      const headers = await getAuthHeaders();
      await axios.patch(
        `${API_BASE}/admin/users/${uid}/limit`,
        { resumeCount: 0 },
        { headers }
      );
      await loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to reset count.");
    }
  };

  const loadPayments = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await axios.get(`${API_BASE}/admin/payments`, { headers });
      setPayments(res.data.payments || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load payment requests.");
    }
  };

  const reviewPayment = async (id, status) => {
    const confirmMsg =
      status === "approved"
        ? "Approve this payment and upgrade the user to Premium?"
        : "Reject this payment request?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const headers = await getAuthHeaders();
      await axios.patch(
        `${API_BASE}/admin/payments/${id}/status`,
        { status },
        { headers }
      );
      await loadPayments();
      await loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update payment status.");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  };

  const handleAdminUpload = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    try {
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const token = await auth.currentUser.getIdToken();

      const response = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLastAnalysis(response.data.analysis);
      await loadHistory();

      alert("Resume analyzed successfully! (Admin uploads don't count toward any limit.)");
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error || "Resume upload failed.");
      } else {
        alert("Server not responding.");
      }
    } finally {
      setUploadLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });

  const filteredHistory = history.filter((h) => {
    const term = searchTerm.toLowerCase();
    return (
      h.ownerName?.toLowerCase().includes(term) ||
      h.ownerEmail?.toLowerCase().includes(term)
    );
  });

  const totalUsers = users.length;
  const totalResumes = history.length;
  const pendingPayments = payments.filter((p) => p.status === "pending").length;
  const avgScore = history.length
    ? Math.round(
        history.reduce((sum, h) => sum + (h.atsScore || 0), 0) / history.length
      )
    : 0;

  if (checkingAccess) {
    return (
      <div className={styles.loading}>
        <h2>Checking access...</h2>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.deniedBox}>
        <h2>🚫 Admins Only</h2>
        <p>You don't have permission to view this page.</p>
        <button className={styles.button} onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <p className={styles.subtitle}>
        Manage users, review all resume analyses, and upload without limits.
      </p>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <h2>{totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className={styles.statCard}>
          <h2>{totalResumes}</h2>
          <p>Resumes Analyzed</p>
        </div>
        <div className={styles.statCard}>
          <h2>{avgScore}%</h2>
          <p>Average ATS Score</p>
        </div>
        <div className={styles.statCard}>
          <h2>{pendingPayments}</h2>
          <p>Pending Payments</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={activeTab === "users" ? styles.tabButtonActive : styles.tabButton}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "history" ? styles.tabButtonActive : styles.tabButton}
          onClick={() => setActiveTab("history")}
        >
          All Resumes
        </button>
        <button
          className={activeTab === "upload" ? styles.tabButtonActive : styles.tabButton}
          onClick={() => setActiveTab("upload")}
        >
          Upload (Unlimited)
        </button>
        <button
          className={activeTab === "payments" ? styles.tabButtonActive : styles.tabButton}
          onClick={() => setActiveTab("payments")}
        >
          Payments {pendingPayments > 0 && `(${pendingPayments})`}
        </button>
      </div>

      {activeTab === "users" && (
        <div className={styles.card}>
          <input
            className={styles.searchInput}
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {dataLoading ? (
            <p>Loading users...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Usage</th>
                  <th>Set Limit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name || "—"}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={styles.badge}>{u.role || "user"}</span>
                    </td>
                    <td>
                      {u.resumeCount ?? 0} / {u.role === "admin" ? "∞" : u.maxResume}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        className={styles.limitInput}
                        placeholder={u.maxResume}
                        value={limitDrafts[u.id] ?? ""}
                        onChange={(e) =>
                          setLimitDrafts({ ...limitDrafts, [u.id]: e.target.value })
                        }
                      />
                      <button className={styles.smallBtn} onClick={() => saveLimit(u.id)}>
                        Save
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.smallBtnOutline}
                        onClick={() => resetCount(u.id)}
                      >
                        Reset Count
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className={styles.card}>
          <input
            className={styles.searchInput}
            placeholder="Search by user name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>ATS Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((h) => (
                <tr key={h.id}>
                  <td>{h.ownerName}</td>
                  <td>{h.ownerEmail}</td>
                  <td>{h.atsScore ?? "—"}%</td>
                  <td>
                    {h.createdAt?._seconds
                      ? new Date(h.createdAt._seconds * 1000).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}

              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan="4">No resume analyses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "upload" && (
        <div className={styles.card}>
          <h3>Analyze Any Resume (No Limit)</h3>
          <p>Uploads made from this admin account never count toward the resume cap.</p>

          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />

          {file && (
            <p style={{ marginTop: "10px" }}>
              <strong>Selected:</strong> {file.name} (
              {(file.size / 1024).toFixed(2)} KB)
            </p>
          )}

          <button
            className={styles.button}
            onClick={handleAdminUpload}
            disabled={uploadLoading}
          >
            {uploadLoading ? "Analyzing Resume..." : "Analyze Resume"}
          </button>

          {lastAnalysis && (
            <div style={{ marginTop: "20px" }}>
              <h3>Last Result — ATS Score: {lastAnalysis.atsScore}%</h3>
              <p>
                <strong>Strengths:</strong>{" "}
                {lastAnalysis.strengths?.join(", ") || "—"}
              </p>
              <p>
                <strong>Weaknesses:</strong>{" "}
                {lastAnalysis.weaknesses?.join(", ") || "—"}
              </p>
            </div>
          )}
        </div>
      )}
      {activeTab === "payments" && (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Screenshot</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>
                    <a
                      href={p.screenshotUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.smallBtnOutline}
                      style={{ textDecoration: "none", display: "inline-block" }}
                    >
                      View
                    </a>
                  </td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{
                        background:
                          p.status === "approved"
                            ? "#dcfce7"
                            : p.status === "rejected"
                            ? "#fee2e2"
                            : "#f3ecff",
                        color:
                          p.status === "approved"
                            ? "#16a34a"
                            : p.status === "rejected"
                            ? "#dc2626"
                            : "#7c3aed",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.submittedAt?._seconds
                      ? new Date(p.submittedAt._seconds * 1000).toLocaleString()
                      : "—"}
                  </td>
                  <td>
                    {p.status === "pending" ? (
                      <>
                        <button
                          className={styles.smallBtn}
                          onClick={() => reviewPayment(p.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className={styles.smallBtnOutline}
                          onClick={() => reviewPayment(p.id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td colSpan="6">No payment requests yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
