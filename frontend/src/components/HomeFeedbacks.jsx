import React from 'react';
import { useGetAllPosts } from '../hooks/useQueries';
import { useState, useMemo } from 'react';
import HomeFeedbackItem from './HomeFeedbackItem';
import LoadingSpinner from './LoadingSpinner';
import { FILTER_BUTTONS } from '../constants/styles';
import { MessageSquareMoreIcon } from 'lucide-react';

const HomeFeedbacks = () => {
  const typeFilter = ['all', 'feature', 'bug'];
  const [activeFilter, setActiveFilter] = useState('all');
  const { data: posts, isLoading, isError } = useGetAllPosts();

  const filteredPosts = useMemo(() => {
    // guard before posts are loaded
    if (!posts) return [];
    if (activeFilter === 'all') return posts;

    return posts.filter((post) => {
      return post.type === activeFilter;
    });
  }, [activeFilter, posts]);

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
    <section>
      <header className="p-4 flex gap-4 items-center">
        <h2 className="text-2xl font-bold font-mono">Topics</h2>
        {/* filtering */}
        <div className="flex gap-2">
          {typeFilter.map((filter) => (
            <button
              key={filter}
              className={`btn capitalize ${FILTER_BUTTONS[filter]} ${activeFilter === filter ? '' : 'btn-soft'} `}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              {filter === 'all' ? '' : 's'}
            </button>
          ))}
        </div>
      </header>
      {/* list */}
      {filteredPosts.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {filteredPosts.map((post) => (
            <HomeFeedbackItem key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <MessageSquareMoreIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">
              No feedbacks yet
            </h3>
            <p className="text-base-content/40 text-sm">
              Be the first to share something!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeFeedbacks;
