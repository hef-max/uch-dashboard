"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Image from 'next/image';

// Pastikan ini menggunakan default import dengan dynamic
const DashboardTable = dynamic(() => import('@/components/DashboardTable'), { ssr: false });
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const Dashboard = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState([-6.2, 106.816666]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images');
      const updatedData = await response.json();
      setData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);  // 10000ms = 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleRowClick = (data) => {
    setSelectedCoordinates([data['latitude'], data['longitude']]);
  };

  const columns = [
    { Header: 'Timestamp', accessor: 'timestamp' },
    { Header: 'Latitude', accessor: 'latitude' },
    { Header: 'Longitude', accessor: 'longitude' },
    { Header: 'Image', accessor: 'image', Cell: ({ cell: { value } }) => <Image src={value} alt="Crime" width={100} height={100} /> },
    { Header: 'Labels', accessor: 'labels' }
  ];

  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <DashboardTable columns={columns} data={data} onRowClick={handleRowClick} />
        </div>
        <div style={{ width: '50%' }}>
          <Map data={data} center={selectedCoordinates} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
