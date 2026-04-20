import { useAuthToken } from './hooks/useAuthToken';
import { useSyncUser } from './hooks/useSyncUser';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const { isClerkLoaded } = useAuthToken();
  const { isSyncError } = useSyncUser();

  // prevent app rendering before clerk is loaded
  if (!isClerkLoaded) return null;

  // if post request to ('/users/sync) failed
  if (isSyncError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-bold">Database Connection Error</h1>
        <p>Sorry, server is currently out of service.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded cursor-pointer"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
