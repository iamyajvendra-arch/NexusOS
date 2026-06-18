function AgentPanel({ loading }) {
  const agents = [
    {
      name: "Market Agent",
      icon: "📈",
      status: loading ? "Analyzing market signals..." : "Ready",
    },
    {
      name: "Competitor Agent",
      icon: "🏢",
      status: loading ? "Scanning competitors..." : "Ready",
    },
    {
      name: "Compliance Agent",
      icon: "🔒",
      status: loading ? "Checking regulations..." : "Ready",
    },
    {
      name: "Trust Agent",
      icon: "🛡️",
      status: loading ? "Detecting misinformation..." : "Ready",
    },
    {
      name: "Strategy Agent",
      icon: "🧠",
      status: loading ? "Generating executive decision..." : "Ready",
    },
  ];

  return (
    <section className="agent-container">
      <div className="panel wide">
        <h2>AI Agent Kernel</h2>
        <p>
          NexusOS coordinates multiple specialized AI agents that work
          together to analyze risks, opportunities, competitors, compliance,
          and trust signals.
        </p>
      </div>

      <div className="agent-grid">
        {agents.map((agent, index) => (
          <div className="agent-card" key={index}>
            <div className="agent-icon">{agent.icon}</div>

            <h3>{agent.name}</h3>

            <div className="agent-status">
              <span
                className={`status-indicator ${
                  loading ? "active-status" : "ready-status"
                }`}
              ></span>

              <p>{agent.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="panel wide">
        <h2>Agent Communication Bus</h2>

        <ul>
          <li>📈 Market Agent → Opportunity Detection</li>
          <li>🏢 Competitor Agent → Strategy Mapping</li>
          <li>🔒 Compliance Agent → Regulatory Monitoring</li>
          <li>🛡️ Trust Agent → Misinformation Detection</li>
          <li>🧠 Strategy Agent → Executive Decisions</li>
        </ul>
      </div>
    </section>
  );
}

export default AgentPanel;