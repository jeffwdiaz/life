import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../utils/supabaseClient'
import '../css/style.css'
import '../css/Auth.css'

const AuthComponent = () => {
  return (
    <div className="auth-container">
      <h1>Welcome to Life Journal</h1>
      <p>Please sign in or create an account to continue.</p>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#4a90e2',
                brandAccent: '#357abd',
              },
            },
          },
        }}
        providers={[]}
        onError={(error) => {
          console.error('Auth Error:', error)
        }}
        redirectTo={window.location.origin}
      />
    </div>
  )
}

export default AuthComponent 