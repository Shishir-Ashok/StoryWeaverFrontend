import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../HomePage/Header";
import "./HistoryPage.css";

export default function HistoryPage() {
  const { id } = useParams();

  const [historyData, setHistoryData] = useState(null);
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/history/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch history data");
        }
        const data = await response.json();
        setHistoryData(data);
        console.log("History Data:", data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  if (!historyData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {historyData.length === 0 ? (
        <div className="table-container">
          <h1>No history available for this blog.</h1>
        </div>
      ) : (
        <div className="table-container">
          <table className="history-table">
            <caption>
              <h1>{historyData[0].blog.title}</h1>
            </caption>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.user.username}</td>
                  <td>{entry.action}</td>
                  <td>{new Date(entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
