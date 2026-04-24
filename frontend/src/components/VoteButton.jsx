import React from 'react';
import { ArrowBigUpDashIcon } from 'lucide-react';
import { useUpvote, useCancelUpvote } from '../hooks/useQueries';
import { useAuth } from '@clerk/react';

const VoteButton = ({ post }) => {
  const { userId } = useAuth();
  const upvote = useUpvote();
  const cancelUpvote = useCancelUpvote();

  const hasVoted = post.votes?.some((vote) => vote.userId == userId);

  const handleVote = () => {
    if (!userId) {
      return alert('Please sign in to vote!');
    }

    if (hasVoted) {
      cancelUpvote.mutate(post.id);
    } else {
      upvote.mutate(post.id);
    }
  };

  const isPending = upvote.isPending || cancelUpvote.isPending;

  return (
    <button
      onClick={handleVote}
      disabled={isPending}
      className={`btn btn-ghost ${hasVoted ? 'text-primary bg-primary/10' : 'text-base-content/60'}`}
    >
      <ArrowBigUpDashIcon
        className={`size-5 text-primary transition-transform ${hasVoted ? 'fill-current scale-110' : ''} ${isPending ? 'animate-pulse' : ''}`}
      />
      <span className="font-mono">{post.votes?.length.toString() || '0'}</span>
    </button>
  );
};

export default VoteButton;
