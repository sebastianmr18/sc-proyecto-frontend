/** app/about/page.tsx */
"use client";
import withAuth from '@/app/_utils/withAuth';

const About = () => {
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}

export default withAuth(About);