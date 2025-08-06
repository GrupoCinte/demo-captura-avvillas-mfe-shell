import { Outlet } from '@modern-js/runtime/router';

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <h1>MovePlanner</h1>
            <span className="tagline">Tu mudanza perfecta</span>
          </div>
          <nav className="main-nav">
            <a href="#servicios">Servicios</a>
            <a href="#sobre-nosotros">Sobre Nosotros</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MovePlanner</h3>
            <p>Hacemos tu mudanza más fácil y eficiente</p>
          </div>
          <div className="footer-section">
            <h4>Servicios</h4>
            <ul>
              <li>Mudanzas residenciales</li>
              <li>Mudanzas comerciales</li>
              <li>Embalaje profesional</li>
              <li>Almacenamiento temporal</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info@moveplanner.com</p>
            <p>📍 123 Main St, Ciudad</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MovePlanner. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
