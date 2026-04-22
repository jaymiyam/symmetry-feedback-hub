import React from 'react';
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/react';
import { Link } from 'react-router';
import { ChessKnightIcon, PlusIcon, UserIcon } from 'lucide-react';
const Navbar = () => {
  return (
    <header className="navbar bg-base-200">
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
        {/* left block */}
        <div className="flex-1">
          <Link to="/" className="flex items-center cursor-pointer gap-2">
            <ChessKnightIcon className="size-5 text-primary" />
            <span className="font-mono uppercase text-lg font-bold tracking-wider">
              Symmetry
            </span>
          </Link>
        </div>
        {/* right block */}
        <div className="flex gap-2 items-center">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="btn btn-ghost btn-sm font-mono">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-sm font-mono">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              to="/create"
              className="btn btn-primary btn-sm gap-1 font-mono"
            >
              <PlusIcon className="size-4" />
              <span className="hidden sm:inline">New Feedback</span>
            </Link>
            <Link
              to="/profile"
              className="btn btn-ghost btn-sm gap-1 font-mono"
            >
              <UserIcon className="size-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
