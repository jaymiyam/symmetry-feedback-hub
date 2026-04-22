import React from 'react';
import { Show, SignInButton } from '@clerk/react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="w-full hero-content flex-col lg:flex-row-reverse justify-between">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold font-mono">
            Symmetry Feedback Hub
          </h1>
          <p className="py-6">
            Ask questions, report bugs and suggest new features with other
            Symmetry creators.
          </p>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="btn btn-primary font-mono tracking-tight">
                Sign In To Post A Feedback
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <button
              className="btn btn-primary font-mono tracking-tight"
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              Submit New Feedback
            </button>
          </Show>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
