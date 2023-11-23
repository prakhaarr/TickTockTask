// Your SignUp page
"use client";
import React from "react";
import styled from "styled-components";
import { SignIn } from "@clerk/nextjs";
import GlobalStyleProvider from "@/app/providers/GlobalStyleProvider";
import { FaArrowRight } from "react-icons/fa"; // Assuming you're using react-icons for icons
import todoImage from "./todo.png";

import { PiSignInBold } from "react-icons/pi";
const HeroSection = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black; /* Dark themed background with opacity */
  color: #fff;
  text-align: center;
  border-radius: 16px;
  backdrop-filter: blur(8px); /* Glass and blur effect */
  // z-index:1000;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const ScrollButton = styled.button`
  background-color: #fff;
  color: #3498db;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius:32px;
  display:flex;
  flex-direction:column;
  align-items:center;
  background-color:#181818;
  justify-content:center;
  font-size:1.4rem;
  margin-top:1.6rem;
`;

const LocalStyledSignIn = styled(SignIn)`
  // Add your local styles here
  margin-top: 20px;
`;
const Heading = styled.h1`
  
  font-size: 2rem;
  span{

    font-weight:700;
    background: linear-gradient(45deg, #ff8a00, #e52e71, #3498db); /* Gradient colors */
    background-size: 600% 600%; /* Larger value for more gradual change */
    color: transparent;
    -webkit-background-clip: text; /* Clip text to the background area */
    animation: gradientAnimation 10s infinite; /* 10s duration, infinite loop */
    display: inline-block;


    @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  }
`;


const SubHeading = styled.p`
  font-size: 18px;
  margin-top: 20px;

  span {
    background: linear-gradient(45deg, #ff8a00, #e52e71, #3498db); /* Gradient colors */
    background-size: 600% 600%; /* Larger value for more gradual change */
    color: transparent;
    -webkit-background-clip: text; /* Clip text to the background area */
    animation: gradientAnimation 10s infinite; /* 10s duration, infinite loop */
    display: inline-block;

    font-size:1.4rem;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;







function page() {
    return (
        <GlobalStyleProvider>
            <HeroSection>
                <Heading>Welcome back to <span>"TickTockTask"</span></Heading>

                <img
                    src="https://media1.giphy.com/media/24FD07Vn2NsFkS6jyc/source.gif"
                    alt="ToDo App"
                    style={{ maxWidth: "80%", borderRadius: "8px", maxHeight: "60%" }}
                />
                <SubHeading>
                    Turn your <span style={{ fontWeight: 'bold' }}>to-dos</span> into <span style={{ fontWeight: 'bold' }}>ta-das</span>!
                    Supercharge your productivity with our feature-packed ToDo app.
                </SubHeading>
                <ScrollButton>
                    <p>Sign In Now!</p>
                    <PiSignInBold />
                </ScrollButton>
            </HeroSection>
            <SignIn />

        </GlobalStyleProvider >
    );
}

export default page;
