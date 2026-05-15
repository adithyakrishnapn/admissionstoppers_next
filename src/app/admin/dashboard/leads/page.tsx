"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, updateDoc, deleteDoc, doc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Download, Search, Filter } from "lucide-react";

type Lead = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  status?: "new" | "contacted" | "enrolled" | "rejected";
  createdAt?: string;
  source?: string;
  referrer?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  submissionChannel?: string;
};

const STATUSES = ["new", "contacted", "enrolled", "rejected"] as const;
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
  enrolled: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 10;

  // Fetch all leads
  useEffect(() => {
    async function fetchLeads() {
      if (!db) return;
      try {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const leadsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lead[];
        setLeads(leadsData);
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // Filter leads
  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.phone?.includes(searchTerm) ||
          lead.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.referrer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
    setCurrentPage(1);
  }, [leads, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update lead status
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const leadRef = doc(db, "leads", leadId);
      await updateDoc(leadRef, { status: newStatus });
      setLeads(
        leads.map((l) =>
          l.id === leadId ? { ...l, status: newStatus as Lead["status"] } : l
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Delete lead
  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leads", leadId));
      setLeads(leads.filter((l) => l.id !== leadId));
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Course", "Status", "Source", "Referrer", "Date"];
    const rows = filteredLeads.map((lead) => [
      lead.name || "N/A",
      lead.email || "N/A",
      lead.phone || "N/A",
      lead.course || "N/A",
      lead.status || "new",
      lead.source || "N/A",
      lead.referrer || "N/A",
      lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "N/A",
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Search & Filter */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700 font-semibold uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{lead.name || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="text-sm">{lead.email || "N/A"}</div>
                      <div className="text-xs text-gray-400">{lead.phone || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-600">{lead.course || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="font-medium text-gray-900">{lead.source || "Direct visit"}</div>
                      <div className="text-xs text-gray-400 truncate max-w-[220px]">
                        {lead.referrer || lead.submissionChannel || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status || "new"}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-3 py-1 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                          STATUS_COLORS[lead.status || "new"]
                        }`}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedLeadId(lead.id);
                            setShowModal(true);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Delete lead"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - currentPage) <= 1 || p === 1 || p === totalPages)
                .map((p, idx, arr) => (
                  <div key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-2 py-2">...</span>}
                    <button
                      onClick={() => setCurrentPage(p)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === p
                          ? "bg-primary text-white"
                          : "border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-gray-900">Lead Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                <p className="text-gray-900 font-medium">{selectedLead.name || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                <p className="text-gray-900 font-medium break-all">{selectedLead.email || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                <p className="text-gray-900 font-medium">{selectedLead.phone || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Course</label>
                <p className="text-gray-900 font-medium capitalize">{selectedLead.course || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                <p className={`text-gray-900 font-medium capitalize px-3 py-1 rounded-full w-fit border ${STATUS_COLORS[selectedLead.status || "new"]}`}>
                  {selectedLead.status || "new"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Source</label>
                <p className="text-gray-900 font-medium">{selectedLead.source || "Direct visit"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Referrer</label>
                <p className="text-gray-900 font-medium break-all">{selectedLead.referrer || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Landing Page</label>
                <p className="text-gray-900 font-medium break-all">{selectedLead.landingPage || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Submission Channel</label>
                <p className="text-gray-900 font-medium">{selectedLead.submissionChannel || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Received Date</label>
                <p className="text-gray-900 font-medium">
                  {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (selectedLead.email) {
                    window.location.href = `mailto:${selectedLead.email}`;
                  }
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
