const GuestSelector = ({guests,setGuests}) => {

  return (

    <div className="flex flex-col gap-2">

      <label className="text-gray-300 text-sm">
        Guests
      </label>

      <select
        value={guests}
        onChange={(e)=>setGuests(e.target.value)}
        className="p-3 bg-[#021B1E] text-white border border-gray-700 rounded-md"
      >

        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
        <option value="5">5+ Guests</option>

      </select>

    </div>

  );

};

export default GuestSelector;