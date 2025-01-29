import React, { useState, useEffect } from 'react';
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

const SpeakerForm = () => {
  const initialFormState = {
    name: '',
    title: '',
    image: '',
    gradient: 'from-red-500/20 to-purple-500/20'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const speakersRef = collection(db, "speakers");
      const q = query(speakersRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const speakerData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setSpeakers(speakerData);
    } catch (err) {
      setError('Failed to load speakers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (speaker) => {
    setFormData({
      name: speaker.name,
      title: speaker.title,
      image: speaker.image,
      gradient: speaker.gradient || 'from-red-500/20 to-purple-500/20'
    });
    setEditingId(speaker.id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      try {
        await deleteDoc(doc(db, "speakers", id));
        setSuccessMessage("Speaker deleted successfully!");
        fetchSpeakers();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError("Failed to delete speaker");
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setSaving(true);

    try {
      if (editingId) {
        const docRef = doc(db, "speakers", editingId);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, "speakers"), {
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      setSuccessMessage(`Speaker ${editingId ? 'updated' : 'saved'} successfully!`);
      setFormData(initialFormState);
      setEditingId(null);
      setIsFormVisible(false);
      fetchSpeakers();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(`Failed to ${editingId ? 'update' : 'save'} speaker`);
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
          <h1 className="text-2xl font-bold text-white">Manage Speakers</h1>
          <button
            onClick={() => {
              setFormData(initialFormState);
              setEditingId(null);
              setIsFormVisible(!isFormVisible);
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            {isFormVisible ? 'Close Form' : 'New Speaker'}
          </button>
        </div>

        {/* Form */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {editingId ? 'Edit Speaker' : 'New Speaker'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Talk Title
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

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Gradient
                  </label>
                  <select
                    name="gradient"
                    value={formData.gradient}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="from-red-500/20 to-purple-500/20">Red to Purple</option>
                    <option value="from-blue-500/20 to-purple-600/20">Blue to Purple</option>
                    <option value="from-red-600/20 to-purple-500/20">Dark Red to Purple</option>
                    <option value="from-blue-400/20 to-purple-600/20">Light Blue to Purple</option>
                  </select>
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
                  {saving ? "Saving..." : (editingId ? "Update Speaker" : "Save Speaker")}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Speakers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-black rounded-lg border border-zinc-800">
              <p className="text-gray-400 text-lg">No speakers available</p>
              <button
                onClick={() => {
                  setFormData(initialFormState);
                  setIsFormVisible(true);
                }}
                className="mt-4 text-red-500 hover:text-red-400"
              >
                Add your first speaker
              </button>
            </div>
          ) : (
            speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-black rounded-lg shadow-lg overflow-hidden border border-zinc-800 group"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${speaker.gradient} opacity-70`} />
                  <img 
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-gray-400 text-sm mb-2">{speaker.name}</h3>
                  <p className="text-white text-lg font-bold leading-tight mb-4">
                    {speaker.title}
                  </p>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(speaker)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(speaker.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerForm;