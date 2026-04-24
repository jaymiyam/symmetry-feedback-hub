import React from 'react';
import { useGetPostById } from '../hooks/useQueries';
import { useUser } from '@clerk/react';
import { useParams } from 'react-router';
import { TYPE_BADGES, STATUS_BADGES } from '../constants/styles';
import { MessageSquareMoreIcon, ArrowBigUpDashIcon } from 'lucide-react';
import VoteButton from '../components/VoteButton';
import AdminActions from '../components/AdminActions';
import LoadingSpinner from '../components/LoadingSpinner';

const PostPage = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const { postId } = useParams();
  const { data: post, isLoading, isError } = useGetPostById(postId);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Sorry, something went wrong. Please refresh the page.</span>
      </div>
    );
  }
  return (
    <section className="py-6">
      {isAdmin && <AdminActions post={post} />}
      <header>
        <h1 className="text-3xl font-medium mb-2">{post.title}</h1>
        <div className="flex gap-2 items-center">
          <div
            className={`badge badge-outline ${TYPE_BADGES[post.type]} font-mono`}
          >
            {post.type}
          </div>
          <div
            className={`badge badge-outline ${STATUS_BADGES[post.status]} font-mono`}
          >
            {post.status}
          </div>
        </div>
      </header>
      <div className="divider" />
      <article className="card lg:card-side bg-base-200 shadow-sm p-4 min-h-100">
        <div className="min-w-50 flex flex-col justify-center items-center gap-4">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 size-20 rounded-full ring-2 ring-offset-2">
              <img src={post.author.avatar} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-mono font-medium">{post.author.name}</p>
            {/* TODO: get author posts and votes count? */}
            <div className="flex gap-1">
              <MessageSquareMoreIcon className="size-5" />
              <span className="text-sm font-mono">12 Feedbacks</span>
            </div>
            <div className="flex gap-1">
              <ArrowBigUpDashIcon className="size-5" />
              <span className="text-sm font-mono">90 Upvotes</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <p>Posted {new Date(post.createdAt).toLocaleDateString()}</p>
          <div className="mt-2 mb-auto">
            <h2 className="card-title mb-4">{post.title}</h2>
            <p>{post.description}</p>
          </div>
          <VoteButton post={post} className="mt-auto" />
        </div>
      </article>
    </section>
  );
};

export default PostPage;
