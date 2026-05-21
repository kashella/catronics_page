// Catronics Lab — Nav bar

function Nav({ onCtaClick }) {
  useT();
  return (
    <nav className="nav">
      <div className="logo">
        <div className="mark" aria-hidden="true">
          <img src={assetUrl("catWhite", "../assets/catronics-cat-white.png")} alt="" />
        </div>
        <div className="wordmark">
          <div className="display-wide" style={{ fontSize: 16, lineHeight: 1 }}>
            CATRONICS<span style={{ color: "var(--primary)" }}>·</span>LAB
          </div>
          <div className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.22em", marginTop: 2 }}>
            {t("brand.tagline")}
          </div>
        </div>
      </div>
      <div className="links">
        <a href="#servicios">{t("nav.servicios")}</a>
        <a href="#proceso">{t("nav.proceso")}</a>
        <a href="#equipo">{t("nav.equipo")}</a>
        <a href="#contacto">{t("nav.contacto")}</a>
        <a href="../tools/index.html" className="nav-tools">
          <span className="nav-tools-glyph">⏚</span>
          {t("nav.herramientas")}
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <LangToggle compact={true} />
        <button className="cta" onClick={onCtaClick}>
          <span className="dot" style={{ background: "#fff", boxShadow: "0 0 10px #fff" }}></span>
          {t("nav.cta")}
        </button>
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });
