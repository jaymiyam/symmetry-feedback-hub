import React from 'react';
import { useGetPostsByAuthor } from '../hooks/useQueries';
import ProfileFeedbackItem from '../components/ProfileFeedbackItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router';
import { PlusIcon, MessageSquareMoreIcon } from 'lucide-react';

const ProfilePage = () => {
  const { data: posts, isLoading, isError } = useGetPostsByAuthor();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Sorry, something went wrong. Please refresh the page.</span>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono mb-1">My Feedbacks</h1>
          <p className="text-base-content/60 text-sm">
            You have {posts?.length || 0} active posts
          </p>
        </div>
      </header>

      {/* POSTS */}
      {posts?.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <MessageSquareMoreIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">
              No feedbacks yet
            </h3>
            <p className="text-base-content/40 text-sm">
              Share something with fellow Symmetry creators!
            </p>
          </div>
        </div>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {posts.map((post) => (
            <ProfileFeedbackItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProfilePage;
