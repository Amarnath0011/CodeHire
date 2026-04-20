function Button({ text, className = "" }) {
    return (
      <button
        className={`px-6 py-3 rounded-xl font-semibold transition hover:scale-105 ${className}`}
      >
        {text}
      </button>
    );
  }
  
  export default Button;