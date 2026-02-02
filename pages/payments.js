import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function Payments() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await apiClient.get('/api/payments/banks');
      setBanks(res.data.banks || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Payments" subtitle="Manage payment methods and transactions">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Available Payment Banks</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank) => (
                <div key={bank.code} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <h3 className="font-bold text-lg">{bank.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Code: <span className="font-mono">{bank.code}</span></p>
                  <p className="text-sm text-gray-600">SWIFT: <span className="font-mono">{bank.swift_code}</span></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
