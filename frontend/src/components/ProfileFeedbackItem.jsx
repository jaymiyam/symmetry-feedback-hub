import React from 'react';
import { useDeletePost } from '../hooks/useQueries';
import { Link } from 'react-router';
import { TYPE_BADGES, STATUS_BADGES } from '../constants/styles';
import { Trash2Icon, PlusIcon, ArrowBigUpDashIcon } from 'lucide-react';
import VoteButton from './VoteButton';

const ProfileFeedbackItem = ({ post }) => {
  const deletePost = useDeletePost();
  const handleDelete = () => {
    if (confirm('Delete this feedback?')) {
      deletePost.mutate(post.id);
    }
  };
  return (
    <li className="list-row items-center hover:bg-base-200">
      <Link to={`/posts/${post.id}`}>
        <div className="list-col-grow">
          <h3 className="text-xl font-medium mb-2 line-clamp-1">
            {post.title}
          </h3>
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
        </div>
      </Link>
      <div className="flex gap-3 items-center justify-center">
        <small className="font-mono">
          {new Date(post.createdAt).toLocaleDateString()}
        </small>
      </div>
      <VoteButton post={post} />
      <button
        onClick={handleDelete}
        className="btn btn-ghost btn-xs text-error gap-1"
        disabled={deletePost.isPending}
      >
        <Trash2Icon className="size-3" /> Delete
      </button>
    </li>
  );
};

export default ProfileFeedbackItem;
