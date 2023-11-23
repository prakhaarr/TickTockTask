// app/landing.tsx

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@clerk/nextjs';

const LandingPage: React.FC = () => {
    const router = useRouter();
    const { user } = auth();

    useEffect(() => {
        // Redirect to the dashboard if the user is authenticated
        console.log("User:", user);
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSignInClick = () => {
        router.push('/signin');
    };

    return (
        <div className="landing-container">
            <img src="/path/to/your/gif.gif" alt="Eye-catching GIF" className="landing-gif" />
            <h1 className="landing-title">Your Eye-Catching Phrases Here!</h1>
            <p className="landing-description">Some additional information or description here.</p>
            <button className="sign-in-button" onClick={handleSignInClick}>
                Sign In
            </button>

            <style jsx>{`
        
            z-index:1001;
      `}</style>
        </div>
    );
};

export default LandingPage;
