import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-logo">
          <img src="/ucsm-logo.webp" alt="UCSM Logo" className="logo-image" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">CatoModa</h1>
          <p className="hero-subtitle">Street Style para Todos</p>
          <p className="hero-description">
            Ropa urbana para estudiantes UCSM y jóvenes con actitud
          </p>
          <Link to="/products" className="hero-button">
            Explora Nuestra Colección
          </Link>
        </div>
      </section>

      {/* Valores Section */}
      <section className="values">
        <h2>¿Por qué elegir CatoModa?</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon design-icon"></div>
            <h3>Diseño Urbano</h3>
            <p>Ropa con estilo auténtico y moderno para jóvenes que buscan destacar</p>
          </div>
          <div className="value-card">
            <div className="value-icon students-icon"></div>
            <h3>Para Estudiantes</h3>
            <p>Descuentos especiales y merch exclusivo de la UCSM</p>
          </div>
          <div className="value-card">
            <div className="value-icon quality-icon"></div>
            <h3>Calidad Premium</h3>
            <p>Telas duraderas y acabados perfecto en todas nuestras prendas</p>
          </div>
          <div className="value-card">
            <div className="value-icon price-icon"></div>
            <h3>Precios Accesibles</h3>
            <p>Moda de calidad sin quebrar el banco</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured">
        <h2>Productos Destacados</h2>
        <div className="featured-grid">
          <div className="featured-item">
            <div className="featured-image">
              <img 
                src="https://images.unsplash.com/photo-1556821552-107d7cb4d5d9?w=300&h=300&fit=crop" 
                alt="Hoodie"
              />
            </div>
            <h3>Hoodie Premium</h3>
            <p className="featured-price">S/ 130</p>
            <Link to="/products" className="featured-link">Ver todos</Link>
          </div>

          <div className="featured-item">
            <div className="featured-image">
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop" 
                alt="Polera"
              />
            </div>
            <h3>Polera Oversize</h3>
            <p className="featured-price">S/ 80</p>
            <Link to="/products" className="featured-link">Ver todos</Link>
          </div>

          <div className="featured-item">
            <div className="featured-image">
              <img 
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop" 
                alt="Jeans"
              />
            </div>
            <h3>Jeans Slim</h3>
            <p className="featured-price">S/ 120</p>
            <Link to="/products" className="featured-link">Ver todos</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Únete a la Comunidad CatoModa</h2>
        <p>Sé parte del movimiento street style de UCSM</p>
        <div className="cta-buttons">
          {user ? (
            <>
              <Link to="/products" className="cta-button primary">
                Ver Catálogo Completo
              </Link>
              <Link to="/cart" className="cta-button secondary">
                Mi Carrito
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="cta-button primary">
                Iniciar Sesión
              </Link>
              <Link to="/products" className="cta-button secondary">
                Ver Productos
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="info">
        <div className="info-column">
          <div className="info-icon shipping-icon"></div>
          <h3>Envío Rápido</h3>
          <p>Entrega a nivel nacional en 3-5 días hábiles</p>
        </div>
        <div className="info-column">
          <div className="info-icon returns-icon"></div>
          <h3>Cambios Gratis</h3>
          <p>Cambios y devoluciones dentro de 30 días</p>
        </div>
        <div className="info-column">
          <div className="info-icon secure-icon"></div>
          <h3>Compra Segura</h3>
          <p>Tus datos protegidos en cada transacción</p>
        </div>
      </section>

      {/* About CatoModa */}
      <section className="about">
        <h2>Sobre CatoModa</h2>
        <p>
          CatoModa nace como una iniciativa para ofrecer ropa de calidad, con estilo urbano 
          y accesible para los estudiantes de la UCSM y jóvenes en general. Nos especializamos 
          en prendas que combinan confort, durabilidad y moda actualizada.
        </p>
        <p>
          Nuestro objetivo es ser tu tienda de confianza para el street style, ofreciendo no 
          solo ropa, sino una comunidad donde puedas ser tú mismo.
        </p>
        <Link to="/products" className="about-button">
          Descubre la Colección
        </Link>
      </section>
    </div>
  );
}