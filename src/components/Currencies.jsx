import React, { useState, useMemo, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { createCurrency, getCurrencyLists, updateCurrency, deleteCurrency } from '../services/currencyService';
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

const Currencies = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currencyToDelete, setCurrencyToDelete] = useState(null);
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
    name: '',
    description: '',
    code: '',
    country: '',
    buy: 0,
    sell: 0,
    buyStatus: true,
    sellStatus: true,
    img: null
  });
  const [currencies, setCurrencies] = useState([]);

  // Add this function to fetch currencies
  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      const response = await getCurrencyLists(pageInfo.currentPage, pageInfo.limit);

      if (response && response.data) {
        const sortedData = [...response.data].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCurrencies(sortedData);
      
        // Safely check for data and pagination
        setPageInfo(prev => ({
          ...prev,
          total: response.pagination.total,
          currentPage: response.pagination.page,
          limit: response.pagination.limit,
          totalPages: Math.ceil(response.pagination.total / response.pagination.limit)
        }));
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to fetch currencies' 
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
      setFormData(prev => ({ ...prev, img: file }));
    }
  };

  const handleModal = (mode, currency = null) => {
    setModalMode(mode);
    setSelectedCurrency(currency);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCurrencyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCurrency(currencyToDelete);
      if (response) {
        dispatch(sendMessage({ type: 'success', text: 'Currency deleted successfully!' }));
        fetchCurrencies(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting currency:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || 'Failed to delete currency' 
      }));
    } finally {
      setIsDeleteModalOpen(false);
      setCurrencyToDelete(null);
    }
  };

  // Update the form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('code', e.target.elements.code.value);
      formData.append('buy', e.target.elements.buy.value);
      formData.append('buyStatus', e.target.elements.buyStatus.value);
      formData.append('sell', e.target.elements.sell.value);
      formData.append('sellStatus', e.target.elements.sellStatus.value);
      
      if (e.target.elements.img.files[0]) {
        formData.append('img', e.target.elements.img.files[0]);
      }

      let response;
      if (modalMode === 'create') {
        response = await createCurrency(formData);
      } else if (modalMode === 'edit') {
        formData.append('id', selectedCurrency.id);
        response = await updateCurrency(selectedCurrency.id,formData);
      }
      
      if (response) {
        // Close the modal first
        setIsModalOpen(false);
        // Reset form data
        setFormData({
          description: '',
          code: '',
          buy: 0,
          sell: 0,
          buyStatus: true,
          sellStatus: true,
          img: null
        });
        setPreviewImage(null);
        
        // Show success message
        dispatch(sendMessage({ 
          type: 'success', 
          text: `Currency ${modalMode === 'create' ? 'created' : 'updated'} successfully!` 
        }));
        
        // Refresh the currency list
        fetchCurrencies();
      }
    } catch (error) {
      console.error('Error handling currency:', error);
      dispatch(sendMessage({ 
        type: 'error', 
        text: error?.response?.data?.message || `Failed to ${modalMode} currency` 
      }));
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, [pageInfo.currentPage, pageInfo.limit]);

  useEffect(() => {
    fetchCurrencies();
  }, []);



  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Image',
        accessorKey: 'img',
        cell: ({ row }) => (
          <img 
            src={`${import.meta.env.VITE_API_BASE_URL}/${row.original.img}`}
            alt={row.original.code}
            className="h-8 w-8 object-cover rounded-full"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/32'; // Fallback image
            }}
          />
        ),
      },
      {
        header: 'Code',
        accessorKey: 'code',
      },
      {
        header: 'Buy',
        accessorKey: 'buy',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span>{row.original.buy}</span>
            {row.original.buyStatus ? (
              <FaArrowUp className="text-green-500" />
            ) : (
              <FaArrowDown className="text-red-500" />
            )}
          </div>
        ),
      },
      {
        header: 'Sell',
        accessorKey: 'sell',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span>{row.original.sell}</span>
            {row.original.sellStatus ? (
              <FaArrowUp className="text-green-500" />
            ) : (
              <FaArrowDown className="text-red-500" />
            )}
          </div>
        ),
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
      },
      {
        header: 'Updated At',
        accessorKey: 'updatedAt',
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
              onClick={() => handleModal('edit', row.original)}
              className="text-[#f99109] hover:text-yellow-700"
            >
              <FaEdit />
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
    data: currencies,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex: pageInfo.currentPage - 1,
        pageSize: pageInfo.limit,
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
        <h1 className="text-2xl font-bold text-gray-800">Currencies</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search currencies..."
            className="px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#f99109] w-full sm:w-auto"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-[#f99109] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 w-full sm:w-auto"
          >
            <FaPlus /> Add Currency
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

      {/* // Update pagination section in the return statement */}
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
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
            const totalItems = pageInfo.total ?? 0;
            const itemsPerPage = pageInfo.limit ?? 1;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const currentPage = pageInfo.currentPage ?? 1;
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
            onClick={() => handlePageChange(pageInfo.currentPage + 1)}
            disabled={pageInfo.currentPage === Math.ceil(pageInfo.total / pageInfo.limit)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
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
              {modalMode === 'create' ? 'Add New Currency' : 
               modalMode === 'edit' ? 'Edit Currency' : 'Currency Details'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Currency Code
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.code}
                  readOnly={modalMode === 'view'}
                  placeholder="e.g., USD, EUR, SGD"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Country
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.country}
                  readOnly={modalMode === 'view'}
                  placeholder="e.g., United States, Singapore"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.name}
                  readOnly={modalMode === 'view'}
                  placeholder="e.g., Dollar, Pound, Euro"
                  required
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Buy Price
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="buy"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.buy}
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Buy Status
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="buyStatus"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.buyStatus}
                  disabled={modalMode === 'view'}
                  required
                >
                  <option value={true}>Up</option>
                  <option value={false}>Down</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sell Price
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name='sell'
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.sell}
                  readOnly={modalMode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sell Status
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="sellStatus"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f99109] focus:border-[#f99109] px-4 py-2"
                  defaultValue={selectedCurrency?.sellStatus}
                  disabled={modalMode === 'view'}
                  required
                >
                  <option value={true}>Up</option>
                  <option value={false}>Down</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency Image
                  <span className="text-red-500">*</span>
                </label>
                {(selectedCurrency?.img || previewImage) && (
                  <div className="mt-2 mb-4">
                    <img 
                      src={previewImage || `${import.meta.env.VITE_API_BASE_URL}/${selectedCurrency?.img}`}
                      alt={`${selectedCurrency?.name || 'New'} image`} 
                      className="h-24 w-24 object-cover rounded-lg border"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="img"
                  className="mt-1 block w-full"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={modalMode === 'view'}
                  required={modalMode === 'create'}
                />
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
                    {modalMode === 'create' ? 'Create' : 'Update'}
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
            <p className="text-gray-600 mb-6">Are you sure you want to delete this currency? This action cannot be undone.</p>

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

export default Currencies;