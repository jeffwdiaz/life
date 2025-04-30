import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../css/style.css'
import '../css/EntryCard.css'

const EntryCard = ({ entry }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="entry-card">
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
  )
}

EntryCard.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    mood: PropTypes.string
  }).isRequired
}

export default EntryCard 