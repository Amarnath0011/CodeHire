function Input({ type = "text", placeholder, value, onChange, name }) {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />
    );
  }
  
  export default Input;