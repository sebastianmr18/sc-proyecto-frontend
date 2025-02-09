"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminContext from "@/app/_context/adminContext";
import toast, { Toaster } from "react-hot-toast";

interface Payment {
    payment_id: number,
    amount: number,
    payment_date: string,
    payment_method: string,
    payment_status: string,
    reservation_id: number,
    is_confirmed: boolean,
    coupon_id: number
}

const AdminPaymentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/payments");
            setPayments(response.data);
            console.log('Payments fetched', response.data);
        } catch (error) {
            console.log('Error fetching payments', error);
            toast.error("Error fetching payments");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminContext>
            <Toaster />
            <div className="flex flex-col items-center h-screen bg-blue-400">
                <h1 className="text-4xl font-bold mt-20 mb-4">Administrar Pagos</h1>
                <p className="text-xl font-semibold text-white bg-red-600 px-4 py-2 rounded-lg shadow-md mb-4">
                    🚨 Por motivos de seguridad, en esta página no se puede modificar ningún dato. 🚨
                </p>
                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 h-[60vh] flex flex-col overflow-hidden">
                        <h2 className="text-2xl font-bold mb-4">Pagos</h2>
                        <div className="overflow-x-auto overflow-y-auto flex-grow">
                            <table className="w-full border-collapse min-w-max">
                                <thead>
                                    <tr>
                                        {payments.length > 0 &&
                                            Object.keys(payments[0]).map((key) => (
                                                <th key={key} className="border-b-2 p-2 text-left capitalize">
                                                    {key}
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.length > 0 ? (
                                        payments.map((payment) => (
                                            <tr key={payment.payment_id}>
                                                {Object.entries(payment).map(([key, value]) => (
                                                    <td key={`${payment.payment_id}-${key}`} className="border-b p-2">
                                                        {typeof value === 'string' || typeof value === 'number'
                                                            ? value
                                                            : JSON.stringify(value)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={Object.keys(payments[0] || {}).length} className="text-center p-4">
                                                No hay datos disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminContext>
    );
};

export default AdminPaymentsPage;
