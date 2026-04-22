import React from 'react';
import { ChessKnightIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 text-center">
      <div className="grid-flow-col items-center mx-auto">
        <ChessKnightIcon className="size-5 text-secondary" />
        <p>
          Copyright © {new Date().getFullYear()} - Designed & Coded By{' '}
          <a href="https://jaymiyam.com" target="_blank" className="underline">
            Jaymi.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
