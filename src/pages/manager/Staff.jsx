import { useState } from "react";
import {
  FaUserPlus,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaEllipsisV,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendarAlt,
  FaUserShield,
  FaUserTie,
  FaUserFriends,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Staff = () => {
  // Sample staff data
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Nguyen Van Minh",
      avatar: "/images/staff/staff1.jpg",
      email: "minh.nguyen@vietcoffee.com",
      phone: "(123) 456-7890",
      role: "Manager",
      status: "Active",
      hireDate: "2023-03-15",
      lastActive: "2025-06-23",
      address: "123 Coffee Lane, Seattle, WA",
      permissions: ["orders", "products", "staff", "customers", "settings"],
    },
    {
      id: 2,
      name: "Tran Thi Lan",
      avatar: "/images/staff/staff2.jpg",
      email: "lan.tran@vietcoffee.com",
      phone: "(234) 567-8901",
      role: "Barista",
      status: "Active",
      hireDate: "2024-01-10",
      lastActive: "2025-06-24",
      address: "456 Bean Street, Seattle, WA",
      permissions: ["orders"],
    },
    {
      id: 3,
      name: "Pham Quoc Bao",
      avatar: "/images/staff/staff3.jpg",
      email: "bao.pham@vietcoffee.com",
      phone: "(345) 678-9012",
      role: "Cashier",
      status: "Active",
      hireDate: "2024-02-05",
      lastActive: "2025-06-22",
      address: "789 Roast Avenue, Seattle, WA",
      permissions: ["orders", "customers"],
    },
    {
      id: 4,
      name: "Le Minh Hoa",
      avatar: "/images/staff/staff4.jpg",
      email: "hoa.le@vietcoffee.com",
      phone: "(456) 789-0123",
      role: "Inventory Specialist",
      status: "On Leave",
      hireDate: "2023-11-20",
      lastActive: "2025-06-10",
      address: "101 Arabica Drive, Seattle, WA",
      permissions: ["products", "orders"],
    },
    {
      id: 5,
      name: "Hoang Duc Thang",
      avatar: "/images/staff/staff5.jpg",
      email: "thang.hoang@vietcoffee.com",
      phone: "(567) 890-1234",
      role: "Barista",
      status: "Active",
      hireDate: "2024-03-01",
      lastActive: "2025-06-24",
      address: "202 Espresso Way, Seattle, WA",
      permissions: ["orders"],
    },
    {
      id: 6,
      name: "Vu Thanh Mai",
      avatar: "/images/staff/staff6.jpg",
      email: "mai.vu@vietcoffee.com",
      phone: "(678) 901-2345",
      role: "Assistant Manager",
      status: "Active",
      hireDate: "2023-08-15",
      lastActive: "2025-06-23",
      address: "303 Robusta Road, Seattle, WA",
      permissions: ["orders", "products", "customers", "staff"],
    },
  ]);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table or grid

  // Available roles and statuses
  const roles = [
    "All",
    "Manager",
    "Assistant Manager",
    "Barista",
    "Cashier",
    "Inventory Specialist",
  ];
  const statuses = ["All", "Active", "On Leave", "Inactive"];

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorting indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaChevronUp className="ml-1 text-xs" />
    ) : (
      <FaChevronDown className="ml-1 text-xs" />
    );
  };

  // Filter and sort staff members
  const filteredStaff = staffMembers
    .filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm);

      const matchesRole = roleFilter === "All" || staff.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || staff.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case "Manager":
        return <FaUserShield className="mr-2 text-[#8B4513]" />;
      case "Assistant Manager":
        return <FaUserTie className="mr-2 text-[#8B4513]" />;
      default:
        return <FaUserFriends className="mr-2 text-[#8B4513]" />;
    }
  };

  // Handle staff selection for editing
  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setShowAddEditModal(true);
  };

  // Handle staff selection for deletion
  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  // Handle adding new staff
  const handleAddStaff = () => {
    setSelectedStaff(null);
    setShowAddEditModal(true);
  };

  // Handle delete confirmation
  const confirmDelete = () => {
    setStaffMembers(
      staffMembers.filter((staff) => staff.id !== selectedStaff.id)
    );
    setShowDeleteModal(false);
  };

  return (
    <div className="px-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <p className="text-gray-600">
          Manage your coffee shop staff and permissions
        </p>
      </div>

      {/* Controls and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <button
          onClick={handleAddStaff}
          className="bg-[#8B4513] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#6B3105] transition-colors md:order-1"
        >
          <FaUserPlus className="mr-2" /> Add Staff Member
        </button>

        <div className="flex flex-col sm:flex-row gap-4 md:order-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search staff..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === "All" ? "All Roles" : role}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 md:order-3">
          <button
            className={`px-3 py-2 rounded-md border ${
              viewMode === "table"
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200"
            }`}
            onClick={() => setViewMode("table")}
            aria-label="Table view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
          <button
            className={`px-3 py-2 rounded-md border ${
              viewMode === "grid"
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Staff
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("role")}
                  >
                    <div className="flex items-center">
                      Role
                      {getSortIndicator("role")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIndicator("status")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("hireDate")}
                  >
                    <div className="flex items-center">
                      Hire Date
                      {getSortIndicator("hireDate")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="h-10 w-10 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                staff.name
                              )}&background=D4A76A&color=fff`;
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {staff.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {staff.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRoleIcon(staff.role)}
                        <span className="text-sm text-gray-900">
                          {staff.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <FaPhone className="mr-2 text-gray-400" size={12} />
                        {staff.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          staff.status
                        )}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt
                          className="mr-2 text-gray-400"
                          size={12}
                        />
                        {new Date(staff.hireDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={() => handleEditStaff(staff)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteStaff(staff)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStaff.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No staff members found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="relative">
                <div className="h-40 w-full bg-[#8B4513] bg-opacity-10 flex items-center justify-center">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="h-28 w-28 object-cover rounded-full border-4 border-white shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        staff.name
                      )}&background=D4A76A&color=fff&size=200`;
                    }}
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <div className="dropdown relative">
                    <button
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      onClick={() => {
                        /* Toggle dropdown */
                      }}
                    >
                      <FaEllipsisV className="text-gray-500" size={14} />
                    </button>
                    {/* Dropdown content would go here */}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {staff.name}
                  </h3>
                  <div className="flex items-center justify-center mt-1">
                    {getRoleIcon(staff.role)}
                    <span className="text-sm text-gray-600">{staff.role}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <span className="text-gray-600 truncate">
                      {staff.email}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaPhone className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{staff.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      Hired: {new Date(staff.hireDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      staff.status
                    )}`}
                  >
                    {staff.status}
                  </span>
                  <div className="space-x-2">
                    <button
                      className="p-1.5 bg-indigo-50 rounded text-indigo-600 hover:bg-indigo-100"
                      onClick={() => handleEditStaff(staff)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-1.5 bg-red-50 rounded text-red-600 hover:bg-red-100"
                      onClick={() => handleDeleteStaff(staff)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No staff members found</p>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Staff Modal */}
      {showAddEditModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  {selectedStaff ? "Edit Staff Member" : "Add New Staff Member"}
                </h3>

                <form className="space-y-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 mb-2">
                      {selectedStaff?.avatar ? (
                        <img
                          src={selectedStaff.avatar}
                          alt={selectedStaff.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-[#D4A76A] text-white text-lg">
                          <FaUserPlus />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-sm text-[#8B4513] font-medium"
                    >
                      Upload Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={selectedStaff?.name || ""}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={selectedStaff?.email || ""}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        defaultValue={selectedStaff?.phone || ""}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        defaultValue={selectedStaff?.role || roles[1]}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] rounded-md"
                      >
                        {roles.slice(1).map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        defaultValue={selectedStaff?.status || statuses[1]}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] rounded-md"
                      >
                        {statuses.slice(1).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="hireDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hire Date
                      </label>
                      <input
                        type="date"
                        name="hireDate"
                        id="hireDate"
                        defaultValue={
                          selectedStaff?.hireDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      defaultValue={selectedStaff?.address || ""}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="perm-orders"
                          name="perm-orders"
                          type="checkbox"
                          defaultChecked={selectedStaff?.permissions?.includes(
                            "orders"
                          )}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="perm-orders"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Orders Management
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm-products"
                          name="perm-products"
                          type="checkbox"
                          defaultChecked={selectedStaff?.permissions?.includes(
                            "products"
                          )}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="perm-products"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Products Management
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm-customers"
                          name="perm-customers"
                          type="checkbox"
                          defaultChecked={selectedStaff?.permissions?.includes(
                            "customers"
                          )}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="perm-customers"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Customers Management
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm-staff"
                          name="perm-staff"
                          type="checkbox"
                          defaultChecked={selectedStaff?.permissions?.includes(
                            "staff"
                          )}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="perm-staff"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Staff Management
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm-settings"
                          name="perm-settings"
                          type="checkbox"
                          defaultChecked={selectedStaff?.permissions?.includes(
                            "settings"
                          )}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <label
                          htmlFor="perm-settings"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Settings
                        </label>
                      </div>
                    </div>
                  </div>

                  {!selectedStaff && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <FaLock className="mr-1" /> Account Setup
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="send-invite"
                              name="send-invite"
                              type="checkbox"
                              className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="send-invite"
                              className="text-gray-700"
                            >
                              Send account setup invitation email
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#8B4513] text-base font-medium text-white hover:bg-[#6B3105] focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2 sm:w-auto"
                  onClick={() => {
                    /* Save staff member */
                  }}
                >
                  {selectedStaff ? "Update Staff Member" : "Add Staff Member"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-[#8B4513] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto"
                  onClick={() => setShowAddEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Confirm Deletion
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this staff member? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-[#8B4513] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
