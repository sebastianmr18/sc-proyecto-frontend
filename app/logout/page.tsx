"use client";
import withAuth from '@/app/_utils/withAuth';
const Logout = () => {
    return (
        <>
            <p className='text-center pt-4'>
                Te has desconectado exitosamente. Vuelve pronto!
            </p>
        </>
    )
}

export default withAuth(Logout);