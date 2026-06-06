// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import API from "../../utils/api"

// const AdminDashboard = () => {

//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState("")
//   const [filter, setFilter] = useState("all")

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     try {
//       setLoading(true)

//       const res = await axios.get(`${API}/admin/users`)

//       setUsers(res.data)
//       setLoading(false)

//     } catch (error) {
//       console.log(error)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   // ================= DELETE USER =================
//   const deleteUser = async (id, role) => {
//     try {

//       if (role === "admin") {
//         alert("Admin cannot be deleted")
//         return
//       }

//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete this user?"
//       )

//       if (!confirmDelete) return

//       await axios.delete(`${API}/admin/user/${id}`)

//       // instant UI update
//       setUsers((prev) => prev.filter((u) => u._id !== id))

//     } catch (error) {
//       console.log(error.response?.data?.message || error.message)
//     }
//   }

//   // ================= VERIFY USER =================
//   const verifyUser = async (id, isVerified) => {
//     try {

//       const confirmVerify = window.confirm(
//         isVerified
//           ? "Remove verification from this user?"
//           : "Verify this user?"
//       )

//       if (!confirmVerify) return

//       // API CALL
//       const res = await axios.put(
//         `${API}/admin/verify-user/${id}`,
//         {
//           isVerified: !isVerified,
//         }
//       )

//       // UPDATE UI INSTANTLY
//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === id
//             ? {
//                 ...user,
//                 isVerified: !isVerified,
//               }
//             : user
//         )
//       )

//       console.log(res.data)

//     } catch (error) {
//       console.log(error.response?.data?.message || error.message)
//     }
//   }

//   // ================= FILTER LOGIC =================
//   const filteredUsers = users.filter((user) => {

//     const matchSearch =
//       user.username?.toLowerCase().includes(search.toLowerCase()) ||
//       user.email?.toLowerCase().includes(search.toLowerCase())

//     const matchRole =
//       filter === "all" ? true : user.role === filter

//     return matchSearch && matchRole
//   })

//   return (
//     <div className="p-4 sm:p-6 bg-white min-h-screen text-black">

//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//         <h1 className="text-2xl sm:text-3xl font-bold">
//           Admin Dashboard
//         </h1>

//         <p className="text-sm text-gray-500">
//           Total Users: {users.length}
//         </p>
//       </div>

//       {/* ================= CONTROLS ================= */}
//       <div className="flex flex-col md:flex-row gap-3 mb-6">

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-lg w-full md:w-1/3"
//         />

//         {/* FILTER */}
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded-lg w-full md:w-1/4"
//         >
//           <option value="all">All Users</option>
//           <option value="admin">Admins</option>
//           <option value="user">Users</option>
//         </select>

//         {/* REFRESH */}
//         <button
//           onClick={fetchUsers}
//           className="bg-black text-white px-4 py-2 rounded-lg"
//         >
//           Refresh
//         </button>
//       </div>

//       {/* ================= LOADING ================= */}
//       {loading ? (
//         <div className="text-center font-bold py-10">
//           Loading users...
//         </div>
//       ) : (

//         /* ================= TABLE ================= */
//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[900px] border border-gray-300">

//             {/* HEADER */}
//             <thead className="bg-black text-white">
//               <tr>
//                 <th className="p-3">Username</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3">Verified</th>
//                 <th className="p-3">Logged In</th>
//                 <th className="p-3">Google ID</th>
//                 <th className="p-3">Created</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>

//             {/* BODY */}
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="text-center border hover:bg-gray-100 transition"
//                   >

//                     <td className="p-3 font-medium">
//                       {user.username || "N/A"}
//                     </td>

//                     <td className="p-3">
//                       {user.email}
//                     </td>

//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 rounded text-sm ${
//                           user.role === "admin"
//                             ? "bg-red-100 text-red-600"
//                             : "bg-green-100 text-green-600"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>

//                     {/* VERIFIED */}
//                     <td className="p-3">
//                       <button
//                         onClick={() =>
//                           verifyUser(user._id, user.isVerified)
//                         }
//                         className={`px-3 py-1 rounded text-sm transition ${
//                           user.isVerified
//                             ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
//                             : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
//                         }`}
//                       >
//                         {user.isVerified ? "Verified" : "Not Verified"}
//                       </button>
//                     </td>

//                     <td className="p-3">
//                       {user.isLoggedIn ? "Yes" : "No"}
//                     </td>

//                     <td className="p-3">
//                       {user.googleId || "N/A"}
//                     </td>

//                     <td className="p-3">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>

//                     {/* ACTION */}
//                     <td className="p-3 flex items-center justify-center gap-2">

//                       {/* DELETE */}
//                       <button
//                         onClick={() =>
//                           deleteUser(user._id, user.role)
//                         }
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                       >
//                         Delete
//                       </button>

//                     </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="text-center p-6 text-gray-500"
//                   >
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>

//         </div>
//       )}

//     </div>
//   )
// }

// export default AdminDashboard









import React, { useEffect, useState } from "react"
import axios from "axios"
import API from "../../utils/api"

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API}/admin/users`)
      setUsers(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Helper: check if user is the protected admin
  const isProtectedAdmin = (user) => {
    return user?.username === "muhammadfaizan45890"
  }

  // ================= DELETE USER =================
  const deleteUser = async (id, user) => {
    try {
      // BLOCK: Protected admin cannot be deleted
      if (isProtectedAdmin(user)) {
        alert("This admin (muhammadfaizan45890) cannot be deleted.")
        return
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      )
      if (!confirmDelete) return

      await axios.delete(`${API}/admin/user/${id}`)

      // instant UI update
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch (error) {
      console.log(error.response?.data?.message || error.message)
      alert(error.response?.data?.message || "Failed to delete user.")
    }
  }

  // ================= VERIFY USER =================
  const verifyUser = async (id, isVerified, user) => {
    try {
      // BLOCK: Protected admin cannot be verified/unverified
      if (isProtectedAdmin(user)) {
        alert("Verification status cannot be changed for this admin.")
        return
      }

      const confirmVerify = window.confirm(
        isVerified
          ? "Remove verification from this user?"
          : "Verify this user?"
      )
      if (!confirmVerify) return

      // API CALL
      const res = await axios.put(`${API}/admin/verify-user/${id}`, {
        isVerified: !isVerified,
      })

      // UPDATE UI INSTANTLY
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isVerified: !isVerified } : u
        )
      )
      console.log(res.data)
    } catch (error) {
      console.log(error.response?.data?.message || error.message)
      alert(error.response?.data?.message || "Failed to update verification.")
    }
  }

  // ================= FILTER LOGIC =================
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())

    const matchRole = filter === "all" ? true : user.role === filter
    return matchSearch && matchRole
  })

  return (
    <div className="p-3 sm:p-6 bg-white min-h-screen text-black">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h1 className="text-xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
          Total Users: {users.length}
        </p>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-black/20"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-1/4 bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>
        <button
          onClick={fetchUsers}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm text-sm sm:text-base"
        >
          Refresh
        </button>
      </div>

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="text-center font-bold py-10 text-gray-600">
          Loading users...
        </div>
      ) : (
        /* ================= RESPONSIVE TABLE (HORIZONTAL SCROLL ON MOBILE) ================= */
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm sm:text-base min-w-[800px]">
            {/* HEADER */}
            <thead className="bg-black text-white text-xs sm:text-sm">
              <tr>
                <th className="p-2 sm:p-3 text-left">Username</th>
                <th className="p-2 sm:p-3 text-left">Email</th>
                <th className="p-2 sm:p-3">Role</th>
                <th className="p-2 sm:p-3">Verified</th>
                <th className="p-2 sm:p-3">Logged In</th>
                <th className="p-2 sm:p-3 hidden md:table-cell">Google ID</th>
                <th className="p-2 sm:p-3 hidden lg:table-cell">Created</th>
                <th className="p-2 sm:p-3">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isSpecial = isProtectedAdmin(user)
                  return (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="p-2 sm:p-3 font-medium break-words max-w-[150px]">
                        {user.username || "N/A"}
                      </td>
                      <td className="p-2 sm:p-3 break-words max-w-[180px] md:max-w-none">
                        {user.email}
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* VERIFIED BUTTON */}
                      <td className="p-2 sm:p-3 text-center">
                        <button
                          onClick={() =>
                            verifyUser(user._id, user.isVerified, user)
                          }
                          disabled={isSpecial}
                          className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition whitespace-nowrap ${
                            isSpecial
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
                              : user.isVerified
                              ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          }`}
                          title={
                            isSpecial
                              ? "Protected admin: verification cannot be changed"
                              : ""
                          }
                        >
                          {user.isVerified ? "Verified" : "Not Verified"}
                        </button>
                      </td>

                      <td className="p-2 sm:p-3 text-center">
                        {user.isLoggedIn ? (
                          <span className="text-green-600 font-medium">Yes</span>
                        ) : (
                          "No"
                        )}
                      </td>

                      <td className="p-2 sm:p-3 text-center hidden md:table-cell">
                        {user.googleId ? (
                          <span className="text-xs truncate block max-w-[100px]">
                            {user.googleId}
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="p-2 sm:p-3 text-center hidden lg:table-cell text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      {/* ACTION BUTTONS */}
                      <td className="p-2 sm:p-3 text-center">
                        <button
                          onClick={() => deleteUser(user._id, user)}
                          disabled={isSpecial}
                          className={`bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition ${
                            isSpecial
                              ? "bg-gray-400 cursor-not-allowed opacity-60"
                              : "hover:bg-red-600"
                          }`}
                          title={
                            isSpecial
                              ? "Protected admin cannot be deleted"
                              : "Delete user"
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MOBILE NOTE (subtle helper) ================= */}
      <div className="text-xs text-center text-gray-400 mt-4 md:hidden">
        Swipe horizontally to see all user details →
      </div>
    </div>
  )
}

export default AdminDashboard
