import React from 'react';
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/react';
import { Link } from 'react-router';
import { ChessKnightIcon, PlusIcon, UserIcon } from 'lucide-react';
const Navbar = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
        {/* left block */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost gap-2">
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
              <button className="btn btn-ghost btn-sm">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link to="/create" className="btn btn-primary btn-sm gap-1">
              <PlusIcon className="size-4" />
              <span className="hidden sm:inline">New Feedback</span>
            </Link>
            <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
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
