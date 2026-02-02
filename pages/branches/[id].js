import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function BranchDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBranch();
    }
  }, [id]);

  const fetchBranch = async () => {
    try {
      const res = await apiClient.get(`/api/branches/${id}`);
      setBranch(res.data.data || res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    const link = `${window.location.origin}/branches/${id}`;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!router.isReady) return <Layout title="Loading..."><div className="text-center py-8">Loading...</div></Layout>;

  if (loading) {
    return (
      <Layout title="Branch Details">
        <div className="text-center py-8 text-gray-500">Loading branch details...</div>
      </Layout>
    );
  }

  if (error || !branch) {
    return (
      <Layout title="Branch Details">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          ⚠️ {error || 'Branch not found'}
        </div>
        <button
          onClick={() => router.push('/branches')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
        >
          ← Back to Branches
        </button>
      </Layout>
    );
  }

  return (
    <Layout title={branch.name} subtitle="Branch Details">
      <div className="mb-4">
        <button
          onClick={() => router.push('/branches')}
          className="text-primary hover:text-blue-700 flex items-center gap-1"
        >
          ← Back to Branches
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Info Cards */}
        <div className="space-y-4">
          {/* Address Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📍</span>
              <h3 className="text-lg font-semibold">Address</h3>
            </div>
            <p className="text-gray-700">{branch.address || 'Not provided'}</p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📞</span>
              <h3 className="text-lg font-semibold">Contact</h3>
            </div>
            <p className="text-gray-700 font-mono">{branch.phone || 'Not provided'}</p>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">✉️</span>
              <h3 className="text-lg font-semibold">Email</h3>
            </div>
            <p className="text-gray-700 break-all">{branch.email || 'Not provided'}</p>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🕒</span>
              <h3 className="text-lg font-semibold">Hours</h3>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{branch.hours || 'Not provided'}</p>
          </div>
        </div>

        {/* Right Column - Stats & Share */}
        <div className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-1 lg:grid-cols-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Staff Members</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Projects Done</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">4.9★</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>

          {/* Share Link Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Share Branch</h3>
            <div className="space-y-3">
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/branches/${id}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600 font-mono"
              />
              <button
                onClick={copyShareLink}
                className={`w-full py-2 rounded-lg font-semibold transition ${
                  copySuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-blue-600'
                }`}
              >
                {copySuccess ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Branch Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Branch Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">City:</span>
                <p className="font-semibold">{branch.city || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-gray-600">Code:</span>
                <p className="font-mono font-semibold">{branch.code || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
