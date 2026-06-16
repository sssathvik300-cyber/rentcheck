import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Ghost } from 'lucide-react';

interface LeaseUploadProps {
  onUploadComplete: () => void;
}

export default function LeaseUpload({ onUploadComplete }: LeaseUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) startUpload(droppedFile);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) startUpload(selectedFile);
  }, []);

  const startUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onUploadComplete(), 600);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const cancelUpload = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-rg-accent flex items-center justify-center mx-auto mb-5">
            <Ghost className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Upload Your Lease</h1>
          <p className="text-rg-text-secondary">Drop your PDF below and we'll analyze it instantly</p>
        </div>

        {/* Upload Area */}
        <AnimatePresence mode="wait">
          {!uploading ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <label
                htmlFor="lease-upload"
                className={`dropzone block ${isDragging ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  id="lease-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-xl bg-rg-accent-muted flex items-center justify-center mx-auto mb-5">
                  <Upload className="w-5 h-5 text-rg-accent" />
                </div>
                <p className="text-base font-medium mb-1">
                  {isDragging ? 'Drop it here' : 'Drag & drop your lease PDF'}
                </p>
                <p className="text-sm text-rg-text-secondary mb-5">or click to browse</p>
                <div className="badge text-xs mx-auto">
                  <FileText className="w-3.5 h-3.5" />
                  PDF up to 25MB
                </div>
              </label>
            </motion.div>
          ) : (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rg-accent-muted flex items-center justify-center">
                    <FileText className="w-5 h-5 text-rg-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file?.name || 'lease.pdf'}</p>
                    <p className="text-xs text-rg-text-secondary">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '2.4 MB'}
                    </p>
                  </div>
                </div>
                {progress < 100 && (
                  <button
                    onClick={cancelUpload}
                    className="w-7 h-7 rounded-lg border border-rg-border flex items-center justify-center hover:bg-white/5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-rg-text-muted" />
                  </button>
                )}
              </div>

              <div className="progress-bar mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  className="progress-fill"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-rg-text-secondary">
                  {progress >= 100 ? 'Upload complete' : 'Uploading...'}
                </span>
                <span className="text-rg-accent font-medium">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>

              {progress >= 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 text-center text-sm text-rg-success font-medium"
                >
                  Starting AI analysis...
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-rg-text-muted">
          <span>🔒 256-bit encrypted</span>
          <span>🗑 Auto-deleted after analysis</span>
          <span>🛡 HIPAA-level privacy</span>
        </div>
      </motion.div>
    </div>
  );
}
