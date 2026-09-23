import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import MedicalDocumentCard from '../components/MedicalDocumentCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  MedicalDocument,
  DocumentStatus,
} from '../types/MedicalDocumentTypes';

export default function MedicalDocumentsPage() {
  const [documents, setDocuments] = useState<MedicalDocument[]>([
    {
      id: 'doc_001',
      fileName: 'Blood_Test_Results.pdf',
      fileSize: 2450000,
      fileType: 'application/pdf',
      fileUrl: '#',
      uploadDate: '2025-09-15T10:00:00Z',
      status: 'completed',
      uploadProgress: 100,
    },
    {
      id: 'doc_002',
      fileName: 'XRay_Chest.jpg',
      fileSize: 3200000,
      fileType: 'image/jpeg',
      fileUrl: '#',
      uploadDate: '2025-09-10T08:00:00Z',
      status: 'completed',
      uploadProgress: 100,
    },
    {
      id: 'doc_003',
      fileName: 'Prescription_Meds.png',
      fileSize: 890000,
      fileType: 'image/png',
      fileUrl: '#',
      uploadDate: '2025-09-18T14:00:00Z',
      status: 'pending_review',
      uploadProgress: 100,
    },
    {
      id: 'doc_004',
      fileName: 'MRI_Brain.pdf',
      fileSize: 5800000,
      fileType: 'application/pdf',
      fileUrl: '#',
      uploadDate: '2025-09-05T09:00:00Z',
      status: 'completed',
      uploadProgress: 100,
    },
    {
      id: 'doc_005',
      fileName: 'Allergy_Test.jpg',
      fileSize: 1500000,
      fileType: 'image/jpeg',
      fileUrl: '#',
      uploadDate: '2025-08-28T11:00:00Z',
      status: 'completed',
      uploadProgress: 100,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });

  const [previewDoc, setPreviewDoc] = useState<MedicalDocument | null>(null);

  const handleUpload = async (files: File[]) => {
    setLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newDocs: MedicalDocument[] = files.map((file, index) => ({
        id: `doc_${Date.now()}_${index}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: '#',
        uploadDate: new Date().toISOString(),
        status: 'completed' as DocumentStatus,
        uploadProgress: 100,
      }));

      setDocuments((previousDocuments) => [
        ...newDocs,
        ...previousDocuments,
      ]);

      setShowUpload(false);
    } catch {
      setError('Failed to upload documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((previousDocuments) =>
      previousDocuments.filter((document) => document.id !== id)
    );

    setDeleteConfirm({
      open: false,
      id: null,
    });
  };

  const filteredDocs = documents.filter((document) => {
    const matchesSearch = document.fileName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || document.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: documents.length,
    completed: documents.filter(
      (document) => document.status === 'completed'
    ).length,
    pending_review: documents.filter(
      (document) => document.status === 'pending_review'
    ).length,
    processing: documents.filter(
      (document) => document.status === 'processing'
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Medical Documents
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and upload your medical records
          </p>
        </div>

        <button
          onClick={() => {
            setError('');
            setShowUpload(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          <Plus className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          type="error"
          onDismiss={() => setError('')}
        />
      )}

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
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
        <div className="mt-4 flex flex-wrap gap-4">
          {Object.entries(statusCounts).map(([key, count]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`rounded-lg px-3 py-1.5 text-sm capitalize transition-colors ${
                statusFilter === key
                  ? 'bg-teal-100 font-medium text-teal-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <p className="mb-2 text-gray-400">No documents found</p>
          <p className="text-sm text-gray-400">
            Upload your medical documents to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((document) => (
            <MedicalDocumentCard
              key={document.id}
              document={document}
              onPreview={(selectedDocument) =>
                setPreviewDoc(selectedDocument)
              }
              onDelete={(id) =>
                setDeleteConfirm({
                  open: true,
                  id,
                })
              }
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowUpload(false);
              setError('');
            }}
          />

          <div className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Upload Document
            </h3>

            <FileUpload onUpload={handleUpload} />

            {error && (
              <div className="mt-3">
                <ErrorMessage
                  message={error}
                  type="error"
                  onDismiss={() => setError('')}
                />
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setShowUpload(false);
                  setError('');
                }}
                className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
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
        onConfirm={() => {
          if (deleteConfirm.id) {
            handleDelete(deleteConfirm.id);
          }
        }}
        onCancel={() =>
          setDeleteConfirm({
            open: false,
            id: null,
          })
        }
        variant="danger"
      />

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setPreviewDoc(null)}
          />

          <div className="relative mx-4 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 font-semibold text-gray-900">
              {previewDoc.fileName}
            </h3>

            <p className="mb-4 text-sm text-gray-500">
              {previewDoc.fileType.toUpperCase()} &middot;{' '}
              {(previewDoc.fileSize / 1024).toFixed(1)} KB
            </p>

            <div className="rounded-lg bg-gray-100 p-8 text-center">
              <p className="text-sm text-gray-400">
                Preview not available for this file type
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}