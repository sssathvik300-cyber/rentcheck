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
    if (droppedFile) {
      startUpload(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      startUpload(selectedFile);
    }
  }, []);

  const startUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-br from-ghost-orange to-ghost-amber flex items-center justify-center mx-auto mb-6"
          >
            <Ghost className="w-8 h-8 text-black" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Upload Your Lease</h1>
          <p className="text-ghost-text-secondary text-lg">
            Drop your PDF below and we'll analyze it instantly
          </p>
        </div>

        {/* Upload Area */}
        <AnimatePresence mode="wait">
          {!uploading ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <label
                htmlFor="lease-upload"
                className={`dropzone block cursor-pointer ${isDragging ? 'active' : ''}`}
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
                <motion.div
                  animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-16 h-16 rounded-2xl glass-orange flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-7 h-7 text-ghost-orange" />
                  </div>
                  <p className="text-xl font-semibold mb-2">
                    {isDragging ? 'Drop it here!' : 'Drag & drop your lease PDF'}
                  </p>
                  <p className="text-ghost-text-secondary mb-6">
                    or click to browse files
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-ghost-text-muted glass rounded-full px-4 py-2">
                    <FileText className="w-4 h-4" />
                    PDF files up to 25MB
                  </div>
                </motion.div>
              </label>
            </motion.div>
          ) : (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8"
            >
              {/* File info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass-orange flex items-center justify-center">
                    <FileText className="w-6 h-6 text-ghost-orange" />
                  </div>
                  <div>
                    <p className="font-medium">{file?.name || 'lease_agreement.pdf'}</p>
                    <p className="text-sm text-ghost-text-secondary">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '2.4 MB'}
                    </p>
                  </div>
                </div>
                {progress < 100 && (
                  <button
                    onClick={cancelUpload}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-ghost-surface-4 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-ghost-orange to-ghost-amber rounded-full"
                />
                {progress < 100 && (
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-ghost-text-secondary">
                  {progress >= 100 ? 'Upload complete!' : 'Uploading...'}
                </span>
                <span className="text-ghost-orange font-medium">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>

              {progress >= 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-ghost-success">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <span className="font-medium">Starting AI analysis...</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-ghost-text-muted"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-ghost-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            256-bit encrypted
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-ghost-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Auto-deleted after analysis
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-ghost-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            HIPAA-level privacy
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
