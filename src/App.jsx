import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Classes from './pages/Classes';
import Timetable from './pages/Timetable';
import ClassFinder from './pages/ClassFinder';
import Pricing from './pages/Pricing';
import Instructors from './pages/Instructors';
import Philosophy from './pages/Philosophy';
import Studio from './pages/Studio';
import Journal from './pages/Journal';
import BookingFlow from './pages/BookingFlow';
import Account from './pages/Account';
import Admin from './pages/Admin';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedSession, setSelectedSession] = useState(null);

  // Sync hash routing on load & popstate
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) setCurrentRoute(hash);
    }
    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  function navigate(route) {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSelectSession(session) {
    setSelectedSession(session);
    navigate('book');
  }

  // Render Page Content
  function renderContent() {
    switch (currentRoute) {
      case 'home':
        return <Home navigate={navigate} onSelectSession={handleSelectSession} />;
      case 'classes':
        return <Classes navigate={navigate} onSelectSession={handleSelectSession} />;
      case 'timetable':
        return <Timetable navigate={navigate} onSelectSession={handleSelectSession} />;
      case 'class-finder':
        return <ClassFinder navigate={navigate} />;
      case 'pricing':
      case 'memberships':
        return <Pricing navigate={navigate} />;
      case 'instructors':
        return <Instructors navigate={navigate} />;
      case 'philosophy':
        return <Philosophy navigate={navigate} />;
      case 'studio':
      case 'gallery':
        return <Studio navigate={navigate} />;
      case 'journal':
      case 'why-the-reformer-uses-springs':
        return <Journal navigate={navigate} />;
      case 'book':
        return <BookingFlow session={selectedSession} navigate={navigate} />;
      case 'account':
        return <Account navigate={navigate} />;
      case 'admin':
        return <Admin navigate={navigate} />;
      case 'new-here':
      case 'contact':
      case 'faq':
      case 'cancellation-policy':
      default:
        return <Home navigate={navigate} onSelectSession={handleSelectSession} />;
    }
  }

  const isAdminView = currentRoute === 'admin';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isAdminView && <Navbar currentRoute={currentRoute} navigate={navigate} />}
      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>
      {!isAdminView && <Footer navigate={navigate} />}
    </div>
  );
}

