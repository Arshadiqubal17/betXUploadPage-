import React from 'react'
import { BrowserRouter as  Routes,Link } from 'react-router-dom'

function Navbar() {


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">BetX</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-link active" to="/UpcommingMatches">| Upcomming Matches</Link>
                <Link className="nav-link active" to="/PastMatches">| Past Matches</Link>
                <Link className="nav-link active" to="/Banner">| Banner</Link>
                <Link className="nav-link active" to="/News">| News</Link>
                <Link className="nav-link active" to="/Users">| Users</Link>
                <Link className="nav-link active" to="/BetLink">| BetLink</Link>
                <Link className="nav-link active" to="/PaymentHistory">| PaymentHistory</Link>
            </div>
            </div>
        </div>
        </nav>
        </>
  )
}

export default  Navbar