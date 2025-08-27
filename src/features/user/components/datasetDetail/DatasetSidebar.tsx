import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { CheckCircle, Download, ShoppingCart } from 'lucide-react';

interface DatasetSidebarProps {
  isPaid: boolean;
  price?: number;
  user: any;
  isAddingToCart: boolean;
  isDownloading: boolean;
  agreedToTerms: boolean;
  hasDownloaded: boolean;
  onAddToCart: () => void;
  onDownload: () => void;
  setAgreedToTerms: (v: boolean) => void;
  license?: string;
}

const DatasetSidebar: React.FC<DatasetSidebarProps> = ({
  isPaid, price, user, isAddingToCart, isDownloading, agreedToTerms, hasDownloaded, onAddToCart, onDownload, setAgreedToTerms, license
}) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/50 shadow-xl">
    <div className="text-center mb-6">
      {isPaid ? (
        <div className="text-4xl font-black bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">${price}</div>
      ) : (
        <div className="text-3xl font-black text-emerald-600">Free</div>
      )}
      <div className="text-sm text-gray-500">{isPaid ? 'One-time purchase' : 'Open access dataset'}</div>
    </div>
    {isPaid ? (
      <div className="space-y-3">
        <Button onClick={onAddToCart} disabled={isAddingToCart} className="w-full bg-gradient-to-r from-[#1a2240] to-[#24305e] hover:from-[#24305e] hover:to-[#2c3a6b] text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-[#1a2240]/25 hover:shadow-xl hover:shadow-[#1a2240]/40 transition-all duration-300 hover:scale-105 text-lg">
          {!user ? (
            <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart (Login Required)</>
          ) : isAddingToCart ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Adding to Cart...</>
          ) : (
            <><ShoppingCart className="w-5 h-5 mr-2" />Add to Cart</>
          )}
        </Button>
      </div>
    ) : (
      <div className="space-y-4">
        {user && (
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-5 w-5 accent-emerald-600 border-2 border-gray-300 rounded-md bg-white transition-all duration-150 focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="terms-checkbox" className="text-sm text-gray-600 leading-relaxed select-none cursor-pointer">
              I agree to the <a href="/terms-and-conditions" target="_blank" className="text-emerald-600 hover:text-emerald-700 underline">terms and conditions</a> and understand the data usage policies.
            </label>
          </div>
        )}
        <Button onClick={onDownload} disabled={isDownloading || (!!user && (!agreedToTerms || hasDownloaded))} className={`w-full px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${hasDownloaded && user ? 'bg-gray-500 text-white' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-600/25 hover:shadow-emerald-600/40'}`}>
          {!user ? (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download Dataset
            </>
          ) : hasDownloaded ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Already Downloaded
            </>
          ) : isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download Dataset
            </>
          )}
        </Button>
        
        {hasDownloaded && (
          <div className="text-sm text-gray-600 text-center mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
            ℹ️ You have already downloaded this dataset. Check your downloads folder.
          </div>
        )}
      </div>
    )}
    {isPaid && <p className="text-xs text-gray-500 text-center mt-3">Secure payment processing</p>}
  </div>
);

export default DatasetSidebar;
