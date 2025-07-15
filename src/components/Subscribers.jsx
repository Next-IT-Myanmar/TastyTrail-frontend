import React, { useState, useEffect } from 'react';
import { getLetterSubscriptions, deleteLetterSubscription } from '../services/letterService';
import { formatToLocalDateTime } from '../utils/utils';

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [subscriberToDelete, setSubscriberToDelete] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        itemsPerPage: 10
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubscribers = async (page = 1) => {
        try {
            setLoading(true);
            const response = await getLetterSubscriptions(page, pagination.itemsPerPage);
            
            if (!response || !response.data) {
                setError('No data received from server');
                return;
            }
            
            setSubscribers(response.data);
            setPagination({
                currentPage: response.pagination.page,
                totalPages: Math.ceil(response.pagination.total / response.pagination.limit),
                itemsPerPage: response.pagination.limit
            });
            setError(null); // Clear any previous errors
            
        } catch (err) {
            console.error('Error fetching subscribers:', err);
            setError(err.message || 'Failed to fetch subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setSubscriberToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteLetterSubscription(subscriberToDelete);
            fetchSubscribers(pagination.currentPage);
        } catch (err) {
            setError('Failed to delete subscription');
        } finally {
            setIsDeleteModalOpen(false);
            setSubscriberToDelete(null);
        }
    };

    const handleLimitChange = (newLimit) => {
        setPagination(prev => ({
            ...prev,
            itemsPerPage: newLimit,
            currentPage: 1,
            totalPages: Math.ceil(prev.total / newLimit)
        }));
        fetchSubscribers(1, newLimit);
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handlePageChange = (page) => {
        fetchSubscribers(page);
    };

    if (loading) return <div className="flex justify-center p-8">Loading...</div>;
    if (error) return <div className="text-red-500 p-8">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Subscribers</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {subscribers.map((subscriber) => (
                            <tr key={subscriber.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatToLocalDateTime(new Date(subscriber.createdAt), 'PPp')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatToLocalDateTime(new Date(subscriber.updatedAt), 'PPp')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        onClick={() => handleDelete(subscriber.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div 
                    className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    <div 
                        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-bold mb-4 pr-8">Delete Confirmation</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this subscription? This action cannot be undone.</p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <select
                        value={pagination.itemsPerPage}
                        onChange={e => handleLimitChange(Number(e.target.value))}
                        className="px-2 py-1 border rounded-lg"
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <span className="text-gray-600">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-3 py-1 border rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {(() => {
                        const pageNumbers = [];
                        const totalPages = pagination.totalPages;
                        const currentPage = pagination.currentPage;

                        if (totalPages <= 7) {
                            for (let i = 1; i <= totalPages; i++) {
                                pageNumbers.push(i);
                            }
                        } else {
                            pageNumbers.push(1);
                            
                            if (currentPage > 3) {
                                pageNumbers.push('...');
                            }
                            
                            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                                pageNumbers.push(i);
                            }
                            
                            if (currentPage < totalPages - 2) {
                                pageNumbers.push('...');
                            }
                            
                            if (totalPages > 1) {
                                pageNumbers.push(totalPages);
                            }
                        }
                        
                        return pageNumbers.map((pageNumber, index) => (
                            pageNumber === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                            ) : (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-3 py-1 border rounded-lg ${
                                        currentPage === pageNumber
                                            ? 'bg-[#f99109] text-white'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        ));
                    })()}

                    <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-3 py-1 border rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscribers;