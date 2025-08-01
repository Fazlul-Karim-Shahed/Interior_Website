"use client";

import React, { useEffect, useState } from "react";
import { getAllClientsApi, updateClientApi, deleteClientApi } from "@/src/api/ClientApi";
import Loading from "@/src/components/client/Loading/Loading";

export default function AllClientsPage() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editClient, setEditClient] = useState(null);
    const [editName, setEditName] = useState("");
    const [editImage, setEditImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        const res = await getAllClientsApi();
        if (!res.error) setClients(res.data);
        setLoading(false);
    };

    const handleEdit = (client) => {
        setEditClient(client);
        setEditName(client.name);
        setPreview(client.image?.url || null);
        setEditImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submitEdit = async () => {
        setUpdating(true);
        const formData = new FormData();
        formData.append("name", editName);
        if (editImage) formData.append("image", editImage);

        const res = await updateClientApi(editClient._id, formData);
        setUpdating(false);

        if (!res.error) {
            setEditClient(null);
            fetchClients();
        } else {
            alert(res.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this client?")) {
            const res = await deleteClientApi(id);
            if (!res.error) fetchClients();
            else alert(res.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Client List</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {clients.map((client) => (
                        <div key={client._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition">
                            {client.image?.url && <img src={client.image.url} alt={client.name} className="w-24 h-24 object-cover rounded-full mb-3 border" />}
                            <h2 className="font-semibold text-lg">{client.name}</h2>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => handleEdit(client)} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-4 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(client._id)} className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Edit Client</h2>

                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring focus:ring-blue-300"
                        />

                        <label className="block text-sm font-medium mb-1">Client Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && <img src={preview} alt="Preview" className="mt-3 w-28 h-28 object-contain rounded border mx-auto" />}

                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setEditClient(null)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800">
                                Cancel
                            </button>
                            <button onClick={submitEdit} disabled={updating} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50">
                                {updating ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
