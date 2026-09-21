import { FileText, Download, Eye, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { MedicalDocument } from '../types/MedicalDocumentTypes';

interface MedicalDocumentCardProps {
  document: MedicalDocument;
  onPreview: (doc: MedicalDocument) => void;
  onDelete: (id: string) => void;
}

export default function MedicalDocumentCard({ document, onPreview, onDelete }: MedicalDocumentCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusIcon = (status: MedicalDocument['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending_review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusLabel = (status: MedicalDocument['status']) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'uploading': return 'Uploading';
      case 'failed': return 'Failed';
      case 'pending_review': return 'Pending Review';
      default: return status;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="bg-red-50 p-2 rounded-lg">
          <FileText className="w-6 h-6 text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 truncate">{document.fileName}</h4>
            <div className="flex items-center gap-1">
              {getStatusIcon(document.status)}
              <span className="text-xs text-gray-500">{getStatusLabel(document.status)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{formatFileSize(document.fileSize)} / {document.fileType.toUpperCase()}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(document.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
          {document.uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-teal-600 h-1.5 rounded-full transition-all"
                style={{ width: document.uploadProgress + '%' }}
              />
            </div>
          )}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onPreview(document)}
              className="text-xs flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              onClick={() => onDelete(document.id)}
              className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600 font-medium ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
