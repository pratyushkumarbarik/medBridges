import { useState, useRef, ChangeEvent } from 'react';
import { Upload, FileText, Image as ImageIcon, XCircle, File } from 'lucide-react';
import { DocumentStatus } from '../types/MedicalDocumentTypes';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
}

export default function FileUpload({ onUpload, accept = '.pdf,.jpg,.jpeg,.png', maxSizeMB = 25, disabled }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const selectedFiles = Array.from(files);

    for (const file of selectedFiles) {
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Only PDF, JPG, JPEG, PNG are allowed.`);
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File too large: ${file.name}. Maximum size is ${maxSizeMB}MB.`);
        return;
      }
    }

    setError('');
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setUploading(false);
        onUpload(selectedFiles);
      } else {
        setProgress(Math.round(p));
      }
    }, 300);

    if (inputRef.current) inputRef.current.value = '';
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
    if (fileType.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-green-500" />;
    return <File className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          disabled ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-teal-300 hover:border-teal-500 hover:bg-teal-50'
        }`}
      >
        <Upload className={`w-8 h-8 mx-auto mb-2 ${disabled ? 'text-gray-300' : 'text-teal-500'}`} />
        <p className="text-sm text-gray-600">
          <span className="font-medium text-teal-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1">PDF, JPG, JPEG, PNG (max {maxSizeMB}MB)</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Uploading...</span>
            <span className="text-teal-600 font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
