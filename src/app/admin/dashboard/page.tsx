"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Users, FileText, Activity } from "lucide-react";

export default function DashboardIndex() {
  const [stats, setStats] = useState({ leads: 0, blogs: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!db) return;
      try {
        // Fetch leads overview
        const leadsSnap = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(5)));
        const allLeads = await getDocs(collection(db, "leads"));
        const allBlogs = await getDocs(collection(db, "blogs"));
        
        setStats({ leads: allLeads.size, blogs: allBlogs.size });
        setRecentLeads(leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Data fetch error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-gray-500">Loading dashboard data...</div>;

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.leads}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Site Traffic</h3>
            <p className="text-2xl font-bold text-gray-900">Active</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Published Blogs</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.blogs}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads.length > 0 ? recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{lead.name || "N/A"}</td>
                  <td className="px-6 py-4">{lead.email || lead.phone || "N/A"}</td>
                  <td className="px-6 py-4 capitalize">{lead.course || "N/A"}</td>
                  <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No leads recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
