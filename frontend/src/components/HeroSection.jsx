import React from 'react';
import { Show, SignInButton } from '@clerk/react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="w-full hero-content flex-col lg:flex-row-reverse justify-between">
        <img
          src="/hero-bg.png"
          className="block w-full max-w-72 object-cover"
        />
        <div>
          <h1 className="text-5xl tracking-tight font-bold font-mono">
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
              onClick={() =>
                document.getElementById('new-feedback-modal').showModal()
              }
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
