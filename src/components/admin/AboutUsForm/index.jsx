import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Trash2, Edit2, Plus } from "lucide-react";

const ContentForm = () => {
  const initialFormState = {
    title: "",
    subtitle: "",
    paragraphs: [""],
    buttonText: "",
    imageUrl: "",
    type: "tedxThoughts", // Added type field with default value
  };

  const [formData, setFormData] = useState(initialFormState);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const contentRef = collection(db, "cardContent");
      const q = query(
        contentRef,
        where("type", "==", "tedxThoughts"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      const fetchedContents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContents(fetchedContents);
    } catch (err) {
      setError("Failed to load content");
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

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData((prev) => ({
      ...prev,
      paragraphs: newParagraphs,
    }));
  };

  const addParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));
  };

  const removeParagraph = (index) => {
    setFormData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (content) => {
    setFormData({
      title: content.title || "",
      subtitle: content.subtitle || "",
      paragraphs: content.paragraphs || [""],
      buttonText: content.buttonText || "",
      imageUrl: content.imageUrl || "",
      type: content.type || "tedxThoughts",
    });
    setEditingId(content.id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        await deleteDoc(doc(db, "cardContent", id));
        setSuccessMessage("Content deleted successfully!");
        fetchContents();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError("Failed to delete content");
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
        const docRef = doc(db, "cardContent", editingId);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, "cardContent"), {
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      setSuccessMessage(
        `Content ${editingId ? "updated" : "saved"} successfully!`
      );
      setFormData(initialFormState);
      setEditingId(null);
      setIsFormVisible(false);
      fetchContents();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(`Failed to ${editingId ? "update" : "save"} content`);
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
          <h1 className="text-2xl font-bold text-white">
            Manage TEDx Thoughts Content
          </h1>
          <button
            onClick={() => {
              setFormData(initialFormState);
              setEditingId(null);
              setIsFormVisible(!isFormVisible);
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            {isFormVisible ? "Close Form" : "New Content"}
          </button>
        </div>

        {/* Form */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Paragraphs
                    </label>
                    <button
                      type="button"
                      onClick={addParagraph}
                      className="text-red-500 hover:text-red-400"
                    >
                      + Add Paragraph
                    </button>
                  </div>
                  {formData.paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={paragraph}
                        onChange={(e) =>
                          handleParagraphChange(index, e.target.value)
                        }
                        className="flex-1 rounded-lg bg-zinc-900 border-zinc-700 text-white"
                        rows="3"
                        required
                      />
                      {formData.paragraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParagraph(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
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
                    ${
                      saving
                        ? "bg-zinc-600 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }
                  `}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Content"
                    : "Save Content"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Content List */}
        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {content.title}
                  </h3>
                  <p className="text-gray-400">{content.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(content)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
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

export default ContentForm;