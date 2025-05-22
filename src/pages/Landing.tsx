
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded p-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3.2A9 9 0 1 0 20.8 14a9 9 0 0 0-10.8-10.8z" />
              <path d="M13.4 14.8a5 5 0 0 1 7.8-5.6" />
              <path d="M6.6 9.2a5 5 0 0 0-2.2 6" />
              <path d="M12 8v4l3 2" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">PGAT</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Registrarse</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sistema de Gestión de{" "}
            <span className="text-blue-500">Soporte Técnico</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Gestiona tickets de soporte e inventario de TI en una sola plataforma
            intuitiva y eficiente.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Comenzar ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="border-l-4 border-blue-500 p-4 mb-4 bg-blue-50 rounded-r-lg">
              <div className="text-sm text-gray-500 mb-1">Ticket #38A2F1</div>
              <h3 className="font-medium text-lg">Problema con impresora</h3>
              <p className="text-gray-600">La impresora no está conectando con la red.</p>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Abierto</span>
              </div>
            </div>
            <div className="border-l-4 border-yellow-500 p-4 bg-yellow-50 rounded-r-lg">
              <div className="text-sm text-gray-500 mb-1">Ticket #42B7C9</div>
              <h3 className="font-medium text-lg">Acceso a sistema</h3>
              <p className="text-gray-600">Necesito acceso al sistema de contabilidad.</p>
              <div className="mt-2">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">En progreso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">
            Características Principales
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Descubre todas las herramientas que tenemos para optimizar la gestión de soporte
            técnico.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestión de Tickets</h3>
              <p className="text-gray-600">
                Sistema completo para crear, asignar y dar seguimiento a incidentes y solicitudes.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inventario de Activos</h3>
              <p className="text-gray-600">
                Control completo de todos los activos tecnológicos con integraciones automáticas.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reportes Avanzados</h3>
              <p className="text-gray-600">
                Información detallada y análisis para mejorar la toma de decisiones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Comienza a organizar tu soporte técnico
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Regístrate ahora y mejora la eficiencia de tu equipo de TI con nuestro sistema
            integrado.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Crear una cuenta</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-500 text-white rounded p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 3.2A9 9 0 1 0 20.8 14a9 9 0 0 0-10.8-10.8z" />
                  <path d="M13.4 14.8a5 5 0 0 1 7.8-5.6" />
                  <path d="M6.6 9.2a5 5 0 0 0-2.2 6" />
                  <path d="M12 8v4l3 2" />
                </svg>
              </div>
              <span className="font-bold">PGAT</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PGAT. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
