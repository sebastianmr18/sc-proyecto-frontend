"use client"
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import AdminContext from '@/app/_context/adminContext';
import FormModal from '@/app/admin/components/FormModal';
import ConfirmModal from '@/app/admin/components/ConfirmModal';
import toast, { Toaster } from 'react-hot-toast';

interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
}

const AdminUsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const [selectedUser, setSelectedUser] = useState<Record<string, any> | User | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);    
    const [fieldConfig, setFieldConfig] = useState<{ [key: string]: { disabled?: boolean; required?: boolean } }>({});

    const defaultUser = {
        user_id: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    };

    const createFieldConfig = {
        user_id: { disabled: false, required: true },
        email: { disabled: false, required: true },
        first_name: { disabled: false, required: true },
        last_name: { disabled: false, required: true },
        password: { disabled: false, required: true },
        confirm_password: { disabled: false, required: true },
    };    

    const updateFieldConfig  = {
        user_id: { disabled: true, required: false },
        email: { disabled: false, required: true },
        first_name: { disabled: false, required: true },
        middle_name: { disabled: false, required: false },
        last_name: { disabled: false, required: true },
        second_last_name: { disabled: false, required: false },
        contact_number: { disabled: false, required: false },
        address: { disabled: false, required: false },
        role: { disabled: false, required: true },
        is_active: { disabled: false, required: false },
        is_staff: { disabled: false, required: false },
    };

    const fieldOptions = {
        rol: ["cliente", "administador"],
        is_active: ["true", "false"],
        is_staff: ["true", "false"]
    }

    useEffect(() => {
        fetchUsers();
    }, []);    

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
            toast.error('Error al obtener los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedUser(defaultUser);
        setFieldConfig(createFieldConfig);
        setIsModalOpen(true);
        setIsUpdating(false);
    }
    const handleUpdate = (id: Record<string, any>) => {
        const user = users.find(user => user.user_id === id);
        setSelectedUser(user);
        setFieldConfig(updateFieldConfig);
        console.log('Selected user', user);
        setIsModalOpen(true);
        setIsUpdating(true);
    };

    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(`/api/users?user_id=${id}`);
            console.log('Response', response);
            toast.success('Usuario eliminado con éxito');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
            toast.error('Error al eliminar el usuario');            
        }
    }
    const handleSave = async (data: any) => {
        setIsSaving(true);        
        try {
            if (isUpdating) {
                const response = await axios.put('/api/users', data);
                console.log('Response', response);
                if (response.data.status === 400 && response.data.data.email) {
                    toast.error(response.data.data.email[0]);
                } else {
                    
                    toast.success('Usuario actualizado con éxito');
                }
            } else {
                const response = await axios.post('/api/users/register/', data);
                console.log('Response', response);
                if (response.data.status === 400 && response.data.data.email) {
                    toast.error(response.data.data.email[0]);
                } else {                    
                    toast.success('Usuario creado con éxito');
                }
            }
            fetchUsers();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving user', error);
            toast.error('Error al guardar el usuario');
        } finally {
            setIsSaving(false);
        }
    }
    
    const openConfirmModal = (id: number) => {
        setUserIdToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setUserIdToDelete(null);
        setIsConfirmModalOpen(false);
    };

    const confirmDelete = () => {
        if (userIdToDelete !== null) {
            handleDelete(userIdToDelete);
        }
        closeConfirmModal();
    };

    return (
        <AdminContext>
            <Toaster />
            <div className="flex flex-col items-center h-screen bg-blue-400">
                <h1 className="text-4xl font-bold mt-20 mb-4">Administrar Usuarios</h1>
                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 h-[60vh] flex flex-col overflow-hidden">
                        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
                        <div className="overflow-x-auto overflow-y-auto flex-grow">
                            <table className="w-full border-collapse min-w-max">
                                <thead>
                                    <tr>
                                        {users.length > 0 &&
                                            Object.keys(users[0]).map((key) => (
                                                <th key={key} className="border-b-2 p-2 text-left capitalize">
                                                    {key}
                                                </th>
                                            ))}
                                        <th className="border-b-2 p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.user_id}>
                                                {Object.entries(user).map(([key, value]) => (
                                                    <td key={`${user.user_id}-${key}`} className="border-b p-2">
                                                        {typeof value === 'string' || typeof value === 'number'
                                                            ? value
                                                            : JSON.stringify(value)}
                                                    </td>
                                                ))}
                                                <td key={`${user.user_id}-actions`} className="border-b p-2">
                                                    <button
                                                        onClick={() => handleUpdate(user.user_id)}
                                                        className="text-blue-600 hover:underline mr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => openConfirmModal(user.user_id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={Object.keys(users[0] || {}).length + 1} className="text-center p-4">
                                                No hay datos disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                             {/* Modal de edición */}
                            <FormModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                data={selectedUser}                                
                                onSave={handleSave}
                                title={isUpdating ? "Editar Usuario" : "Crear Usuario"}
                                isSaving={isSaving}
                                fieldConfig={fieldConfig}
                                options={fieldOptions}
                            />
                            { /* Modal de confirmación */ }
                            <ConfirmModal
                                isOpen={isConfirmModalOpen}
                                onClose={closeConfirmModal}
                                onConfirm={confirmDelete}
                                title="Confirmar eliminación"
                                message="¿Está seguro de que desea eliminar este usuario?"
                            />
                        </div>
                        <button
                            onClick={handleCreate}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg self-start disabled:opacity-50"
                        >
                            Crear Nuevo
                        </button>
                    </div>
                )}
            </div>
        </AdminContext>
    );
};

export default AdminUsersPage;