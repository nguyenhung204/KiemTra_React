import { useState, useEffect } from 'react'
import StudentItem from './components/StudentItem'
import './App.css'

function App() {
  // Load students from localStorage or use default data if none exists
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [
      { id: 1, name: "Nguyễn Văn A", class: "CNTT1", age: 20 },
      { id: 2, name: "Trần Thị B", class: "CNTT2", age: 21 },
      { id: 3, name: "Lê Văn C", class: "HTTT1", age: 22 },
      { id: 4, name: "Phạm Thị D", class: "CNTT1", age: 20 },
      { id: 5, name: "Hoàng Văn E", class: "HTTT2", age: 21 }
    ];
  });

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

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

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

  // Reset localStorage
  const handleResetData = () => {
    if (confirm("Bạn có chắc chắn muốn xoá tất cả dữ liệu và khôi phục dữ liệu mẫu?")) {
      localStorage.removeItem('students');
      setStudents([
        { id: 1, name: "Nguyễn Văn A", class: "CNTT1", age: 20 },
        { id: 2, name: "Trần Thị B", class: "CNTT2", age: 21 },
        { id: 3, name: "Lê Văn C", class: "HTTT1", age: 22 },
        { id: 4, name: "Phạm Thị D", class: "CNTT1", age: 20 },
        { id: 5, name: "Hoàng Văn E", class: "HTTT2", age: 21 }
      ]);
      setSearchTerm("");
      setSelectedClass("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="container mx-auto px-4 pb-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 drop-shadow-sm">
          Quản lý Sinh viên
        </h1>
        
        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="search" className="block mb-2 font-medium text-gray-700">
                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Tìm kiếm sinh viên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Nhập tên sinh viên cần tìm..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <label htmlFor="class-filter" className="block mb-2 font-medium text-gray-700">
                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Lọc theo lớp
              </label>
              <div className="relative">
                <select
                  id="class-filter"
                  value={selectedClass}
                  onChange={handleClassFilterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none transition-all pr-10"
                >
                  <option value="">Tất cả các lớp</option>
                  {availableClasses.map(className => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add Student Form */}
        {!isEditing && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
              Thêm Sinh viên mới
            </h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Nhập tên sinh viên"
                  />
                </div>
                <div>
                  <label htmlFor="class" className="block mb-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                    </svg>
                    Lớp
                  </label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={newStudent.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Nhập lớp"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block mb-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Tuổi
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={newStudent.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Nhập tuổi"
                    min="1"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button 
                  type="button" 
                  onClick={handleResetData}
                  className="flex items-center px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Khôi phục dữ liệu mẫu
                </button>
                <button 
                  type="submit" 
                  className="flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                  </svg>
                  Thêm sinh viên
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Student Form */}
        {isEditing && editingStudent && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
              Chỉnh sửa thông tin sinh viên
            </h2>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="edit-name" className="block mb-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editingStudent.name}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Nhập tên sinh viên"
                  />
                </div>
                <div>
                  <label htmlFor="edit-class" className="block mb-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                    </svg>
                    Lớp
                  </label>
                  <input
                    type="text"
                    id="edit-class"
                    name="class"
                    value={editingStudent.class}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Nhập lớp"
                  />
                </div>
                <div>
                  <label htmlFor="edit-age" className="block mb-2 font-medium text-gray-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Tuổi
                  </label>
                  <input
                    type="number"
                    id="edit-age"
                    name="age"
                    value={editingStudent.age}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Nhập tuổi"
                    min="1"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  className="flex items-center px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Huỷ
                </button>
                <button 
                  type="submit" 
                  className="flex items-center px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ và Tên</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuổi</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <StudentItem 
                      key={student.id}
                      student={student}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteStudent}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center py-6">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-lg font-medium">Không tìm thấy sinh viên nào phù hợp.</p>
                        <p className="text-sm text-gray-400">Hãy thử thay đổi bộ lọc hoặc thêm sinh viên mới.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Quản lý Sinh viên - Được tạo với React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

export default App
