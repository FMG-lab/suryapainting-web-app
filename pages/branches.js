import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/Layout';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function Branches() {
  const router = useRouter();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await apiClient.get('/api/branches');
      setBranches(res.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Branches" subtitle="Manage all painting branches">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">All Branches ({branches.length})</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          + Add Branch
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading branches...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          ⚠️ {error}
        </div>
      ) : branches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              onClick={() => router.push(`/branches/${branch.id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer p-6 border border-gray-200 hover:border-primary"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{branch.name}</h3>
                <p className="text-sm text-gray-500 font-mono">ID: {branch.id}</p>
              </div>

              {/* City Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  📍 {branch.city || 'City Not Set'}
                </span>
              </div>

              {/* Info Grid */}
              <div className="space-y-3 mb-4">
                {branch.address && (
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Address</p>
                    <p className="text-gray-900 font-medium">{branch.address}</p>
                  </div>
                )}
                {branch.phone && (
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Phone</p>
                    <p className="text-gray-900 font-medium font-mono">{branch.phone}</p>
                  </div>
                )}
                {branch.email && (
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
                    <p className="text-gray-900 font-medium break-all">{branch.email}</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-200 pt-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-600">24</p>
                  <p className="text-xs text-gray-500">Staff</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">156</p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-yellow-600">4.9★</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <span className="text-xs text-gray-500">
                  Created {new Date(branch.created_at || Date.now()).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-primary hover:text-blue-700 text-sm font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No branches found</p>
          <p className="text-sm">Click "Add Branch" to create your first branch</p>
        </div>
      )}
    </Layout>
  );
}
