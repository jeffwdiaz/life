import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './utils/supabaseClient'
import AuthComponent from './components/Auth'
import Home from './components/Home'
import JournalEntry from './components/JournalEntry'
import './css/components.css'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ===============================
  // DEV MODE: Login is bypassed! Remove/comment this block for production.
  // ===============================
  // if (!session) {
  //   return <AuthComponent />
  // }

  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="signout-button"
          >
            Sign Out
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-entry" element={<JournalEntry />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 