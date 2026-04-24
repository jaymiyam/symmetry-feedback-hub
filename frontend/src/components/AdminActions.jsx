import React from 'react';
import { useUpdatePost, useDeletePost } from '../hooks/useQueries';
import { Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router';

const AdminActions = ({ post }) => {
  const updatePost = useUpdatePost(post.id);
  const deletePost = useDeletePost(post.id);
  const navigate = useNavigate();

  const handleStatusChange = (e) => {
    updatePost.mutate({ postId: post.id, status: e.target.value });
  };

  const handleDelete = () => {
    if (confirm('Are you sure? This action is permanent.')) {
      deletePost.mutate(post.id, {
        onSettled: () => navigate('/'),
      });
    }
  };

  return (
    <div className="mb-2">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium opacity-50 whitespace-nowrap">
            Admin actions
          </span>

          {/* Status Update Dropdown */}
          <select
            className="select select-bordered select-sm"
            value={post.status}
            onChange={handleStatusChange}
            disabled={updatePost.isPending}
          >
            <option value="under-review">Under Review</option>
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          {updatePost.isPending && (
            <span className="loading loading-spinner loading-xs text-primary"></span>
          )}
        </div>

        {/* Delete Action */}
        <button
          onClick={handleDelete}
          className="btn btn-error btn-sm btn-outline gap-2"
          disabled={deletePost.isPending}
        >
          <Trash2Icon className="size-4" />
          {deletePost.isPending ? 'Deleting...' : 'Delete Post'}
        </button>
      </div>
    </div>
  );
};

export default AdminActions;
