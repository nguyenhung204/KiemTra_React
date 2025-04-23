import { useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "CNTT1", age: 20 },
    { id: 2, name: "Trần Thị B", class: "CNTT2", age: 21 },
    { id: 3, name: "Lê Văn C", class: "HTTT1", age: 22 },
    { id: 4, name: "Phạm Thị D", class: "CNTT1", age: 20 },
    { id: 5, name: "Hoàng Văn E", class: "HTTT2", age: 21 }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quản lý Sinh viên</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Họ và Tên</th>
              <th className="py-2 px-4 border-b text-left">Lớp</th>
              <th className="py-2 px-4 border-b text-left">Tuổi</th>
              <th className="py-2 px-4 border-b text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.class}</td>
                <td className="py-2 px-4 border-b">{student.age}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
