import { useState, useEffect } from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export default function Home() {
  const [branches, setBranches] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Health check
      const healthRes = await apiClient.get('/health');
      setHealth(healthRes.data);

      // Fetch branches
      const branchRes = await apiClient.get('/api/branches');
      setBranches(branchRes.data.branches || []);

      // Fetch banks
      const bankRes = await apiClient.get('/api/payments/banks');
      setBanks(bankRes.data.banks || []);

      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎨 Surya Painting Dashboard</h1>
      
      {/* Health Status */}
      <section style={{ marginBottom: '30px' }}>
        <h2>API Health</h2>
        {health ? (
          <p style={{ color: 'green' }}>✅ Status: {health.status}</p>
        ) : (
          <p style={{ color: 'red' }}>❌ API unreachable</p>
        )}
      </section>

      {/* Error Display */}
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ffcccc', color: '#cc0000', marginBottom: '20px' }}>
          ⚠️ Error: {error}
        </div>
      )}

      {/* Branches */}
      <section style={{ marginBottom: '30px' }}>
        <h2>📍 Branches ({branches.length})</h2>
        {loading ? (
          <p>Loading...</p>
        ) : branches.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Code</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{branch.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{branch.code}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    {new Date(branch.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No branches found</p>
        )}
      </section>

      {/* Banks */}
      <section>
        <h2>🏦 Payment Banks ({banks.length})</h2>
        {banks.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            {banks.map((bank) => (
              <div
                key={bank.code}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h3>{bank.name}</h3>
                <p><strong>Code:</strong> {bank.code}</p>
                <p><strong>SWIFT:</strong> {bank.swift_code}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No banks found</p>
        )}
      </section>

      {/* Refresh Button */}
      <button
        onClick={fetchData}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        🔄 Refresh
      </button>
    </div>
  );
}
