import { useState } from "react";
import "./App.css";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [theme, setTheme] = useState("dark");
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activeApp, setActiveApp] = useState("command");
  const [openApps, setOpenApps] = useState(["command", "dashboard"]);

  const apps = {
    command: "Nexus Command",
    dashboard: "Dashboard",
    agents: "Agent Kernel",
    market: "Market",
    compliance: "Compliance",
    trust: "Trust",
    actions: "Actions",
    mail: "Mail",
    report: "Report",
    settings: "Settings",
  };

  const openApp = (app) => {
    if (!openApps.includes(app)) setOpenApps([...openApps, app]);
    setActiveApp(app);
  };

  const closeApp = (app) => {
    const updated = openApps.filter((item) => item !== app);
    setOpenApps(updated);
    setActiveApp(updated[updated.length - 1] || "");
  };

  const minimizeApp = () => setActiveApp("");

  const runAnalysis = async () => {
    if (!content.trim()) {
      alert("Paste intelligence data first.");
      return;
    }

    setLoading(true);
    openApp("agents");

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, content }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || "Analysis failed");
      }

      setResult(data);
      openApp("dashboard");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  if (!signedIn) {
    return (
      <div className="signin-screen">
        <div className="signin-card">
          <div className="user-avatar">JO</div>
          <h1>JOyBOY</h1>
          <p>NexusOS Enterprise</p>

          <input
            type="password"
            placeholder="Enter PIN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSignedIn(true);
            }}
          />

          <button onClick={() => setSignedIn(true)}>Sign In</button>
          <small>Hint: click Sign In to continue</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`macos ${theme}`}>
      <div className="menu-bar">
        <div className="menu-left">
          <button onClick={() => openApp("command")}> NexusOS</button>
          <button onClick={() => openApp("command")}>Finder</button>
          <button onClick={() => alert("File menu opened")}>File</button>
          <button onClick={() => alert("Edit menu opened")}>Edit</button>
          <button onClick={() => openApp("dashboard")}>View</button>
          <button onClick={() => openApp("settings")}>Window</button>
          <button onClick={() => alert("Use dock icons to open apps and Run NexusOS to analyze data.")}>
            Help
          </button>
        </div>

        <div className="menu-right">
          <button className="theme-btn" onClick={() => setTheme("dark")}>Dark</button>
          <button className="theme-btn" onClick={() => setTheme("cyber")}>Cyber</button>
          <button className="theme-btn" onClick={() => setTheme("sunset")}>Sunset</button>
          <span>{loading ? "Agents Running" : "System Ready"}</span>
          <span>{result?.usedModel || "Hybrid AI"}</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <main className="desktop">
        {openApps.includes("command") && activeApp === "command" && (
          <Window title="Nexus Command" close={() => closeApp("command")} minimize={minimizeApp}>
            <div className="hero-section">
              <h1 className="hero-title">NexusOS</h1>
              <p className="hero-subtitle">AI Operating System for enterprise intelligence.</p>
            </div>

            <input
              placeholder="Company name e.g. Tesla, OpenAI, Microsoft"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <textarea
              placeholder="Paste competitor news, hiring trends, regulation updates, social media claims, or market signals..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button className="primary" onClick={runAnalysis} disabled={loading}>
              {loading ? "Running AI Agents..." : "Run NexusOS Agents"}
            </button>
          </Window>
        )}

        {openApps.includes("dashboard") && activeApp === "dashboard" && (
          <Window title="Dashboard" close={() => closeApp("dashboard")} minimize={minimizeApp}>
            <div className="stats">
              <Card title="Risk Score" value={result ? `${result.riskScore}/100` : "0/100"} />
              <Card title="Opportunity" value={result ? `${result.opportunityScore}/100` : "0/100"} />
              <Card title="Urgency" value={result?.urgencyLevel || "Idle"} />
            </div>

            <div className="chart">
              {[45, 70, 55, 88, 63, 92, 76, 60].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }}></span>
              ))}
            </div>

            <Panel title="Executive Summary" text={result?.summary || "Run analysis first."} />
            <Panel title="Final Decision" text={result?.executiveDecision || "No decision generated yet."} />
          </Window>
        )}

        {openApps.includes("agents") && activeApp === "agents" && (
          <Window title="Agent Kernel" close={() => closeApp("agents")} minimize={minimizeApp}>
            <Agent name="Market Agent" status={loading ? "Running" : "Online"} />
            <Agent name="Competitor Agent" status={loading ? "Running" : "Online"} />
            <Agent name="Compliance Agent" status={loading ? "Running" : "Online"} />
            <Agent name="Trust Agent" status={loading ? "Running" : "Online"} />
            <Agent name="Strategy Agent" status={loading ? "Running" : "Online"} />
          </Window>
        )}

        {openApps.includes("market") && activeApp === "market" && (
          <Window title="Market Intelligence" close={() => closeApp("market")} minimize={minimizeApp}>
            <List items={result?.marketSignals} empty="No market signals yet." />
          </Window>
        )}

        {openApps.includes("compliance") && activeApp === "compliance" && (
          <Window title="Compliance Center" close={() => closeApp("compliance")} minimize={minimizeApp}>
            <List items={result?.complianceRisks} empty="No compliance risks yet." />
          </Window>
        )}

        {openApps.includes("trust") && activeApp === "trust" && (
          <Window title="Trust Investigation" close={() => closeApp("trust")} minimize={minimizeApp}>
            <List items={result?.misinformationRisks} empty="No trust risks yet." />
          </Window>
        )}

        {openApps.includes("actions") && activeApp === "actions" && (
          <Window title="Action Center" close={() => closeApp("actions")} minimize={minimizeApp}>
            <h2>Recommended Actions</h2>
            <List items={result?.recommendedActions} empty="No actions yet." />

            <h2>Auto Tickets</h2>
            <List items={result?.autoGeneratedTickets} empty="No tickets yet." />
          </Window>
        )}

        {openApps.includes("mail") && activeApp === "mail" && (
          <Window title="Mail" close={() => closeApp("mail")} minimize={minimizeApp}>
            <Panel
              title={result?.emailDraft?.subject || "No Email Draft"}
              text={result?.emailDraft?.body || "Run analysis to generate email."}
            />

            <button
              className="primary"
              onClick={() => {
                const subject = result?.emailDraft?.subject || "NexusOS Intelligence Alert";
                const body =
                  result?.emailDraft?.body ||
                  `
NexusOS Executive Report

Risk Score: ${result?.riskScore || "N/A"}
Opportunity Score: ${result?.opportunityScore || "N/A"}

Summary:
${result?.summary || "No summary available"}

Decision:
${result?.executiveDecision || "No decision available"}
`;

                const gmailUrl =
                  "https://mail.google.com/mail/?view=cm&fs=1" +
                  "&su=" +
                  encodeURIComponent(subject) +
                  "&body=" +
                  encodeURIComponent(body);

                window.open(gmailUrl, "_blank");
              }}
            >
              Open in Gmail
            </button>
          </Window>
        )}

        {openApps.includes("report") && activeApp === "report" && (
          <Window title="Executive Report" close={() => closeApp("report")} minimize={minimizeApp}>
            <div id="report-section" className="report">
              <h2>NexusOS Intelligence Report</h2>

              <p><b>Company:</b> {company || "N/A"}</p>
              <p><b>Risk Score:</b> {result?.riskScore || "N/A"}</p>
              <p><b>Opportunity Score:</b> {result?.opportunityScore || "N/A"}</p>
              <p><b>Urgency:</b> {result?.urgencyLevel || "N/A"}</p>

              <h3>Executive Summary</h3>
              <p>{result?.summary || "Run analysis first."}</p>

              <h3>Recommended Actions</h3>
              <ul>
                {result?.recommendedActions?.length ? (
                  result.recommendedActions.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>No actions generated yet.</li>
                )}
              </ul>

              <h3>Final Decision</h3>
              <p>{result?.executiveDecision || "No decision generated yet."}</p>
            </div>

            <button
              className="primary"
              onClick={() => {
                if (!result) {
                  alert("Run NexusOS analysis first.");
                  return;
                }
                window.print();
              }}
            >
              🖨️ Print / Save as PDF
            </button>
          </Window>
        )}

        {openApps.includes("settings") && activeApp === "settings" && (
          <Window title="Settings" close={() => closeApp("settings")} minimize={minimizeApp}>
            <Panel title="AI Model" text={result?.usedModel || "Gemini + DeepSeek fallback enabled."} />
            <Panel title="Backend" text="Connected to http://localhost:5000/api/analyze" />
            <button className="primary" onClick={() => alert("Settings saved")}>
              Save Settings
            </button>
          </Window>
        )}
      </main>

      <div className="dock">
        {Object.entries(apps).map(([key, name]) => (
          <button key={key} className="dock-icon" onClick={() => openApp(key)} title={name}>
            <span>{getIcon(key)}</span>
            {openApps.includes(key) && <i></i>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Window({ title, children, close, minimize }) {
  return (
    <section className="window">
      <div className="window-head">
        <div className="traffic">
          <button className="red" onClick={close}></button>
          <button className="yellow" onClick={minimize}></button>
          <button className="green" onClick={() => alert("Fullscreen mode coming soon")}></button>
        </div>

        <b>{title}</b>
      </div>

      <div className="window-body">{children}</div>
    </section>
  );
}

function getIcon(app) {
  const icons = {
    command: "⌘",
    dashboard: "📊",
    agents: "🤖",
    market: "📈",
    compliance: "🔒",
    trust: "🛡️",
    actions: "⚡",
    mail: "✉️",
    report: "🖨️",
    settings: "⚙️",
  };

  return icons[app] || "▣";
}

function Card({ title, value }) {
  return (
    <div className="card">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function Panel({ title, text }) {
  return (
    <div className="panel">
      <h2 className="panel-title">{title}</h2>
      <p className="panel-text">{text}</p>
    </div>
  );
}

function Agent({ name, status }) {
  return (
    <div className="agent">
      <span></span>
      <p>{name}</p>
      <b>{status}</b>
    </div>
  );
}

function List({ items, empty }) {
  return items?.length ? (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === "string" ? item : JSON.stringify(item)}
        </li>
      ))}
    </ul>
  ) : (
    <p className="muted">{empty}</p>
  );
}

export default App;