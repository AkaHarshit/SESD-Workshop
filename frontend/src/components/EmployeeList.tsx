import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Employee, EmployeeFormData, PaginatedResponse } from '../types';
import { EmployeeModal } from './EmployeeModal';

export function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalEmployee, setModalEmployee] = useState<Employee | null | undefined>(undefined);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    minSalary: '',
    maxSalary: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc'
  });

  const [departments, setDepartments] = useState<string[]>([]);

  const loadEmployees = async (pageOverride?: number) => {
    setLoading(true);
    setError('');
    const page = pageOverride ?? pagination.page;
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.limit),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      });
      if (filters.search) params.set('search', filters.search);
      if (filters.department) params.set('department', filters.department);
      if (filters.status) params.set('status', filters.status);
      if (filters.minSalary) params.set('minSalary', filters.minSalary);
      if (filters.maxSalary) params.set('maxSalary', filters.maxSalary);

      const res = await api<PaginatedResponse<Employee>>(`/employees?${params}`);
      setEmployees(res.data);
      setPagination((p) => ({ ...p, ...res.pagination }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await api<{ success: boolean; data: string[] }>('/employees/departments');
      setDepartments(res.data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [pagination.page]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleSearch = () => {
    setPagination((p) => ({ ...p, page: 1 }));
    loadEmployees(1);
  };

  const handleCreate = async (data: EmployeeFormData) => {
    await api('/employees', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    loadEmployees();
  };

  const handleUpdate = async (data: EmployeeFormData) => {
    if (!modalEmployee) return;
    await api(`/employees/${modalEmployee._id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    setModalEmployee(undefined);
    loadEmployees();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this employee?')) return;
    await api(`/employees/${id}`, { method: 'DELETE' });
    loadEmployees();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={filters.department}
            onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="terminated">Terminated</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min salary"
              value={filters.minSalary}
              onChange={(e) => setFilters((f) => ({ ...f, minSalary: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Max salary"
              value={filters.maxSalary}
              onChange={(e) => setFilters((f) => ({ ...f, maxSalary: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="department">Department</option>
            <option value="salary">Salary</option>
            <option value="hireDate">Hire Date</option>
            <option value="status">Status</option>
            <option value="createdAt">Created</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortOrder: e.target.value as 'asc' | 'desc' }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Apply
          </button>
          <button
            onClick={() => setModalEmployee(null)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Employee
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : employees.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No employees found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Salary</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.position}</td>
                    <td className="px-4 py-3">${emp.salary.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          emp.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : emp.status === 'on_leave'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setModalEmployee(emp)}
                        className="text-indigo-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages} ({pagination.totalCount} total)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                disabled={!pagination.hasPrev}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                disabled={!pagination.hasNext}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {modalEmployee !== undefined && (
        <EmployeeModal
          employee={modalEmployee}
          onClose={() => setModalEmployee(undefined)}
          onSave={modalEmployee ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
}
