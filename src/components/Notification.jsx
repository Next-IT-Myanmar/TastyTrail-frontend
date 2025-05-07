import React, { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort } from 'react-icons/fa';
// import { createNotification, getNotificationLists, deleteNotification } from '../services/notificationService';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../redux/slices/messageSlice';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const Notification = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotificationLists(pageInfo.currentPage, pageInfo.limit);

      if (response && response.data) {
        setNotifications(response.data);
        setPageInfo(prev => ({
          ...prev,
          total: response.pagination.total,
          currentPage: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: Math.ceil(response.pagination.total / response.pagination.limit)
        }));
      }
    } catch (error) {
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to fetch notifications' 
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleModal = (mode, notification = null) => {
    setModalMode(mode);
    setSelectedNotification(notification);
    if (notification) {
      setFormData({
        title: notification.title,
        description: notification.description,
        image: notification.image
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: null
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setNotificationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteNotification(notificationToDelete);
      if (response) {
        dispatch(sendMessage({ type: 'success', text: 'Notification deleted successfully!' }));
        fetchNotifications();
      }
    } catch (error) {
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to delete notification' 
      }));
    } finally {
      setIsDeleteModalOpen(false);
      setNotificationToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      const response = await createNotification(formDataToSend);
      
      if (response) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', image: null });
        setPreviewImage(null);
        dispatch(sendMessage({ type: 'success', text: 'Notification created successfully!' }));
        fetchNotifications();
      }
    } catch (error) {
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to create notification' 
      }));
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Image',
        accessorKey: 'image',
        cell: ({ row }) => (
          <img 
            src={`${import.meta.env.VITE_API_BASE_URL}/${row.original.image}`}
            alt={row.original.title}
            className="h-8 w-8 object-cover rounded-full"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/32';
            }}
          />
        ),
      },
      {
        header: 'Title',
        accessorKey: 'title',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleModal('view', row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEye />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: notifications,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex: pageInfo.currentPage - 1,
        pageSize: pageInfo.limit,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(pageInfo.total / pageInfo.limit),
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    fetchNotifications();
  }, [pageInfo.currentPage, pageInfo.limit]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search notifications..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f99109] w-full sm:w-auto"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-[#f99109] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 w-full sm:w-auto"
          >
            <FaPlus /> Add Notification
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === 'create' ? 'Create Notification' : 'View Notification'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                  required
                  readOnly={modalMode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f99109] focus:ring-[#f99109]"
                  required
                  readOnly={modalMode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                  accept="image/*"
                  disabled={modalMode === 'view'}
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded" />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                {modalMode === 'create' && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f99109] text-white rounded-lg hover:bg-yellow-600"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Delete Notification</h2>
            <p>Are you sure you want to delete this notification?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;