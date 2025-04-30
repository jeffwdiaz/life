import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import EntryCard from './EntryCard'
import '../css/style.css'
import '../css/Home.css'
import '../css/NavButtons.css'

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
            <EntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  )
}

export default Home 