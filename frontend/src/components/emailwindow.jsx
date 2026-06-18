function EmailWindow({ emailDraft }) {
  if (!emailDraft) {
    return (
      <section className="os-window">
        <div className="os-window-header">
          <div>
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>

          <strong>📧 Communication Center</strong>
        </div>

        <div className="os-window-body">
          <h2>No Email Generated</h2>
          <p>
            Run NexusOS analysis first to generate executive communication drafts.
          </p>
        </div>
      </section>
    );
  }

  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    emailDraft.subject || "NexusOS Alert"
  )}&body=${encodeURIComponent(emailDraft.body || "")}`;

  return (
    <section className="os-window">
      <div className="os-window-header">
        <div>
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>

        <strong>📧 Executive Communication Center</strong>
      </div>

      <div className="os-window-body">
        <div className="email-card">
          <h2>Subject</h2>
          <div className="email-subject">
            {emailDraft.subject || "NexusOS Intelligence Alert"}
          </div>

          <h2>Email Body</h2>

          <div className="email-body">
            {emailDraft.body || "No content generated."}
          </div>

          <div className="email-actions">
            <a href={mailtoLink}>
              <button className="send-btn">
                🚀 Open In Email Client
              </button>
            </a>

            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${emailDraft.subject}\n\n${emailDraft.body}`
                );

                alert("Email copied to clipboard");
              }}
            >
              📋 Copy Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailWindow;