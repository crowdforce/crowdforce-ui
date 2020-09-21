import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./LocationPicker'), { ssr: false });

export default Map;
