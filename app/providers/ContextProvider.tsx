"use client"
import React from 'react'
import { GlobalProvider } from '../context/globalProvider';
import { Toaster } from 'react-hot-toast';
interface Props {

    children: React.ReactNode;
}
function ContextProvider({ children }: Props) {
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 1000);
    }, []);

    console.log('isReady:', isReady); // Add this line
    if (!isReady) {
        return (
            <div key={isReady ? 'ready' : 'not-ready'} className="loader-container w-full h-full flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    console.log('Rendering children...'); // Add this line
    return (

        <GlobalProvider>

            <Toaster />
            {children}
        </GlobalProvider>

    )
}

export default ContextProvider