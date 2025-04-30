import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import '../css/home.css'

const Home = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setEntries(data)
    } catch (err) {
      setError('Error fetching entries: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) return <div className="loading">Loading entries...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="home">
      <header className="home-header">
        <h1>My Journal</h1>
        <Link to="/new-entry" className="new-entry-button">
          New Entry
        </Link>
      </header>

      <div className="entries-list">
        {entries.length === 0 ? (
          <div className="no-entries">
            <p>No journal entries yet.</p>
            <Link to="/new-entry">Write your first entry</Link>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <h2>{entry.title || 'Untitled Entry'}</h2>
                <span className="entry-date">{formatDate(entry.created_at)}</span>
              </div>
              {entry.mood && (
                <div className="entry-mood">
                  Mood: <span className="mood-tag">{entry.mood}</span>
                </div>
              )}
              <p className="entry-preview">
                {entry.content.length > 150
                  ? `${entry.content.substring(0, 150)}...`
                  : entry.content}
              </p>
              <Link to={`/entry/${entry.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home 