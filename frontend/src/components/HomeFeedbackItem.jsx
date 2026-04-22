import React from 'react';
import { Link } from 'react-router';
import { ArrowBigUpDashIcon } from 'lucide-react';
import { TYPE_BADGES, STATUS_BADGES } from '../constants/styles';

const HomeFeedbackItem = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`}>
      <li className="list-row items-center hover:bg-base-200">
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
        <div className="flex gap-3 items-center justify-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono">Lily Horoshima</span>
            <small className="font-mono">{post.createdAt}</small>
          </div>
        </div>
        {/* TODO: voting related functionality */}
        <button className="btn btn-ghost">
          <ArrowBigUpDashIcon className="size-5 text-primary" />
          <span className="font-mono">76</span>
        </button>
      </li>
    </Link>
  );
};

export default HomeFeedbackItem;
