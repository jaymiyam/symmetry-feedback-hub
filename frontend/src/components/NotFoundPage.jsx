// components/NotFoundPage.jsx
import { Link } from 'react-router';
import { SearchXIcon } from 'lucide-react';

const NotFoundPage = ({
  message = "Oops! The page you're looking for doesn't exist.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <SearchXIcon className="size-20 text-base-content/20 mb-6" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-base-content/70 mb-8">{message}</p>
      <Link to="/" className="btn btn-primary">
        Back to Home Feed
      </Link>
    </div>
  );
};

export default NotFoundPage;
