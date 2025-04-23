import { useState, useEffect } from 'react'
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

  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);

  // Get unique classes for filter dropdown
  useEffect(() => {
    const classes = [...new Set(students.map(student => student.class))];
    setAvailableClasses(classes);
  }, [students]);

  // Filter students when search term or selected class changes
  useEffect(() => {
    let filtered = [...students];
    
    // Filter by name if search term exists
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by class if selected
    if (selectedClass) {
      filtered = filtered.filter(student => student.class === selectedClass);
    }
    
    setFilteredStudents(filtered);
  }, [searchTerm, selectedClass, students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClassFilterChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent({
      ...editingStudent,
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

  // Delete student function
  const handleDeleteStudent = (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá sinh viên này?")) {
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
    }
  };

  // Edit student functions
  const handleEditClick = (student) => {
    setEditingStudent({...student});
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!editingStudent.name || !editingStudent.class || !editingStudent.age) {
      alert("Vui lòng điền đầy đủ thông tin sinh viên!");
      return;
    }

    // Update the student in the list
    const updatedStudents = students.map(student => 
      student.id === editingStudent.id 
        ? {...editingStudent, age: parseInt(editingStudent.age)} 
        : student
    );
    
    setStudents(updatedStudents);
    setIsEditing(false);
    setEditingStudent(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quản lý Sinh viên</h1>
      
      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="search" className="block mb-1 font-medium">Tìm kiếm sinh viên</label>
            <input
              type="text"
              id="search"
              placeholder="Nhập tên sinh viên cần tìm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="class-filter" className="block mb-1 font-medium">Lọc theo lớp</label>
            <select
              id="class-filter"
              value={selectedClass}
              onChange={handleClassFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả các lớp</option>
              {availableClasses.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Add Student Form */}
      {!isEditing && (
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
      )}

      {/* Edit Student Form */}
      {isEditing && editingStudent && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin sinh viên</h2>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="edit-name" className="block mb-1 font-medium">Họ và Tên</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingStudent.name}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên sinh viên"
                />
              </div>
              <div>
                <label htmlFor="edit-class" className="block mb-1 font-medium">Lớp</label>
                <input
                  type="text"
                  id="edit-class"
                  name="class"
                  value={editingStudent.class}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập lớp"
                />
              </div>
              <div>
                <label htmlFor="edit-age" className="block mb-1 font-medium">Tuổi</label>
                <input
                  type="number"
                  id="edit-age"
                  name="age"
                  value={editingStudent.age}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tuổi"
                  min="1"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Huỷ
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      )}
      
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
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.class}</td>
                <td className="py-2 px-4 border-b">{student.age}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleEditClick(student)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDeleteStudent(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
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
