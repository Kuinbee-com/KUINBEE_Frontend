import React from 'react';
import { AlertCircle, Database } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Link } from 'react-router-dom';

interface DatasetErrorStateProps {
  error: string;
  onRetry: () => void;
  id?: string;
}

const DatasetErrorState: React.FC<DatasetErrorStateProps> = ({ error, onRetry, id }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dataset</h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <Button onClick={() => id && onRetry()} variant="outline">Try Again</Button>
    </div>
  </div>
);

export default DatasetErrorState;
