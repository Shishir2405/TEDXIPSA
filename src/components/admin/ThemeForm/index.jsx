import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Trash2, Edit2, Plus } from 'lucide-react';

const EditionForm = () => {
  const initialFormState = {
    date: "",
    title: "",
    description: "",
    image: "",
    gradient: "bg-gradient-to-br from-purple-600/20 to-red-600/20",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const editionsRef = collection(db, "editions");
      const q = query(editionsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const editionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setEditions(editionsData);
    } catch (err) {
      setError("Failed to load editions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (edition) => {
    setFormData({
      date: edition.date,
      title: edition.title,
      description: edition.description,
      image: edition.image,
      gradient: edition.gradient,
    });
    setEditingId(edition.id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this edition?')) {
      try {
        await deleteDoc(doc(db, "editions", id));
        setSuccessMessage("Edition deleted successfully!");
        fetchEditions();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError("Failed to delete edition");
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setSaving(true);

    try {
      if (editingId) {
        const editionRef = doc(db, "editions", editingId);
        await updateDoc(editionRef, {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      } else {
        const editionsRef = collection(db, "editions");
        await addDoc(editionsRef, {
          ...formData,
          createdAt: new Date().toISOString(),
        });
      }

      setSuccessMessage(`Edition ${editingId ? 'updated' : 'saved'} successfully!`);
      setFormData(initialFormState);
      setEditingId(null);
      setIsFormVisible(false);
      fetchEditions();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(`Failed to ${editingId ? 'update' : 'save'} edition`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Messages */}
        {error && (
          <div className="bg-red-900/50 text-red-200 p-4 rounded-lg border border-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-900/50 text-green-200 p-4 rounded-lg border border-green-700">
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Manage Editions</h1>
          <button
            onClick={() => {
              setFormData(initialFormState);
              setEditingId(null);
              setIsFormVisible(!isFormVisible);
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            {isFormVisible ? 'Close Form' : 'New Edition'}
          </button>
        </div>

        {/* Form */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {editingId ? 'Edit Edition' : 'New Edition'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g., May 4, 2024"
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className={`
                    inline-flex items-center px-6 py-3 rounded-lg text-white
                    ${saving
                      ? "bg-zinc-600 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    }
                  `}
                >
                  {saving ? "Saving..." : (editingId ? "Update Edition" : "Save Edition")}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Editions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editions.map((edition) => (
            <div
              key={edition.id}
              className="bg-black rounded-lg shadow-lg overflow-hidden border border-zinc-800 group"
            >
              <div className="relative h-48">
                <div className={`absolute inset-0 ${edition.gradient} opacity-70`} />
                <img
                  src={edition.image}
                  alt={edition.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-2">{edition.date}</p>
                <h3 className="text-xl font-bold text-white mb-2">{edition.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-3">{edition.description}</p>
                
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(edition)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edition.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditionForm;