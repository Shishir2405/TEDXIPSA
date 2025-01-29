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
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Plus, Trash2, Edit2, UserPlus } from "lucide-react";

const EditionDescriptionForm = () => {
  const initialFormState = {
    date: "",
    title: "",
    mainImage: "",
    seekDescription: "",
    thoughtsDescription: "",
    videoUrl: "",
    editionId: "", // Reference to the parent edition
    speakers: [
      {
        name: "",
        title: "",
        image: "",
        link: "#",
      },
    ],
    team: [
      {
        name: "",
        role: "",
        image: "",
        linkedIn: "",
        instagram: "",
      },
    ],
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
      const querySnapshot = await getDocs(editionsRef);
      const editionData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEditions(editionData);
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

  const handleSpeakerChange = (index, field, value) => {
    const newSpeakers = [...formData.speakers];
    newSpeakers[index] = {
      ...newSpeakers[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      speakers: newSpeakers,
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeam = [...formData.team];
    newTeam[index] = {
      ...newTeam[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      team: newTeam,
    }));
  };

  const addSpeaker = () => {
    setFormData((prev) => ({
      ...prev,
      speakers: [
        ...prev.speakers,
        { name: "", title: "", image: "", link: "#" },
      ],
    }));
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        { name: "", role: "", image: "", linkedIn: "", instagram: "" },
      ],
    }));
  };

  const removeSpeaker = (index) => {
    setFormData((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index),
    }));
  };

  const removeTeamMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setSaving(true);

    try {
      const descriptionData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        const docRef = doc(db, "editionDescriptions", editingId);
        await updateDoc(docRef, descriptionData);
      } else {
        await addDoc(collection(db, "editionDescriptions"), {
          ...descriptionData,
          createdAt: new Date().toISOString(),
        });
      }

      setSuccessMessage(
        `Description ${editingId ? "updated" : "saved"} successfully!`
      );
      setFormData(initialFormState);
      setEditingId(null);
      setIsFormVisible(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(`Failed to ${editingId ? "update" : "save"} description`);
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
            Manage Edition Description
          </h1>
          <button
            onClick={() => {
              setFormData(initialFormState);
              setEditingId(null);
              setIsFormVisible(!isFormVisible);
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            {isFormVisible ? "Close Form" : "New Description"}
          </button>
        </div>

        {/* Form */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Edition
                  </label>
                  <select
                    name="editionId"
                    value={formData.editionId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  >
                    <option value="">Select Edition</option>
                    {editions.map((edition) => (
                      <option key={edition.id} value={edition.id}>
                        {edition.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g., SATURDAY, MAY 4, 2024"
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Main Image URL
                  </label>
                  <input
                    type="url"
                    name="mainImage"
                    value={formData.mainImage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Video URL
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Seek Description
                  </label>
                  <textarea
                    name="seekDescription"
                    value={formData.seekDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Thoughts Description
                  </label>
                  <textarea
                    name="thoughtsDescription"
                    value={formData.thoughtsDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>
              </div>

              {/* Speakers Section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Speakers</h3>
                  <button
                    type="button"
                    onClick={addSpeaker}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400"
                  >
                    <Plus size={20} />
                    Add Speaker
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white font-medium">
                          Speaker {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeSpeaker(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={speaker.name}
                          onChange={(e) =>
                            handleSpeakerChange(index, "name", e.target.value)
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={speaker.title}
                          onChange={(e) =>
                            handleSpeakerChange(index, "title", e.target.value)
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={speaker.image}
                          onChange={(e) =>
                            handleSpeakerChange(index, "image", e.target.value)
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="url"
                          placeholder="Talk Link"
                          value={speaker.link}
                          onChange={(e) =>
                            handleSpeakerChange(index, "link", e.target.value)
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Edition Team
                  </h3>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400"
                  >
                    <UserPlus size={20} />
                    Add Team Member
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.team.map((member, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white font-medium">
                          Team Member {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) =>
                            handleTeamMemberChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={member.role}
                          onChange={(e) =>
                            handleTeamMemberChange(
                              index,
                              "role",
                              e.target.value
                            )
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={member.image}
                          onChange={(e) =>
                            handleTeamMemberChange(
                              index,
                              "image",
                              e.target.value
                            )
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                          required
                        />
                        <input
                          type="url"
                          placeholder="LinkedIn URL"
                          value={member.linkedIn}
                          onChange={(e) =>
                            handleTeamMemberChange(
                              index,
                              "linkedIn",
                              e.target.value
                            )
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                        />
                        <input
                          type="url"
                          placeholder="Instagram URL"
                          value={member.instagram}
                          onChange={(e) =>
                            handleTeamMemberChange(
                              index,
                              "instagram",
                              e.target.value
                            )
                          }
                          className="rounded-lg bg-black border-zinc-700 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
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
                    ? "Update Description"
                    : "Save Description"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditionDescriptionForm;
