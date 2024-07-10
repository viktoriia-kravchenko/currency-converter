import Link from 'next/link';

const NotFound = () => (
  <div>
    <h2>Not Found</h2>

    <p>This page could not be found.</p>

    <Link href="/">Return Home</Link>
  </div>
);

export default NotFound;
