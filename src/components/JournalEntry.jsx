import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import '../css/style.css'
import '../css/JournalEntry.css'

// Helper function to format date as YYYY-MM-DD
const formatDateYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const JournalEntry = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      } else {
        console.error("User not logged in.")
        setMessage("Error: You must be logged in to manage entries.")
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    if (id) {
      setIsEditing(true)
      setIsLoading(true)
      setMessage('')
      const fetchEntry = async () => {
        try {
          const { data, error } = await supabase
            .from('journal_entries')
            .select('*')
            .eq('id', id)
            .single()

          if (error) throw error
          
          if (data) {
            setTitle(data.title || '')
            setContent(data.content || '')
            setMood(data.mood || '')
          } else {
            setMessage(`Error: Entry with ID ${id} not found.`)
            setIsEditing(false)
          }
        } catch (error) {
          console.error('Error fetching entry:', error)
          setMessage('Error fetching entry data: ' + error.message)
          setIsEditing(false)
        } finally {
          setIsLoading(false)
        }
      }
      fetchEntry()
    } else {
      setIsEditing(false)
      setTitle(formatDateYYYYMMDD(new Date()))
      setContent('')
      setMood('')
      setMessage('')
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userId) {
      setMessage('Error: Not authenticated')
      return
    }
    if (!content) {
      setMessage('Error: Journal entry content cannot be empty.')
      return
    }

    setIsLoading(true)
    setMessage('')

    const entryData = {
      title,
      content,
      mood,
      user_id: userId,
    }

    try {
      let error;
      if (isEditing) {
        const { error: updateError } = await supabase
          .from('journal_entries')
          .update(entryData)
          .eq('id', id)
        error = updateError;
        if (!error) setMessage('Entry updated successfully!')
      } else {
        const { error: insertError } = await supabase
          .from('journal_entries')
          .insert([entryData])
        error = insertError;
        if (!error) setMessage('Entry saved successfully!')
      }

      if (error) throw error

      setTimeout(() => navigate('/'), 1500);

    } catch (error) {
      console.error('Error saving/updating entry:', error)
      setMessage(`Error ${isEditing ? 'updating' : 'saving'} entry: ${error.message}`)
    } finally {
      setIsLoading(false)
      if (!isEditing && message.includes('saved successfully')) {
          setTitle('')
          setContent('')
          setMood('')
      }
    }
  }

  const handleDelete = async () => {
    if (!isEditing || !id) {
      setMessage('Error: Cannot delete unsaved or unidentified entry.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage('Entry deleted successfully!');
      setTimeout(() => navigate('/'), 1500);

    } catch (error) {
      console.error('Error deleting entry:', error);
      setMessage(`Error deleting entry: ${error.message}`);
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) {
      return <div className="loading">Loading entry...</div>
  }

  return (
    <div className="journal-entry">
      <h2>{isEditing ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
      
      {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title (optional)</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry title"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="mood">Mood</label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            disabled={isLoading}
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
            placeholder="Type your thoughts here..."
            disabled={isLoading}
          />
        </div>

        <div className="form-actions">
           <button type="submit" disabled={isLoading}>
             {isLoading ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'Update Entry' : 'Save Entry')}
           </button>
           {isEditing && (
             <button 
               type="button" 
               className="delete-button"
               onClick={handleDelete} 
               disabled={isLoading}
             >
               {isLoading ? 'Deleting...' : 'Delete Entry'}
             </button>
           )}
           <button type="button" onClick={() => navigate('/')} disabled={isLoading}>
             Back to Home
           </button>
        </div>
      </form>
    </div>
  )
}

export default JournalEntry 