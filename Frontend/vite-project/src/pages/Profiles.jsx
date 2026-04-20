import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <h1 className="p-10">Please Login</h1>;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 bg-gray-900 p-8 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="text-gray-400">{user.email}</p>
      <p className="text-blue-500 mt-2 capitalize">{user.role}</p>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 px-6 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;