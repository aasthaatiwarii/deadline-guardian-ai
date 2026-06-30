function Dashboard({
  totalTasks,
  highPriorityTasks,
  dueSoonTasks,
  productivityScore,
  completedTasks,
  pendingTasks,
}) {
 const cardStyle = {
  backgroundColor: "#0f172a",
  padding: "25px",
  borderRadius: "16px",
  minWidth: "180px",
  textAlign: "center",
  border: "1px solid #334155",
  boxShadow: "0 10px 30px rgba(0,0,0,.4)",
};
   
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      <div style={cardStyle}>
        <h3>📋 Total Tasks</h3>
        <h1>{totalTasks}</h1>
      </div>

      <div style={cardStyle}>
        <h3>🔥 High Priority</h3>
        <h1>{highPriorityTasks}</h1>
      </div>

      <div style={cardStyle}>
        <h3>⚠️ Due Soon</h3>
        <h1>{dueSoonTasks}</h1>
      </div>

      <div style={cardStyle}>
        <h3>📊 Productivity</h3>

        <h1>{productivityScore}%</h1>

        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#334155",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${productivityScore}%`,
              height: "100%",
              background: "#22c55e",
            }}
          />
        </div>
      </div>

      <div style={cardStyle}>
        <h3>✅ Completed</h3>
        <h1>{completedTasks}</h1>
      </div>

      <div style={cardStyle}>
        <h3>📝 Pending</h3>
        <h1>{pendingTasks}</h1>
      </div>
    </div>
  );
}

export default Dashboard;