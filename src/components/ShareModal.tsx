import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download } from 'lucide-react';
import { buttonStyles } from '../styles/common';
import { artistData } from '../constants/data';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  artistName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  artistName
}) => {
  if (!isOpen) return null;

  const handleDownloadQR = () => {
    const svg = document.getElementById('share-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${artistName.toLowerCase()}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold mb-4">Share Profile</h3>
        
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg">
            <QRCodeSVG
              id="share-qr-code"
              value={url}
              size={240}
              level="H"
              includeMargin
              bgColor="transparent"
              fgColor="white"
              imageSettings={{
                src: artistData.image,
                x: undefined,
                y: undefined,
                height: 60,
                width: 60,
                excavate: true,
              }}
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleDownloadQR}
              className={`${buttonStyles.primary} w-full px-4 py-3 rounded-full flex items-center justify-center gap-2`}
            >
              <Download className="w-5 h-5" />
              Download QR Code
            </button>
          </div>

          <div className="text-center space-y-2">
            <p className="font-medium dark:text-gray-200 text-gray-700">
              {artistName}'s Profile
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Scan to visit the profile or download to share
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};