import { useEffect } from 'react';
import type { Employee, EmployeeFormData } from '../types';

interface Props {
  employee?: Employee | null;
  onClose: () => void;
  onSave: (data: EmployeeFormData) => Promise<void>;
}

const initialForm: EmployeeFormData = {
  name: '',
  email: '',
  department: '',
  position: '',
  salary: 0,
  hireDate: new Date().toISOString().split('T')[0],
  status: 'active'
};

export function EmployeeModal({ employee, onClose, onSave }: Props) {
  const isEdit = !!employee;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement)?.value ?? '';
    const data: EmployeeFormData = {
      name: get('name').trim(),
      email: get('email').trim(),
      department: get('department').trim(),
      position: get('position').trim(),
      salary: parseFloat(get('salary')) || 0,
      hireDate: get('hireDate'),
      status: get('status') as EmployeeFormData['status']
    };
    await onSave(data);
    onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
          <form onSubmit={handleSubmit} id="employee-form" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                name="name"
                defaultValue={employee?.name ?? initialForm.name}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                name="email"
                type="email"
                defaultValue={employee?.email ?? initialForm.email}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <input
                name="department"
                defaultValue={employee?.department ?? initialForm.department}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
              <input
                name="position"
                defaultValue={employee?.position ?? initialForm.position}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
              <input
                name="salary"
                type="number"
                min="0"
                step="0.01"
                defaultValue={employee?.salary ?? initialForm.salary}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
              <input
                name="hireDate"
                type="date"
                defaultValue={
                  employee?.hireDate
                    ? new Date(employee.hireDate).toISOString().split('T')[0]
                    : initialForm.hireDate
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                defaultValue={employee?.status ?? initialForm.status}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                {isEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
