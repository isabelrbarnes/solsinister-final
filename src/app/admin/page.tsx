'use client';

import { useState, useEffect } from 'react';

interface CreatorApplication {
  id: string;
  name: string;
  email: string;
  subCount: string;
  platformLink: string;
  agency?: string;
  kinkContentType?: string[];
  location?: string;
  additionalInfo?: string;
  ip?: string;
  country?: string;
  timestamp?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}

interface DashboardData {
  stats: {
    totalApplications: number;
    spotsRemaining: number;
    spotsUsed: number;
    totalSpots: number;
  };
  applications: CreatorApplication[];
  lastUpdated: string;
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [newSpotsCount, setNewSpotsCount] = useState('');

  const fetchDashboard = async () => {
    if (!adminKey) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/dashboard?adminKey=${encodeURIComponent(adminKey)}`);
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
        setIsAuthenticated(true);
      } else {
        alert('Authentication failed');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      alert('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, payload: any = {}) => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ action, ...payload })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        fetchDashboard(); // Refresh data
      } else {
        alert(result.error || 'Action failed');
      }
    } catch (error) {
      console.error('Action error:', error);
      alert('Error performing action');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
        <div className="bg-luxury-accent border border-luxury-gold/30 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl luxury-heading text-luxury-gold mb-6 text-center">
            SolSinister Admin Dashboard
          </h1>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-lg text-luxury-white placeholder-gray-400 focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20"
              onKeyPress={(e) => e.key === 'Enter' && fetchDashboard()}
            />
            
            <button
              onClick={fetchDashboard}
              disabled={loading || !adminKey}
              className="w-full py-3 bg-gradient-to-r from-luxury-rose to-luxury-gold text-luxury-black font-semibold rounded-lg disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl luxury-heading text-luxury-gold">
            Creator Applications Dashboard
          </h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAdminKey('');
              setDashboardData(null);
            }}
            className="text-luxury-rose hover:text-luxury-white"
          >
            Logout
          </button>
        </div>

        {dashboardData && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-luxury-accent border border-luxury-gold/20 rounded-xl p-6">
                <h3 className="text-luxury-gold text-sm uppercase tracking-wide">Total Applications</h3>
                <p className="text-3xl font-bold text-luxury-white">{dashboardData.stats.totalApplications}</p>
              </div>
              
              <div className="bg-luxury-accent border border-luxury-rose/20 rounded-xl p-6">
                <h3 className="text-luxury-rose text-sm uppercase tracking-wide">Spots Remaining</h3>
                <p className="text-3xl font-bold text-luxury-white">{dashboardData.stats.spotsRemaining}</p>
              </div>
              
              <div className="bg-luxury-accent border border-green-500/20 rounded-xl p-6">
                <h3 className="text-green-500 text-sm uppercase tracking-wide">Spots Used</h3>
                <p className="text-3xl font-bold text-luxury-white">{dashboardData.stats.spotsUsed}</p>
              </div>
              
              <div className="bg-luxury-accent border border-luxury-gold/20 rounded-xl p-6">
                <h3 className="text-luxury-gold text-sm uppercase tracking-wide">Progress</h3>
                <p className="text-3xl font-bold text-luxury-white">
                  {Math.round((dashboardData.stats.spotsUsed / dashboardData.stats.totalSpots) * 100)}%
                </p>
              </div>
            </div>

            {/* Spots Management */}
            <div className="bg-luxury-accent border border-luxury-gold/20 rounded-xl p-6 mb-8">
              <h3 className="text-xl luxury-subheading text-luxury-gold mb-4">Manage Spots</h3>
              <div className="flex gap-4 items-end">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Set spots remaining</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newSpotsCount}
                    onChange={(e) => setNewSpotsCount(e.target.value)}
                    className="px-4 py-2 bg-luxury-black border border-luxury-gold/30 rounded text-luxury-white"
                    placeholder={dashboardData.stats.spotsRemaining.toString()}
                  />
                </div>
                <button
                  onClick={() => {
                    if (newSpotsCount) {
                      handleAction('set_spots', { spots: parseInt(newSpotsCount) });
                      setNewSpotsCount('');
                    }
                  }}
                  className="px-6 py-2 bg-luxury-gold text-luxury-black font-semibold rounded hover:opacity-90"
                >
                  Update Spots
                </button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-luxury-accent border border-luxury-gold/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-luxury-gold/20">
                <h3 className="text-xl luxury-subheading text-luxury-gold">Creator Applications</h3>
                <p className="text-sm text-gray-400">Last updated: {formatDate(dashboardData.lastUpdated)}</p>
              </div>
              
              <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-luxury-black/50">
                      <tr>
                        <th className="text-left p-3 text-luxury-gold">Name</th>
                        <th className="text-left p-3 text-luxury-gold">Email</th>
                        <th className="text-left p-3 text-luxury-gold">Subscribers</th>
                        <th className="text-left p-3 text-luxury-gold">Platform Links</th>
                        <th className="text-left p-3 text-luxury-gold">Agency</th>
                        <th className="text-left p-3 text-luxury-gold">Content Types</th>
                        <th className="text-left p-3 text-luxury-gold">Location</th>
                        <th className="text-left p-3 text-luxury-gold">IP/Country</th>
                        <th className="text-left p-3 text-luxury-gold">Additional Info</th>
                        <th className="text-left p-3 text-luxury-gold">Status</th>
                        <th className="text-left p-3 text-luxury-gold">Applied</th>
                        <th className="text-left p-3 text-luxury-gold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.applications.map((app, index) => (
                        <tr key={app.id} className={index % 2 === 0 ? 'bg-luxury-black/20' : ''}>
                          <td className="p-3 text-luxury-white font-medium">{app.name}</td>
                          <td className="p-3 text-gray-300">{app.email}</td>
                          <td className="p-3 text-gray-300">{app.subCount}</td>
                          <td className="p-3 text-gray-300 max-w-xs">
                            <div className="truncate" title={app.platformLink}>
                              {app.platformLink?.length > 50 ? `${app.platformLink.substring(0, 50)}...` : app.platformLink}
                            </div>
                          </td>
                          <td className="p-3 text-gray-300">{app.agency || 'N/A'}</td>
                          <td className="p-3 text-gray-300">
                            {app.kinkContentType?.slice(0, 2).join(', ')}
                            {app.kinkContentType && app.kinkContentType.length > 2 && '...'}
                          </td>
                          <td className="p-3 text-gray-300">{app.location || 'N/A'}</td>
                          <td className="p-3 text-gray-300">
                            <div className="text-xs">
                              <div>{app.ip}</div>
                              <div className="text-gray-400">{app.country || 'Unknown'}</div>
                            </div>
                          </td>
                          <td className="p-3 text-gray-300 max-w-xs">
                            {app.additionalInfo ? (
                              <div className="truncate" title={app.additionalInfo}>
                                {app.additionalInfo.length > 30 ? `${app.additionalInfo.substring(0, 30)}...` : app.additionalInfo}
                              </div>
                            ) : 'N/A'}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                              {app.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-gray-300 text-xs">
                            {formatDate(app.createdAt)}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              {app.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleAction('approve_creator', { applicationId: app.id })}
                                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                    disabled={dashboardData.stats.spotsRemaining <= 0}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleAction('reject_creator', { rejectionId: app.id })}
                                    className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this application?')) {
                                    handleAction('delete_application', { deleteId: app.id });
                                  }
                                }}
                                className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
                {dashboardData.applications.length === 0 && (
                  <div className="p-8 text-center text-gray-400">
                    No applications yet
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
