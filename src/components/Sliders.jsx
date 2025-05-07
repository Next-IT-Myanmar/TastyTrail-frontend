import React, { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort } from 'react-icons/fa';
import SliderImage from '../assets/images/slider1.jpg';
import { useDispatch } from 'react-redux';
import { createSlider, getSliderLists, getSliderDetail, deleteSlider} from '../services/sliderService'
import { sendMessage } from '../redux/slices/messageSlice';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const Sliders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [sliderToDelete, setSliderToDelete] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  })
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  })


  const fetchSliders = async (e) => {
    try {
      setLoading(true);
      const response = await getSliderLists(pageInfo.currentPage, pageInfo.limit)

      if (response) {
        const sortedData = [...response.data].sort((a, b) => b.id - a.id);
        setSliders(sortedData);
      
        // Safely check for data and pagination
        setPageInfo(prev => ({
          ...prev,
          total: response.pagination.total,
          currentPage: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: Math.ceil(response.pagination.total / response.pagination.limit)
        }));
      }
    } catch {
      console.error('Error fetching sliders:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to fetch sliders' 
      }));
    } finally {
      setLoading(false);
    }
  };

  // Add pagination handlers
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(pageInfo.total / pageInfo.limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setPageInfo(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleLimitChange = (newLimit) => {
    setPageInfo(prev => ({
      ...prev,
      limit: newLimit,
      currentPage: 1,
      totalPages: Math.ceil(prev.total / newLimit)
    }));
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

  const handleModal = async (mode, slider = null) => {
    setModalMode(mode);
    
    if (mode === 'view' && slider) {
      try {
        // Set initial data from the table row
        setFormData({
          title: slider.title,
          description: slider.description,
          image: slider.image
        });

        const response = await getSliderDetail(slider.id);
        console.log("response",response)
        if (response) { // Check for nested data structure
          setFormData({
            title: response.data.title || '',
            description: response.data.description || '',
            image: response.data.image || ''
          });
        }
      } catch (error) {
        console.error('Error fetching slider details:', error);
        dispatch(sendMessage({ 
          type: 'error', 
          text: 'Failed to fetch slider details'
        }));
      }
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
    setSliderToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteSlider(sliderToDelete);
      
      if (response) {
        dispatch(sendMessage({ 
          type: 'success', 
          text: 'Slider deleted successfully'
        }));
        fetchSliders(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting slider:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to delete slider'
      }));
    } finally {
      setIsDeleteModalOpen(false);
      setSliderToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      let response;
      if (modalMode === 'create') {
        response = await createSlider(formDataToSend);
      }

      if (response) {
        setIsModalOpen(false);
        setFormData({
          title: '',
          description: '',
          image: null
        });
        setPreviewImage(null);
        fetchSliders();
      }
    } catch (error) {
      console.error('Error handling slider:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || `Failed to ${modalMode} slider` 
      }));
    }
  };

  useEffect(() => {
    fetchSliders();
  }, [pageInfo.currentPage, pageInfo.limit]);

  useEffect(() => {
    fetchSliders();
  }, []);

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
            className="h-16 w-24 object-cover rounded"
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
    data: sliders,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex: pageInfo.currentPage -1,
        pageSize: pageInfo.limit
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const nextState = updater({
          pageIndex: pageInfo.currentPage - 1,
          pageSize: pageInfo.limit,
        });
        handlePageChange(nextState.pageIndex + 1);
      } else {
        handlePageChange(updater.pageIndex + 1);
      }
    },
    manualPagination: true,
    pageCount: Math.ceil(pageInfo.total / pageInfo.limit),
    // onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Sliders</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search sliders..."
            className="px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#f99109] w-full sm:w-auto"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-[#f99109] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 w-full sm:w-auto"
          >
            <FaPlus /> Add Slider
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && <FaSort />}
                    </div>
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <div className="flex items-center gap-2">
          <select
            value={pageInfo.limit}
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
            Page {pageInfo.currentPage} of {Math.ceil(pageInfo.total / pageInfo.limit)}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => handlePageChange(pageInfo.currentPage - 1)}
            disabled={pageInfo.currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          
          {(() => {
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const pageNumbers = [];
            
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
              
              pageNumbers.push(totalPages);
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
            onClick={() => handlePageChange(pageInfo.currentPage + 1)}
            disabled={pageInfo.currentPage === Math.ceil(pageInfo.total / pageInfo.limit)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Create/View Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4 pr-8">
              {modalMode === 'create' ? 'Add New Slider' : 'Slider Details'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  rows="3"
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                  accept="image/*"
                  disabled={modalMode === 'view'}
                  required={modalMode === 'create'}
                />
                {(modalMode === 'view') ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${formData.image}`}
                    alt="Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg"
                  />
                ) : previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 h-32 w-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                {modalMode !== 'view' && (
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#f99109] rounded-md hover:bg-yellow-600"
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
            <p className="text-gray-600 mb-6">Are you sure you want to delete this slider? This action cannot be undone.</p>

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
    </div>
  );
};

export default Sliders;