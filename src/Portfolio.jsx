import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS, FILTERS } from './data'

function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    }, 0);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [dep]);
}

// Solo para proyectos SIN landing propia (placeholders internos)
function navigateInternal(navigate, project, cardEl) {
  if (cardEl) cardEl.style.viewTransitionName = 'active-proj';
  const go = () => navigate(`/proyecto/${project.id}`);
  if (document.startViewTransition) {
    const t = document.startViewTransition(go);
    t.finished.finally(() => {
      if (cardEl) cardEl.style.viewTransitionName = '';
    });
  } else {
    go();
  }
}

const TILE_URL = 'krezium/assets/krezium-tile.svg';

function KreziumCard() {
  const tileImg = `url('${TILE_URL}'), url('${TILE_URL}')`;
  return (
    <a href="krezium/" className="krezium-card">
      {/* left accent rule — blanco en vez de ámbar */}
      <div className="krezium-rule" />
      {/* patrón brickwork sutil en esquina derecha */}
      <div className="krezium-pattern" aria-hidden="true">
        <div className="krezium-pattern-inner" style={{ backgroundImage: tileImg }} />
      </div>
      <div className="krezium-body">
        <div className="krezium-left">
          {/* badge estilo Krezium */}
          <div className="krezium-badge">
            <span className="krezium-badge-dot" />
            Proyecto destacado
          </div>
          {/* logo en lugar de título de texto */}
          <img src="krezium/assets/KREZIUM_COMP.svg" alt="Krezium" className="krezium-logo" />
          <p className="krezium-sub">
            App Android para llevar créditos y tarjetas sin internet. Sin cuenta, sin registro, todo se guarda local.
          </p>
          <div className="krezium-tags">
            <span className="krezium-tag-pill">Mobile</span>
            {['Flutter', 'Dart', 'Android'].map(t => (
              <span className="krezium-tag-tech" key={t}>{t}</span>
            ))}
          </div>
          <div className="krezium-divider" />
          <div className="krezium-stats">
            <div className="krezium-stat">
              <span className="krezium-stat-n">Gratis</span>
              <span className="krezium-stat-l">para siempre</span>
            </div>
            <div className="krezium-stat">
              <span className="krezium-stat-n">Sin registro</span>
              <span className="krezium-stat-l">ni cuenta</span>
            </div>
            <div className="krezium-stat">
              <span className="krezium-stat-n">100%</span>
              <span className="krezium-stat-l">offline</span>
            </div>
          </div>
        </div>
        <div className="krezium-arr">↗</div>
      </div>
      <div className="krezium-hover-link">Ver proyecto →</div>
    </a>
  );
}

function TagCat({ p }) {
  return (
    <span className="tag" style={{
      background: `color-mix(in srgb,${p.acc} 12%,var(--adim))`,
      color: p.acc,
      border: `1px solid color-mix(in srgb,${p.acc} 25%,transparent)`,
    }}>{p.catLabel}</span>
  );
}

function FeaturedInner({ p }) {
  return (
    <>
      <div className="pf-left">
        <div className="pf-badge">Proyecto destacado</div>
        <div className="pf-title">{p.title}</div>
        <div className="pf-desc">{p.desc}</div>
        <div className="pf-tags">
          <TagCat p={p} />
          {p.tags.map(t => <span className="tag tag-tech" key={t}>{t}</span>)}
        </div>
      </div>
      <div className="pf-arr">↗</div>
    </>
  );
}

function CellInner({ p }) {
  return (
    <>
      <div className="cell-top">
        <div className="cell-ico">{p.icon}</div>
        <span className="cell-arr">↗</span>
      </div>
      <div className="cell-title">{p.title}</div>
      <div className="cell-desc">{p.desc}</div>
      <div className="cell-tags">
        <TagCat p={p} />
        {p.tags.map(t => <span className="tag tag-tech" key={t}>{t}</span>)}
      </div>
      <div className="cell-link">Ver proyecto →</div>
    </>
  );
}

function ProjFeatured({ p, navigate }) {
  if (p.customCard === 'krezium') return <KreziumCard />;
  const hasLanding = p.url && p.url !== '#';
  if (hasLanding) {
    return (
      <a href={p.url} className="proj-featured" style={{ '--c-acc': p.acc }}>
        <FeaturedInner p={p} />
      </a>
    );
  }
  return (
    <div className="proj-featured" style={{ '--c-acc': p.acc, cursor: 'pointer' }}
      onClick={e => navigateInternal(navigate, p, e.currentTarget)}>
      <FeaturedInner p={p} />
    </div>
  );
}

function ProjCell({ p, navigate }) {
  const hasLanding = p.url && p.url !== '#';
  if (hasLanding) {
    return (
      <a href={p.url} className="proj-cell" style={{ '--c-acc': p.acc, '--c-glow': p.glow }}>
        <CellInner p={p} />
      </a>
    );
  }
  return (
    <div className="proj-cell" style={{ '--c-acc': p.acc, '--c-glow': p.glow, cursor: 'pointer' }}
      onClick={e => navigateInternal(navigate, p, e.currentTarget)}>
      <CellInner p={p} />
    </div>
  );
}

export default function Portfolio() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useReveal(activeFilter);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(t => {
      const current = t || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      return current === 'dark' ? 'light' : 'dark';
    });
  }

  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter);
  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* NAV */}
      <div className="nav-wrap">
        <nav className="nav-pill">
          <a href="#home" className="nav-brand">
            <img
              src="https://github.com/LuchoPann.png"
              alt="LuchoPann"
              className="nav-avatar"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="status-dot" />
            LUCHOPANN
          </a>
          <ul className="nav-links">
            <li><a href="#projects">PROYECTOS</a></li>
            <li><a href="#contact">CONTACTO</a></li>
          </ul>
          <button className="theme-btn" onClick={toggleTheme}>◐</button>
        </nav>
      </div>

      <div className="wrap">

        {/* HERO */}
        <section className="hero" id="home">
          <div>
            <div className="hero-eyebrow reveal">
              <span className="eyebrow-dot" />
              Ing. de Sistemas · 9no semestre · Developer Junior
            </div>
            <h1 className="hero-name reveal reveal-d1">
              Luis<br /><strong>Barraza</strong>
            </h1>
            <p className="hero-bio hero-bio-gap reveal reveal-d2">
              Estudiante de Ingeniería de Sistemas en 9no semestre. He construido cosas en web, mobile y escritorio.
            </p>
            <p className="hero-bio reveal reveal-d2">
              Algunas por clase, otras por curiosidad, otras porque alguien las necesitaba y todavía estoy aprendiendo mucho, pero tengo proyectos que funcionan y que puedo mostrar.
            </p>
            <div className="hero-ctas reveal reveal-d3">
              <a href="#projects" className="btn-primary">
                Ver proyectos <span className="btn-ico">↓</span>
              </a>
              <a href="#contact" className="btn-secondary">Contacto</a>
            </div>
            <div className="metrics reveal reveal-d4">
              <div className="met">
                <div className="met-n">8</div>
                <div className="met-l">Proyectos</div>
              </div>
              <div className="met">
                <div className="met-n">5+</div>
                <div className="met-l">Lenguajes</div>
              </div>
              <div className="met">
                <div className="met-n" style={{ fontSize: '1rem', lineHeight: 1.3 }}>Web · Mobile<br />Escritorio</div>
                <div className="met-l">Plataformas</div>
              </div>
            </div>
          </div>

          {/* Profile card double-bezel */}
          <div className="pc-shell reveal reveal-d2">
            <div className="pc-inner">
              <div className="pc-stripe" />
              <div className="pc-head">
                <span className="pc-head-title">Perfil de estudiante-dev</span>
                <span className="pc-head-id">LP · 2026</span>
              </div>
              <div className="pc-sec">
                <div className="pc-sec-label">Disponibilidad</div>
                <div className="pc-row">
                  <span className="pc-key">estado</span>
                  <span className="pc-val ok">● PRÁCTICAS</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">nivel</span>
                  <span className="pc-val acc">Junior · en formación</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">buscando</span>
                  <span className="pc-val ok">● SÍ — empleo al terminar</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">tipo</span>
                  <span className="pc-val">Presencial · Remoto · Híbrido</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">base</span>
                  <span className="pc-val">Colombia</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">SLA</span>
                  <span className="pc-val acc">&lt; 24h</span>
                </div>
              </div>
              <div className="pc-sec">
                <div className="pc-sec-label">Stack principal</div>
                <div className="pc-row">
                  <span className="pc-key">frontend</span>
                  <span className="pc-val acc">React · TypeScript</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">backend</span>
                  <span className="pc-val">Node.js · Supabase</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">mobile</span>
                  <span className="pc-val">Flutter · Dart</span>
                </div>
                <div className="pc-row">
                  <span className="pc-key">scripts</span>
                  <span className="pc-val">Python</span>
                </div>
              </div>
              <div className="pc-sec">
                <div className="pc-sec-label">Herramientas</div>
                <div className="pc-chips">
                  {['Next.js','Prisma','Tailwind','SQLite','Vite','Docker','Alpine.js','Supabase'].map(t => (
                    <span className="pchip" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="pc-sec">
                <div className="pc-sec-label">Áreas exploradas</div>
                <div className="pc-chips">
                  {['Web frontend','Web backend','Mobile (Android)','Escritorio','CLI / scripts'].map(t => (
                    <span className="pchip" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="s-head reveal">
            <div className="s-super">01 · Proyectos</div>
            <h2 className="s-title">Lo que he construido</h2>
          </div>

          <div className="filter-bar reveal">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`f-btn${activeFilter === f.key ? ' on' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="proj-grid reveal">
            {featured && <ProjFeatured p={featured} navigate={navigate} />}
            {rest.map(p => <ProjCell key={p.id} p={p} navigate={navigate} />)}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="contact-grid">
            <div>
              <div className="c-label reveal">02 · Contacto</div>
              <h2 className="c-head reveal reveal-d1">¿Hablamos?</h2>
              <p className="c-body reveal reveal-d2">
                Estoy en prácticas por 6 meses y al terminar busco empleo como developer junior. Si tienes algo en mente, una idea, un proyecto pequeño o una oportunidad, escríbeme. Respondo rápido.
              </p>
              <div className="c-table reveal reveal-d2">
                <div className="c-row">
                  <span className="c-key">EMAIL</span>
                  <span className="c-val">lbarraza1505@gmail.com</span>
                </div>
                <div className="c-row">
                  <span className="c-key">GITHUB</span>
                  <span className="c-val">github.com/LuchoPann</span>
                </div>
                <div className="c-row">
                  <span className="c-key">BASE</span>
                  <span className="c-val">Colombia · remoto</span>
                </div>
              </div>
              <div className="c-ctas reveal reveal-d3">
                <a href="https://github.com/LuchoPann" className="btn-primary" target="_blank" rel="noopener noreferrer">
                  Ver GitHub <span className="btn-ico">↗</span>
                </a>
              </div>
            </div>

            <div className="cp-shell reveal reveal-d1">
              <div className="cp-inner">
                <div className="cp-stripe" />
                <div className="cp-head">Mensaje directo</div>
                <div className="cp-body">
                  <p className="cp-text">Proyectos web, apps móviles o herramientas a medida. Cuéntame lo que necesitas.</p>
                  <div className="cp-btns">
                    <a href="mailto:lbarraza1505@gmail.com" className="btn-primary">
                      lbarraza1505@gmail.com <span className="btn-ico">→</span>
                    </a>
                  </div>
                  <div className="cp-note">Respuesta típica &lt; 24 horas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <footer>
        <div className="foot-i">
          <span className="foot-t">© 2026 Luis Barraza · LuchoPann</span>
          <span className="foot-t">Construido con <span>Vite</span> · React · GitHub Pages</span>
        </div>
      </footer>
    </>
  );
}
