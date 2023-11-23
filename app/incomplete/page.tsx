"use client";


import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

function page() {

    const { incompleteTasks } = useGlobalState();
    return (
        <Tasks title='Incompleted Tasks' tasks={incompleteTasks} />
    );
}

export default page