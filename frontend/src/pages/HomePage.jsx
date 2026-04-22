import React from 'react';
import HeroSection from '../components/HeroSection';
import HomeFeedbacks from '../components/HomeFeedbacks';
import NewFeedbackModal from '../components/NewFeedbackModal';

const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection />
      <HomeFeedbacks />
      <NewFeedbackModal />
    </div>
  );
};

export default HomePage;
