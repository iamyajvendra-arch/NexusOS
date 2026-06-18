function Sidebar({ activeWindow, setActiveWindow, result }) {
  const menuItems = [
    { id: "dashboard", icon: "🖥️", label: "Dashboard" },
    { id: "agents", icon: "🧠", label: "Agents" },
    { id: "market", icon: "📈", label: "Market" },
    { id: "competitor", icon: "🏢", label: "Competitor" },
    { id: "compliance", icon: "🔒", label: "Compliance" },
    { id: "trust", icon: "🛡️", label: "Trust" },
    { id: "actions", icon: "✅", label: "Actions" },
    { id: "tickets", icon: "🎫", label: "Tickets" },
    { id: "email", icon: "📧", label: "Email" },
  ];

  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => setActiveWindow("dashboard")}>
        N
      </button>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${activeWindow === item.id ? "active" : ""}`}
            onClick={() => setActiveWindow(item.id)}
            title={item.label}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>

      <div className="sidebar-status">
        <span className={result ? "status-dot online" : "status-dot"}></span>
        <small>{result ? "Analysis Ready" : "Idle"}</small>
      </div>
    </aside>
  );
}

export default Sidebar;