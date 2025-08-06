import { Helmet } from '@modern-js/runtime/head';
import Provider from 'provider';
import StatusMessage from '../components/StatusMessage';
import { createAppSyncClient } from '../services/appSyncClient';
import { createLeadGateway } from '../services/leadGateway';
import { useLeadSubmission } from '../services/useLeadSubmission';
import './index.css';

const appSyncUrl = process.env.APP_SYNC_URL ?? '';
const appSyncApiKey = process.env.APP_SYNC_API_KEY;
const appSyncClient = createAppSyncClient(appSyncUrl, appSyncApiKey);
const leadGateway = createLeadGateway(appSyncClient);

const Index = () => {
  const { isLoading, error, success, submitLead, handleError, clearError } =
    useLeadSubmission(leadGateway);

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
        />
      </Helmet>

      <section className="hero-section">
        <div className="hero-content">
          <h2>¡Bienvenido a MovePlanner!</h2>
          <p className="hero-subtitle">
            La solución más completa para organizar tu mudanza de manera
            eficiente y sin estrés
          </p>
        </div>
      </section>

      <section className="form-section">
        <div className="container-box">
          <div className="form-intro">
            <h3>Solicita tu Cotización</h3>
            <p>
              Completa el formulario y recibe una cotización personalizada para
              tu mudanza
            </p>
          </div>

          <div className="form-container">
            <div className="form-content">
              {isLoading && (
                <StatusMessage
                  variant="loading"
                  message="Enviando información..."
                />
              )}

              {error && (
                <StatusMessage
                  variant="error"
                  message={error}
                  onClose={clearError}
                />
              )}

              {success && (
                <StatusMessage
                  variant="success"
                  message="¡Información enviada correctamente!"
                />
              )}

              <Provider onLeadSubmit={submitLead} onLeadError={handleError} />
            </div>

            <aside className="form-sidebar">
              <div className="info-card">
                <h4>¿Por qué elegirnos?</h4>
                <ul className="benefits-list">
                  <li>
                    <span className="icon">✅</span>
                    Más de 10 años de experiencia
                  </li>
                  <li>
                    <span className="icon">🚚</span>
                    Flota moderna y equipada
                  </li>
                  <li>
                    <span className="icon">💰</span>
                    Precios competitivos
                  </li>
                  <li>
                    <span className="icon">🛡️</span>
                    Seguro incluido
                  </li>
                  <li>
                    <span className="icon">⭐</span>
                    Miles de clientes satisfechos
                  </li>
                </ul>
              </div>

              <div className="info-card">
                <h4>Proceso simple</h4>
                <ol className="process-list">
                  <li>Completa el formulario</li>
                  <li>Recibe tu cotización</li>
                  <li>Programa tu mudanza</li>
                  <li>¡Relájate y nosotros nos encargamos!</li>
                </ol>
              </div>

              <div className="info-card testimonial">
                <h4>Lo que dicen nuestros clientes</h4>
                <blockquote>
                  "MovePlanner hizo que nuestra mudanza fuera muy fácil. El
                  equipo fue profesional y cuidadoso con nuestras pertenencias."
                </blockquote>
                <cite>- María González</cite>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="services-preview" id="servicios">
        <div className="container-box">
          <h3>Nuestros Servicios</h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h4>Mudanzas Residenciales</h4>
              <p>Especialistas en mudanzas de hogar con el máximo cuidado</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h4>Mudanzas Comerciales</h4>
              <p>Traslados de oficinas y comercios sin interrupciones</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📦</div>
              <h4>Embalaje Profesional</h4>
              <p>Protegemos tus objetos más valiosos</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏪</div>
              <h4>Almacenamiento</h4>
              <p>Soluciones temporales de almacenaje seguro</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
