import React from 'react';
import { Link } from 'react-router';
import { ArrowBigUpDashIcon } from 'lucide-react';
import { TYPE_BADGES, STATUS_BADGES } from '../constants/styles';
import VoteButton from './VoteButton';

const HomeFeedbackItem = ({ post }) => {
  return (
    <li className="list-row items-center hover:bg-base-200">
      <Link to={`/posts/${post.id}`}>
        <div className="list-col-grow">
          <h3 className="text-lg md:text-xl font-medium mb-2 leading-tight md:line-clamp-1">
            {post.title}
          </h3>
          <div className="flex gap-2 items-center">
            <div
              className={`badge badge-outline text-xs md:text-sm whitespace-nowrap ${TYPE_BADGES[post.type]} font-mono`}
            >
              {post.type}
            </div>
            <div
              className={`badge badge-outline text-xs md:text-sm whitespace-nowrap ${STATUS_BADGES[post.status]} font-mono`}
            >
              {post.status}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex gap-3 items-center justify-center text-right">
        <div className="hidden md:flex flex-col">
          <span className="font-mono">{post.author.name}</span>
          <small className="font-mono">
            {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </div>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring-2 ring-offset-2">
            <img src={post.author.avatar} />
          </div>
        </div>
      </div>
      <VoteButton post={post} />
    </li>
  );
};

export default HomeFeedbackItem;
