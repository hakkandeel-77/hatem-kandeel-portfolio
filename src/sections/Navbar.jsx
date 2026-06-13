function Navbar({ lang, setLang, t }) {
  const navItems = [
    { id: 'about', label: t.navbar.about },
    { id: 'experience', label: t.navbar.experience },
    { id: 'skills', label: t.navbar.skills },
    { id: 'certifications', label: t.navbar.certifications },
    { id: 'projects', label: t.navbar.projects },
    { id: 'contact', label: t.navbar.contact },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(10,15,46,0.95)',
        borderBottom: '1px solid #C9A84C',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxSizing: 'border-box',
      }}
    >
      <img
        src={process.env.PUBLIC_URL + '/images/logo.png'}
        alt="HK Logo"
        style={{ height: '50px', width: 'auto' }}
      />

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #C9A84C',
            color: '#C9A84C',
            padding: '6px 15px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '700',
          }}
        >
          {lang === 'en' ? 'AR عربية' : 'EN English'}
        </button>

        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '14px',
              letterSpacing: '1px',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.color = '#C9A84C')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;