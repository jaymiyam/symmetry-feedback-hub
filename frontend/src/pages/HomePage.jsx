import React from 'react';
import HeroSection from '../components/HeroSection';
import HomeFeedbacks from '../components/HomeFeedbacks';

const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection />
      <HomeFeedbacks />
    </div>
  );
};

export default HomePage;
