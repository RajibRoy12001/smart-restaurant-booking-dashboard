const Button = ({onClick}) => {

  return (
    <button
      onClick={onClick}
      className="border border-[#d4af37] px-6 py-2 text-white hover:bg-[#d4af37] hover:text-black transition"
    >
      RESERVE A TABLE
    </button>
  );

};

export default Button;