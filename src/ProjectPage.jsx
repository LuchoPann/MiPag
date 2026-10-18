import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PROJECTS } from './data'

function navigateBack(navigate, pageEl) {
  if (pageEl) pageEl.style.viewTransitionName = 'active-proj';

  const go = () => navigate(-1);

  if (document.startViewTransition) {
    document.startViewTransition(go);
  } else {
    go();
  }
}

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  // Scroll al tope al entrar
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!project) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', color: 'var(--fg3)' }}>Proyecto no encontrado.</p>
        <button className="btn-secondary" style={{ marginTop: 24 }} onClick={() => navigate('/')}>
          ← Volver
        </button>
      </div>
    );
  }

  const p = project;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* NAV */}
      <div className="nav-wrap">
        <nav className="nav-pill">
          <button
            className="nav-brand"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={e => navigateBack(navigate, document.querySelector('.proj-page-hero'))}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', letterSpacing: '.06em', color: 'var(--fg)' }}>
              ← LUCHOPANN
            </span>
          </button>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'var(--fg3)', letterSpacing: '.08em' }}>
            {p.catLabel}
          </span>
        </nav>
      </div>

      {/* HERO — este elemento hace el morph con la card */}
      <div
        className="proj-page-hero"
        style={{
          viewTransitionName: 'active-proj',
          background: `color-mix(in srgb,${p.acc} 8%,var(--surf))`,
          borderBottom: `1px solid color-mix(in srgb,${p.acc} 20%,transparent)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* accent rule top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${p.acc}, color-mix(in srgb,${p.acc} 40%,transparent))`,
        }} />
        {/* corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 400, height: 400,
          background: `radial-gradient(circle at top right, ${p.glow}, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1160, margin: '0 auto',
          padding: '80px max(40px, env(safe-area-inset-left,0px)) 64px',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '.65rem', color: p.acc,
            letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: '1.8rem' }}>{p.icon}</span>
            {p.catLabel}
          </div>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 300, letterSpacing: '-.03em', lineHeight: .95,
            marginBottom: 24, color: 'var(--fg)',
          }}>
            {p.title}
          </h1>
          <p style={{
            fontSize: '1.05rem', color: 'var(--fg2)',
            lineHeight: 1.8, maxWidth: 620, marginBottom: 36,
          }}>
            {p.desc}
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="tag" style={{
              background: `color-mix(in srgb,${p.acc} 12%,var(--adim))`,
              color: p.acc,
              border: `1px solid color-mix(in srgb,${p.acc} 25%,transparent)`,
            }}>{p.catLabel}</span>
            {p.tags.map(t => (
              <span className="tag tag-tech" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO PLACEHOLDER */}
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        padding: '80px max(40px, env(safe-area-inset-left,0px))',
      }}>
        <div style={{
          border: `1px dashed color-mix(in srgb,${p.acc} 30%,var(--border))`,
          borderRadius: 12,
          padding: '60px 40px',
          textAlign: 'center',
          background: `color-mix(in srgb,${p.acc} 3%,var(--surf))`,
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '.65rem',
            color: p.acc, letterSpacing: '.16em',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            En construcción
          </div>
          <p style={{ color: 'var(--fg3)', fontSize: '.9rem', lineHeight: 1.7 }}>
            El diseño de esta página está pendiente.<br />
            Aquí irá la presentación completa de <strong style={{ color: 'var(--fg)' }}>{p.title}</strong>.
          </p>
        </div>
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
