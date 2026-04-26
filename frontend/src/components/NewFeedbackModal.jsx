import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreatePost } from '../hooks/useQueries';
import { TypeIcon, FileTextIcon, MessageSquareMoreIcon } from 'lucide-react';

const NewFeedbackModal = () => {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'feature',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return alert('Please fill in all fields with valid content!');
    }

    createPost.mutate(formData, {
      onSuccess: (newPost) => {
        document.getElementById('new-feedback-modal').close();
        navigate(`/posts/${newPost.id}`);
      },
    });

    setFormData({
      title: '',
      description: '',
      type: 'feature',
    });
  };

  return (
    <dialog id="new-feedback-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold font-mono text-lg">New Feedback</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* feebback type */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Feedback Type</legend>
            <select
              name="type"
              id="type"
              className="select"
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
            </select>
          </fieldset>
          {/* post title */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Post Title</legend>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Post title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              className="w-full input input-bordered flex items-center gap-2 grow"
            />
          </fieldset>
          {/* post description */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product description</legend>

            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
              className="w-full textarea bg-transparent resize-none focus:outline-none min-h-28"
              required
            />
          </fieldset>

          {/* error display */}
          {createPost.isError && (
            <div role="alert" className="alert alert-error text-sm">
              <span>Failed to create post. Please try again.</span>
            </div>
          )}

          {/* submit button */}
          <div className="modal-action">
            <button
              type="submit"
              disabled={createPost.isPending}
              className="btn btn-primary w-full font-mono tracking-tight"
            >
              {createPost.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default NewFeedbackModal;
