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

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    age: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!newStudent.name || !newStudent.class || !newStudent.age) {
      alert("Vui lòng điền đầy đủ thông tin sinh viên!");
      return;
    }

    // Create new student object with unique ID
    const studentToAdd = {
      id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      name: newStudent.name,
      class: newStudent.class,
      age: parseInt(newStudent.age)
    };

    // Add the new student to the list
    setStudents([...students, studentToAdd]);

    // Reset the form fields
    setNewStudent({
      name: "",
      class: "",
      age: ""
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quản lý Sinh viên</h1>
      
      {/* Add Student Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Thêm Sinh viên mới</h2>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Họ và Tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên sinh viên"
              />
            </div>
            <div>
              <label htmlFor="class" className="block mb-1 font-medium">Lớp</label>
              <input
                type="text"
                id="class"
                name="class"
                value={newStudent.class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập lớp"
              />
            </div>
            <div>
              <label htmlFor="age" className="block mb-1 font-medium">Tuổi</label>
              <input
                type="number"
                id="age"
                name="age"
                value={newStudent.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tuổi"
                min="1"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Thêm sinh viên
            </button>
          </div>
        </form>
      </div>
      
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
