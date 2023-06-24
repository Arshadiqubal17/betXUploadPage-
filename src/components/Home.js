import React from 'react';
import Navbar from './Navbar'
import Table from 'react-bootstrap/Table';

function Home(props) {
    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1 className="text-center">Home Page</h1>
            </div>
        </div>
    );
}

export default Home;