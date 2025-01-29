import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  Plus,
  UserPlus,
} from "lucide-react";

const TeamManagementForm = () => {
  const initialMemberState = {
    name: "",
    role: "",
    linkedIn: "",
    instagram: "",
    image: "",
    department: "",
    isHead: false,
    order: 0,
  };

  const [formData, setFormData] = useState(initialMemberState);
  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      // Fetch departments
      const deptRef = collection(db, "departments");
      const deptQuery = query(deptRef, orderBy("order", "asc"));
      const deptSnapshot = await getDocs(deptQuery);
      const deptData = deptSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDepartments(deptData);

      // Fetch members
      const membersRef = collection(db, "team");
      const membersQuery = query(membersRef, orderBy("order", "asc"));
      const membersSnapshot = await getDocs(membersQuery);
      const membersData = membersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    } catch (err) {
      setError("Failed to load team data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setSaving(true);

    try {
      const memberData = {
        ...formData,
        order: editingId ? formData.order : members.length,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        const docRef = doc(db, "team", editingId);
        await updateDoc(docRef, memberData);
      } else {
        await addDoc(collection(db, "team"), {
          ...memberData,
          createdAt: new Date().toISOString(),
        });
      }

      setSuccessMessage(
        `Member ${editingId ? "updated" : "added"} successfully!`
      );
      setFormData(initialMemberState);
      setEditingId(null);
      setIsFormVisible(false);
      fetchTeamData();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(`Failed to ${editingId ? "update" : "add"} member`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) return;

    try {
      await addDoc(collection(db, "departments"), {
        name: newDepartment.trim(),
        order: departments.length,
        createdAt: new Date().toISOString(),
      });
      setNewDepartment("");
      fetchTeamData();
      setSuccessMessage("Department added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to add department");
      console.error(err);
    }
  };

  const moveDepartment = async (departmentId, direction) => {
    const currentIndex = departments.findIndex((d) => d.id === departmentId);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= departments.length) return;

    try {
      const batch = writeBatch(db);

      // Update orders
      const currentDept = departments[currentIndex];
      const swapDept = departments[newIndex];

      batch.update(doc(db, "departments", currentDept.id), {
        order: swapDept.order,
      });
      batch.update(doc(db, "departments", swapDept.id), {
        order: currentDept.order,
      });

      await batch.commit();
      fetchTeamData();
    } catch (err) {
      setError("Failed to reorder departments");
      console.error(err);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    if (
      !window.confirm(
        "Are you sure? This will also remove all members in this department."
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "departments", departmentId));
      // Remove members of this department
      const deptMembers = members.filter((m) => m.department === departmentId);
      const batch = writeBatch(db);
      deptMembers.forEach((member) => {
        batch.delete(doc(db, "team", member.id));
      });
      await batch.commit();
      fetchTeamData();
      setSuccessMessage("Department deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete department");
      console.error(err);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "team", memberId));
      fetchTeamData();
      setSuccessMessage("Member deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete member");
      console.error(err);
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

        {/* Departments Management */}
        <div className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-6">
            Manage Departments
          </h2>

          {/* Add Department Form */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="New Department Name"
              className="flex-1 rounded-lg bg-zinc-900 border-zinc-700 text-white"
            />
            <button
              onClick={handleAddDepartment}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={20} />
              Add Department
            </button>
          </div>

          {/* Departments List */}
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <div
                key={dept.id}
                className="flex items-center justify-between bg-zinc-900 p-4 rounded-lg"
              >
                <span className="text-white font-medium">{dept.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveDepartment(dept.id, "up")}
                    disabled={index === 0}
                    className={`p-2 rounded-lg ${
                      index === 0
                        ? "text-gray-500"
                        : "text-white hover:bg-zinc-800"
                    }`}
                  >
                    <ArrowUp size={20} />
                  </button>
                  <button
                    onClick={() => moveDepartment(dept.id, "down")}
                    disabled={index === departments.length - 1}
                    className={`p-2 rounded-lg ${
                      index === departments.length - 1
                        ? "text-gray-500"
                        : "text-white hover:bg-zinc-800"
                    }`}
                  >
                    <ArrowDown size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(dept.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-500/20"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Management */}
        <div className="bg-black rounded-lg shadow-lg p-6 border border-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Team Members</h2>
            <button
              onClick={() => {
                setFormData(initialMemberState);
                setEditingId(null);
                setIsFormVisible(!isFormVisible);
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <UserPlus size={20} />
              {isFormVisible ? "Close Form" : "Add Member"}
            </button>
          </div>

          {/* Member Form */}
          {isFormVisible && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
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
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="isHead"
                      checked={formData.isHead}
                      onChange={handleInputChange}
                      className="rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-white">Department Head</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
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
                    ? "Update Member"
                    : "Add Member"}
                </button>
              </div>
            </form>
          )}

          {/* Members List */}
          {departments.map((dept) => {
            const deptMembers = members.filter((m) => m.department === dept.id);
            const heads = deptMembers.filter((m) => m.isHead);
            const teamMembers = deptMembers.filter((m) => !m.isHead);

            if (deptMembers.length === 0) return null;

            return (
              <div key={dept.id} className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {dept.name}
                </h3>

                {/* Department Heads */}
                {heads.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-red-500 text-sm font-medium mb-3">
                      Department Heads
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {heads.map((member) => (
                        <div
                          key={member.id}
                          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h5 className="text-white font-medium">
                                {member.name}
                              </h5>
                              <p className="text-gray-400 text-sm">
                                {member.role}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => {
                                  setFormData(member);
                                  setEditingId(member.id);
                                  setIsFormVisible(true);
                                }}
                                className="p-2 rounded-lg text-white hover:bg-zinc-800"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="p-2 rounded-lg text-red-500 hover:bg-red-500/20"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {teamMembers.length > 0 && (
                  <div>
                    <h4 className="text-red-500 text-sm font-medium mb-3">
                      Team Members
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h5 className="text-white font-medium">
                                {member.name}
                              </h5>
                              <p className="text-gray-400 text-sm">
                                {member.role}
                              </p>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => {
                                  setFormData(member);
                                  setEditingId(member.id);
                                  setIsFormVisible(true);
                                }}
                                className="p-2 rounded-lg text-white hover:bg-zinc-800"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="p-2 rounded-lg text-red-500 hover:bg-red-500/20"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamManagementForm;
