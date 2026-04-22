import React from 'react';
import { useState, useMemo } from 'react';
import HomeFeedbackItem from './HomeFeedbackItem';
import { FILTER_BUTTONS } from '../constants/styles';

const POSTS = [
  {
    id: '1',
    title: 'CSS subgrid function',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    type: 'feature',
    status: 'under-review',
    createdAt: '21 Sep 2026',
    updatedAt: '21 Sep 2026',
    authorId: '123',
  },
  {
    id: '2',
    title:
      'Side bar hide and show button not working...I have already submitted this bug 4 months ago',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    type: 'bug',
    status: 'under-review',
    createdAt: '22 Sep 2026',
    updatedAt: '22 Sep 2026',
    authorId: '123',
  },
  {
    id: '3',
    title: 'App crashed on pages loading with 3d models',
    description:
      'TLorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    type: 'bug',
    status: 'in-progress',
    createdAt: '11 Aug 2026',
    updatedAt: '12 Sep 2026',
    authorId: '456',
  },
  {
    id: '4',
    title: 'Built-in GSAP functions?',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    type: 'feature',
    status: 'planned',
    createdAt: '29 Aug 2026',
    updatedAt: '12 Sep 2026',
    authorId: '789',
  },
  {
    id: '5',
    title: 'CSS subgrid function',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    type: 'feature',
    status: 'under-review',
    createdAt: '21 Sep 2026',
    updatedAt: '21 Sep 2026',
    authorId: '123',
  },
  {
    id: '7',
    title:
      'Side bar hide and show button not working...I have already submitted this bug 4 months ago',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    type: 'bug',
    status: 'under-review',
    createdAt: '22 Sep 2026',
    updatedAt: '22 Sep 2026',
    authorId: '123',
  },
  {
    id: '9',
    title: 'App crashed on pages loading with 3d models',
    description:
      'TLorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    type: 'bug',
    status: 'in-progress',
    createdAt: '11 Aug 2026',
    updatedAt: '12 Sep 2026',
    authorId: '456',
  },
  {
    id: '8',
    title: 'Built-in GSAP functions?',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    type: 'feature',
    status: 'planned',
    createdAt: '29 Aug 2026',
    updatedAt: '12 Sep 2026',
    authorId: '789',
  },
];

const HomeFeedbacks = () => {
  const typeFilter = ['all', 'feature', 'bug'];
  const [activeFilter, setActiveFilter] = useState('all');

  // TODO: switch to server data posts
  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      if (!POSTS) return [];
      if (activeFilter === 'all') return POSTS;
      return post.type === activeFilter;
    });
  }, [activeFilter]);

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
      {/* TODO: empty state */}
      <ul className="list bg-base-100 rounded-box shadow-md">
        {filteredPosts.map((post) => (
          <HomeFeedbackItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default HomeFeedbacks;
