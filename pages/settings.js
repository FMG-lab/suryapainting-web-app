import Layout from '../components/Layout';

export default function Settings() {
  return (
    <Layout title="Settings" subtitle="Application settings and configuration">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-4">General</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>API Version: 1.0.0</p>
            <p>UI Version: 1.0.0</p>
            <p>Database: PostgreSQL</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-4">API Endpoints</h3>
          <div className="space-y-2 text-xs font-mono text-gray-700">
            <p>/api/branches</p>
            <p>/api/bookings</p>
            <p>/api/payments/banks</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-4">Status</h3>
          <div className="space-y-3">
            <p className="text-sm"><span className="text-green-600">✓</span> API Connection Active</p>
            <p className="text-sm"><span className="text-green-600">✓</span> Database Connected</p>
            <p className="text-sm"><span className="text-green-600">✓</span> All Systems Operational</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
