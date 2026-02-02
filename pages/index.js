import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Card from '../components/Card';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export default function Dashboard() {
  const [stats, setStats] = useState({ branches: 0, bookings: 0, banks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [branchRes, bankRes] = await Promise.all([
        apiClient.get('/api/branches'),
        apiClient.get('/api/payments/banks'),
      ]);

      setStats({
        branches: branchRes.data.branches?.length || 0,
        bookings: 0, // TODO: fetch from API
        banks: bankRes.data.banks?.length || 0,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Layout title="Dashboard" subtitle="Welcome back">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          ⚠️ Error: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" subtitle="Welcome to Surya Painting Management">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Branches" value={stats.branches} icon="📍" color="blue" />
        <Card title="Bookings" value={stats.bookings} icon="📅" color="green" />
        <Card title="Payment Banks" value={stats.banks} icon="🏦" color="yellow" />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-3 text-sm text-gray-600">
            <p>✓ Database connection: Active</p>
            <p>✓ {stats.branches} branch locations active</p>
            <p>✓ {stats.banks} payment methods available</p>
            <p>✓ API Status: Ready</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
