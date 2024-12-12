// app/profile/Profile.tsx
"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/app/_context/authContext';
import withAuth from '@/app/_utils/withAuth';
import Image from 'next/image';

const Profile = () => {
    const { user, fetchUserProfile } = useAuth();

    useEffect(() => {
        if (!user) fetchUserProfile();
    }, [user, fetchUserProfile]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <Image src={user.profile_picture || '/assets/default-avatar.jpg'} alt="Profile" height={200} width={200} />
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.user_id}</p>
            {/* Agrega otros campos aquí */}
        </div>
    );
};

export default withAuth(Profile);
