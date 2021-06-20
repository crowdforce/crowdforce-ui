import dynamic from 'next/dynamic';

const UserButton = dynamic(() => import('./UserButton'), { ssr: false });

export default UserButton;
