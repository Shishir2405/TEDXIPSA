// src/components/admin/ContentForm/index.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const ContentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    paragraphs: [''],
    buttonText: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchExistingContent = async () => {
      try {
        const cardContentRef = collection(db, "cardContent");
        const q = query(cardContentRef, where("type", "==", "tedxThoughts"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const content = querySnapshot.docs[0].data();
          setFormData({
            title: content.title || '',
            subtitle: content.subtitle || '',
            paragraphs: content.paragraphs || [''],
            buttonText: content.buttonText || '',
            imageUrl: content.imageUrl || '',
          });
        }
      } catch (err) {
        setError('Failed to load existing content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingContent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData(prev => ({
      ...prev,
      paragraphs: newParagraphs
    }));
  };

  const addParagraph = () => {
    setFormData(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, '']
    }));
  };

  const removeParagraph = (index) => {
    setFormData(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setSaving(true);

    try {
      const cardContentRef = collection(db, "cardContent");
      const q = query(cardContentRef, where("type", "==", "tedxThoughts"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create new document
        await addDoc(cardContentRef, {
          ...formData,
          type: "tedxThoughts",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        // Update existing document
        const docRef = doc(db, "cardContent", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: new Date().toISOString()
        });
      }
      
      setSuccessMessage('Content saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to save content');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Content</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paragraphs
          </label>
          {formData.paragraphs.map((paragraph, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
              {formData.paragraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParagraph(index)}
                  className="px-3 py-1 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addParagraph}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Paragraph
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button Text
          </label>
          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;

