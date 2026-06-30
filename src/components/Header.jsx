function Header() {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "40px", 
        cursor: "pointer",
        transition: "0.3s",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        🚀 Deadline Guardian AI
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "18px", 
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Smart task prioritization, deadline tracking, and AI-powered productivity guidance. 
        <p
      style={{
       color: "#60a5fa",
       marginTop: "10px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s",
      }}
>
  Built using React + Gemini AI
</p>
      </p>
    </div>
  );
}

export default Header;