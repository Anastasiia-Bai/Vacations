import React from 'react'
import { NavLink } from 'react-router-dom';
import './home.css';

export default function Home() {

    return (
        <div className="container-fluid">
            <header >
                <div className="overlay" />
                <video playsInline={true} autoPlay={true} muted={true} loop={true}>
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-shot-of-beach-shore-1085-large.mp4" type="video/mp4" />
                </video>
                <div className="container h-100">
                    <div className="d-flex h-100 text-center align-items-center">
                        <div className="header">
                                <h2>A little step may be the beginning of a great journey!</h2>
                            <div className="links-container">
                                <button className="button" type="submit"><NavLink className="landing-links" to="/login">Sign In</NavLink></button>
                                <button className="button" type="submit"><NavLink className="landing-links" to="/register">Register</NavLink></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}