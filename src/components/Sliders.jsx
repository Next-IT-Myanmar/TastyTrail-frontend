import React, { useState, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSort } from 'react-icons/fa';
import SliderImage from '../assets/images/slider1.jpg';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

const Sliders = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [sliderToDelete, setSliderToDelete] = useState(null);
  

  const [sliders, setSliders] = useState([
    {
      id: 1,
      title: 'Special Offer',
      description: 'Get 20% off on all menu items',
      image: 'https://example.com/slider1.jpg',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ]);

  const handleModal = (mode, slider = null) => {
    setModalMode(mode);
    setSelectedSlider(slider);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setSliderToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setSliders(sliders.filter(slider => slider.id !== sliderToDelete));
    setIsDeleteModalOpen(false);
    setSliderToDelete(null);
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
            src={SliderImage} 
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
              className="text-yellow-500 hover:text-yellow-700"
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
    data: sliders,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
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
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
          />
          <button
            onClick={() => handleModal('create')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 w-full sm:w-auto"
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
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border rounded-lg"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span className="text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
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
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-yellow-500 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            ));
          })()}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Create/Edit/View Modal */}
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
              {modalMode === 'create' ? 'Add New Slider' : 
               modalMode === 'edit' ? 'Edit Slider' : 'Slider Details'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  defaultValue={selectedSlider?.title}
                  readOnly={modalMode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows="3"
                  defaultValue={selectedSlider?.description}
                  readOnly={modalMode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  className="mt-1 block w-full"
                  accept="image/*"
                  disabled={modalMode === 'view'}
                />
                {selectedSlider?.image && (
                  <img
                    src={SliderImage}
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
                    className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
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