function OSWindow({ title, icon, items, empty }) {
  return (
    <section className="os-window">
      <div className="os-window-header">
        <div>
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>

        <strong>
          {icon} {title}
        </strong>
      </div>

      <div className="os-window-body">
        {items && items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {typeof item === "string" ? item : JSON.stringify(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p>{empty}</p>
        )}
      </div>
    </section>
  );
}

export default OSWindow;