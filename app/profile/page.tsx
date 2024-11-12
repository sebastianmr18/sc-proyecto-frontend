// app/profile/Profile.tsx
"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/app/_context/authContext';
import withAuth from '@/app/_utils/withAuth';
import defaultAvatar from '@/assets/default-avatar.png';

const Profile = () => {
    const { user, fetchUserProfile } = useAuth();

    useEffect(() => {
        if (!user) fetchUserProfile();
    }, [user, fetchUserProfile]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <img 
                src={user.profile_picture || 'https://api.dicebear.com/9.x/adventurer/svg'} 
                alt="Profile" 
                height={200} 
                width={200}
            />
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            {/* Agrega otros campos aquí */}
        </div>
    );
};

export default withAuth(Profile);
