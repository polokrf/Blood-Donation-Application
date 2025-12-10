import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div>
      <header>
        <div>
          <h2>Banner</h2>

          <div>
            <Link className='btn btn-info text-white mr-3' to="/register">Join as a donor</Link>
            <Link className='btn btn-info text-white' to="/search">Search Donors</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;