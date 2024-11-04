import React from 'react';
import Link from 'next/link';

const ActivationPending = () => {
    return (
        <div>
            <h1>Activation Pending</h1>
            <p>
                Thanks for registering! Please check your email for the activation link to activate your account.
            </p>
            <p>
                If you didn&apos;t receive an email, you can <Link href="/auth/users/resend-activation">resend the activation email</Link>.
            </p>
        </div>
    );
};

export default ActivationPending;
