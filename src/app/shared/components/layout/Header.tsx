const Header = () => {
  const now = new Date();

  return (
    <header className="header">
      <div className="container">
        <div className="section-content">
          <h1 className="title">
            To<span className="sub-title">-Do</span>
          </h1>
          <p className="section-date">
            <span className="day-of-week">
              {now.toLocaleString('en-us', { weekday: 'long' })}
            </span>
            <span className="date">
              {now.toISOString().split('T')[0].replaceAll('-', '/')}
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
