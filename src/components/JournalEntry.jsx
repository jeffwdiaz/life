import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import '../css/style.css'
import '../css/JournalEntry.css'

const JournalEntry = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUserId(user.id)
    }
    getUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userId) {
      setMessage('Error: Not authenticated')
      return
    }

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([
          {
            title,
            content,
            mood,
            user_id: userId
          }
        ])

      if (error) throw error

      setMessage('Entry saved successfully!')
      setTitle('')
      setContent('')
      setMood('')
    } catch (error) {
      setMessage('Error saving entry: ' + error.message)
    }
  }

  return (
    <div className="journal-entry">
      <h2>New Journal Entry</h2>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title (optional)</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </div>

        <div>
          <label htmlFor="mood">Mood</label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">Select mood...</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
            <option value="Excited">Excited</option>
            <option value="Calm">Calm</option>
          </select>
        </div>

        <div>
          <label htmlFor="content">Journal Entry</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="type here"
          />
        </div>

        <button type="submit">Save Entry</button>
      </form>
    </div>
  )
}

export default JournalEntry 