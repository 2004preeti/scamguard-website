import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Upload, Search, Loader2 } from 'lucide-react';

const OCRScanner = ({ onScanResult }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      scanImage(file);
    }
  };

  const scanImage = (file) => {
    setLoading(true);
    Tesseract.recognize(file, 'eng', { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setLoading(false);
        // Text milne ke baad hum sirf numbers ya links nikal sakte hain
        onScanResult(text);
      })
      .catch((err) => {
        setLoading(false);
        alert('Error reading image');
      });
  };

  return (
    <div style={ocrStyles.card}>
      <h3>
        <Upload size={20} /> AI Screenshot Scanner
      </h3>
      <p>Upload a screenshot of a suspicious message</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="ocr-upload"
        style={{ display: 'none' }}
      />

      <label htmlFor="ocr-upload" style={ocrStyles.uploadBtn}>
        {loading ? <Loader2 className="animate-spin" /> : 'Select Screenshot'}
      </label>

      {image && <img src={image} alt="preview" style={ocrStyles.preview} />}
    </div>
  );
};

const ocrStyles = {
  card: {
    background: 'rgba(255,255,255,0.05)',
    padding: '30px',
    borderRadius: '24px',
    border: '1px dashed rgba(255,255,255,0.2)',
    textAlign: 'center',
    marginTop: '40px',
  },
  uploadBtn: {
    display: 'inline-block',
    padding: '12px 25px',
    background: '#2563eb',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '15px',
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    maxWidth: '200px',
    marginTop: '20px',
    borderRadius: '10px',
    border: '2px solid #60a5fa',
  },
};

export default OCRScanner;
