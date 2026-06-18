function Topbar({ loading, usedModel }) {
  const time = new Date().toLocaleTimeString();

  return (
    <header className="topbar">
      <div>
        <strong>NexusOS Enterprise</strong>
        <span className="topbar-subtitle">AI Intelligence Operating System</span>
      </div>

      <div className="topbar-right">
        <span className={loading ? "pulse active" : "pulse"}></span>
        <span>{loading ? "Agents Running" : "System Ready"}</span>
        <span>{usedModel || "Hybrid AI"}</span>
        <span>{time}</span>
      </div>
    </header>
  );
}

export default Topbar;