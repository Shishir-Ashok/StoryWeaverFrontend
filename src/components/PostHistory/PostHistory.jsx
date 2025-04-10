import "./HistoryTimeline.css";

export default function BlogHistory({ history }) {
  return (
    <div className="timeline-container">
      <h2 className="timeline-heading">View History</h2>
      <div className="timeline">
        {history.map((entry, index) => (
          <div key={index} className="timeline-item">
            <div className="left-content">
              <p className="timestamp">
                {new Date(entry.editedAt).toLocaleString()}
              </p>
            </div>
            <div className="timeline-dot"></div>
            <div className="right-content">
              <p className="user">{entry.editedBy?.username || "Unknown"}</p>
              <p className="action">Edited the post</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
