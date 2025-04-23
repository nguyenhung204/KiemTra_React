import React from 'react';

function StudentItem({ student, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{student.id}</td>
      <td className="py-2 px-4 border-b">{student.name}</td>
      <td className="py-2 px-4 border-b">{student.class}</td>
      <td className="py-2 px-4 border-b">{student.age}</td>
      <td className="py-2 px-4 border-b">
        <button 
          onClick={() => onEdit(student)}
          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
        >
          Sửa
        </button>
        <button 
          onClick={() => onDelete(student.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;