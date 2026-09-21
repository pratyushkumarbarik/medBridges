import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import MedicalDocumentCard from '../components/MedicalDocumentCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import { MedicalDocument, DocumentStatus } from '../types/MedicalDocumentTypes';

export default function MedicalDocumentsPage() {
  const [documents, setDocuments] = useState<MedicalDocument[]>([
    { id: 'doc_001', fileName: 'Blood_Test_Results.pdf', fileSize: 2450000, fileType: 'application/pdf', fileUrl: '#', uploadDate: '2025-09-15T10:00:00Z', status: 'completed', uploadProgress: 100 },
    { id: 'doc_002', fileName: 'XRay_Chest.jpg', fileSize: 3200000, fileType: 'image/jpeg', fileUrl: '#', uploadDate: '2025-09-10T08:00:00Z', status: 'completed', uploadProgress: 100 },
    { id: 'doc_003', fileName: 'Prescription_Meds.png', fileSize: 890000, fileType: 'image/png', fileUrl: '#', uploadDate: '2025-09-18T14:00:00Z', status: 'pending_review', uploadProgress: 100 },
    { id: 'doc_004', fileName: 'MRI_Brain.pdf', fileSize: 5800000, fileType: 'application/pdf', fileUrl: '#', uploadDate: '2025-09-05T09:00:00Z', status: 'completed', uploadProgress: 100 },
    { id: 'doc_005', fileName: 'Allergy_Test.jpg', fileSize: 1500000, fileType: 'image/jpeg', fileUrl: '#', uploadDate: '2025-08-28T11:00:00Z', status: 'completed', uploadProgress: 100 },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [previewDoc, setPreviewDoc] = useState<MedicalDocument | null>(null);

  const handleUpload = async (files: File[]) => {
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1500));
    const newDocs: MedicalDocument[] = files.map((file, i) => ({
      id: `doc_${Date.now()}_${i}`,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: '#',
      uploadDate: new Date().toISOString(),
      status: 'completed' as DocumentStatus,
      uploadProgress: 100,
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
    setLoading(false);
    setShowUpload(false);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm({ open: false, id: null });
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: documents.length,
    completed: documents.filter((d) => d.status === 'completed').length,
    pending_review: documents.filter((d) => d.status === 'pending_review').length,
    processing: documents.filter((d) => d.status === 'processing').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and upload your medical records</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {error && <ErrorMessage message={error} type="error" onDismiss={() => setError('')} />}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending_review">Pending Review</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 mt-4">
          {Object.entries(statusCounts).map(([key, count]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === key ? 'bg-teal-100 text-teal-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {key.replace('_', ' ')} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Uploading documents..." />
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-2">No documents found</p>
          <p className="text-sm text-gray-400">Upload your medical documents to get started</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <MedicalDocumentCard
              key={doc.id}
              document={doc}
              onPreview={(d) => setPreviewDoc(d)}
              onDelete={(id) => setDeleteConfirm({ open: true, id })}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowUpload(false)} />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h3>
            <FileUpload onUpload={handleUpload} />
            {error && <ErrorMessage message={error} type="error" className="mt-3" />}
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={deleteConfirm.open}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => deleteConfirm.id && handleDelete(deleteConfirm.id)}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
        variant="danger"
      />

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPreviewDoc(null)} />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4">
            <h3 className="font-semibold text-gray-900 mb-2">{previewDoc.fileName}</h3>
            <p className="text-sm text-gray-500 mb-4">{previewDoc.fileType.toUpperCase()} &middot; {(previewDoc.fileSize / 1024).toFixed(1)} KB</p>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-400 text-sm">Preview not available for this file type</p>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setPreviewDoc(null)} className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
