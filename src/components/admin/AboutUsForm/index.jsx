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
import { Trash2, Edit2, Plus, ChevronDown, ChevronUp } from "lucide-react";

const AboutUsForm = () => {
  const initialFormState = {
    mainTitle: "",
    mainDescription: "",
    sections: [
      {
        title: "",
        description: "",
        imageUrl: "",
      },
    ],
    mission: {
      title: "",
      description: "",
    },
    vision: {
      title: "",
      description: "",
    },
    type: "mainContent",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [aboutUsContents, setAboutUsContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    fetchAboutUsContent();
  }, []);

  const fetchAboutUsContent = async () => {
    try {
      const aboutUsRef = collection(db, "aboutUs");
      const q = query(aboutUsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const contents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAboutUsContents(contents);
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

  const handleSectionChange = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      sections: newSections,
    }));
  };

  const handleMissionVisionChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { title: "", description: "", imageUrl: "" },
      ],
    }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (content) => {
    setFormData({
      mainTitle: content.mainTitle || "",
      mainDescription: content.mainDescription || "",
      sections: content.sections || [
        { title: "", description: "", imageUrl: "" },
      ],
      mission: content.mission || { title: "", description: "" },
      vision: content.vision || { title: "", description: "" },
      type: content.type || "mainContent",
    });
    setEditingId(content.id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        await deleteDoc(doc(db, "aboutUs", id));
        setSuccessMessage("Content deleted successfully!");
        fetchAboutUsContent();
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
        const docRef = doc(db, "aboutUs", editingId);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, "aboutUs"), {
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
      fetchAboutUsContent();
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
            Manage About Us Content
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
              <h2 className="text-xl font-semibold mb-4 text-white">
                {editingId ? "Edit Content" : "New Content"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Main Title
                  </label>
                  <input
                    type="text"
                    name="mainTitle"
                    value={formData.mainTitle}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Main Description
                  </label>
                  <textarea
                    name="mainDescription"
                    value={formData.mainDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-200">
                      Content Sections
                    </label>
                    <button
                      type="button"
                      onClick={addSection}
                      className="text-red-500 hover:text-red-400"
                    >
                      + Add Section
                    </button>
                  </div>

                  {formData.sections.map((section, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 rounded-lg p-4 border border-zinc-700"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white font-medium">
                          Section {index + 1}
                        </h3>
                        {formData.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className="text-red-500 hover:text-red-400"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            handleSectionChange(index, "title", e.target.value)
                          }
                          placeholder="Section Title"
                          className="w-full rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <textarea
                          value={section.description}
                          onChange={(e) =>
                            handleSectionChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Section Description"
                          rows="3"
                          className="w-full rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="url"
                          value={section.imageUrl}
                          onChange={(e) =>
                            handleSectionChange(
                              index,
                              "imageUrl",
                              e.target.value
                            )
                          }
                          placeholder="Image URL"
                          className="w-full rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                    <h3 className="text-white font-medium mb-3">Mission</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.mission.title}
                        onChange={(e) =>
                          handleMissionVisionChange(
                            "mission",
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Mission Title"
                        className="w-full rounded-lg bg-black border-zinc-700 text-white"
                        required
                      />
                      <textarea
                        value={formData.mission.description}
                        onChange={(e) =>
                          handleMissionVisionChange(
                            "mission",
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Mission Description"
                        rows="3"
                        className="w-full rounded-lg bg-black border-zinc-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                    <h3 className="text-white font-medium mb-3">Vision</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.vision.title}
                        onChange={(e) =>
                          handleMissionVisionChange(
                            "vision",
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Vision Title"
                        className="w-full rounded-lg bg-black border-zinc-700 text-white"
                        required
                      />
                      <textarea
                        value={formData.vision.description}
                        onChange={(e) =>
                          handleMissionVisionChange(
                            "vision",
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Vision Description"
                        rows="3"
                        className="w-full rounded-lg bg-black border-zinc-700 text-white"
                        required
                      />
                    </div>
                  </div>
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
                        : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
          {aboutUsContents.map((content) => (
            <div
              key={content.id}
              className="bg-black rounded-lg shadow-lg overflow-hidden border border-zinc-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {content.mainTitle}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {content.mainDescription}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(content)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === content.id ? null : content.id
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                    >
                      {expandedSection === content.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      {expandedSection === content.id
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  </div>
                </div>

                {expandedSection === content.id && (
                  <div className="mt-6 space-y-6">
                    {/* Sections */}
                    {content.sections && content.sections.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">
                          Sections
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {content.sections.map((section, index) => (
                            <div
                              key={index}
                              className="bg-zinc-900 rounded-lg p-4 border border-zinc-700"
                            >
                              <div className="aspect-w-16 aspect-h-9 mb-4">
                                <img
                                  src={section.imageUrl}
                                  alt={section.title}
                                  className="rounded-lg object-cover w-full h-48"
                                />
                              </div>
                              <h5 className="text-white font-medium mb-2">
                                {section.title}
                              </h5>
                              <p className="text-gray-400 text-sm">
                                {section.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Mission
                        </h4>
                        <h5 className="text-white font-medium mb-2">
                          {content.mission?.title}
                        </h5>
                        <p className="text-gray-400 text-sm">
                          {content.mission?.description}
                        </p>
                      </div>

                      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Vision
                        </h4>
                        <h5 className="text-white font-medium mb-2">
                          {content.vision?.title}
                        </h5>
                        <p className="text-gray-400 text-sm">
                          {content.vision?.description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between text-sm text-gray-500 pt-4 border-t border-zinc-800">
                      <span>
                        Created:{" "}
                        {new Date(content.createdAt).toLocaleDateString()}
                      </span>
                      {content.updatedAt && (
                        <span>
                          Last Updated:{" "}
                          {new Date(content.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsForm;
