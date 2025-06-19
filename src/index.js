import React from ‘react’;
import ReactDOM from ‘react-dom/client’;
import App from ‘./App’;

// Import pour les performances et le reporting (optionnel)
// import reportWebVitals from ‘./reportWebVitals’;

// Configuration pour l’optimisation mobile
const rootElement = document.getElementById(‘root’);

// Vérification que l’élément root existe
if (!rootElement) {
throw new Error(‘Failed to find the root element’);
}

// Création du root React 18
const root = ReactDOM.createRoot(rootElement);

// Masquer le loading spinner une fois React prêt
const hideLoading = () => {
const loading = document.getElementById(‘loading’);
if (loading) {
loading.style.opacity = ‘0’;
loading.style.transition = ‘opacity 0.5s ease-out’;
setTimeout(() => {
loading.style.display = ‘none’;
}, 500);
}
};

// Rendu de l’application
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);

// Masquer le loading après le rendu
setTimeout(hideLoading, 100);

// Configuration des performances Web Vitals (optionnel)
// Uncomment the line below if you want to measure performance
// reportWebVitals(console.log);

// Configuration pour PWA et mise en cache
if (‘serviceWorker’ in navigator) {
window.addEventListener(‘load’, () => {
navigator.serviceWorker.register(’/sw.js’)
.then((registration) => {
console.log(‘✅ Service Worker enregistré:’, registration);
})
.catch((error) => {
console.log(‘❌ Échec enregistrement Service Worker:’, error);
});
});
}

// Gestion des erreurs globales pour un meilleur débogage
window.addEventListener(‘error’, (event) => {
console.error(‘❌ Erreur globale:’, event.error);
});

window.addEventListener(‘unhandledrejection’, (event) => {
console.error(‘❌ Promise rejetée:’, event.reason);
});

// Configuration pour l’optimisation mobile
// Désactiver le zoom sur double-tap (optionnel)
let lastTouchEnd = 0;
document.addEventListener(‘touchend’, function (event) {
const now = (new Date()).getTime();
if (now - lastTouchEnd <= 300) {
event.preventDefault();
}
lastTouchEnd = now;
}, false);

// Amélioration des performances sur les appareils mobiles
if (window.DeviceMotionEvent) {
// Optimisations spécifiques mobile
document.body.style.overflow = ‘hidden’;
document.documentElement.style.overflow = ‘hidden’;

// Rétablir le scroll normal après le chargement
setTimeout(() => {
document.body.style.overflow = ‘auto’;
document.documentElement.style.overflow = ‘auto’;
}, 1000);
}

// Debug info en mode développement
if (process.env.NODE_ENV === ‘development’) {
console.log(‘🚀 Application Gestionnaire de Membres démarrée’);
console.log(‘📱 Mode:’, navigator.userAgent.includes(‘Mobile’) ? ‘Mobile’ : ‘Desktop’);
console.log(‘🌐 Navigateur:’, navigator.userAgent);
}
