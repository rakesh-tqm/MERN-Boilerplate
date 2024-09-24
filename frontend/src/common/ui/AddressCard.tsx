import React from "react";

interface AddressProps {
  pin: string;
  city: string;
  label: string;
  state: string;
  country: string;
  firstAddress: string;
  secondAddres: string;
}

const AddressCard: React.FC<AddressProps> = (props) => {
  const { pin, city, label, state, country, firstAddress, secondAddres } =
    props;
  return (
    <div className="w-[80%] mx-auto my-4 px-6 py-4">
      <h1 className="text-lg font-bold">{label}</h1>
      <div className="rounded overflow-hidden shadow-2xl bg-white p-2">
        <div className="flex my-1">
          <h2 className="w-[30%] font-semibold">Primay Address</h2>
          <p className="w-[70%]">{firstAddress}</p>
        </div>
        <div className="flex my-1">
          <h2 className="w-[30%] font-semibold">Secondary Address</h2>
          <p className="w-[70%]">{secondAddres}</p>
        </div>
        <div className="flex my-1">
          <h2 className="w-[30%] font-semibold">Country</h2>
          <p className="w-[70%]">{country}</p>
        </div>
        <div className="flex my-1">
          <h2 className="w-[30%] font-semibold">State</h2>
          <p className="w-[70%]">{state}</p>
        </div>
        <div className="flex my-1">
          <h2 className="w-[30%] font-semibold">City</h2>
          <p className="w-[70%]">{city}</p>
        </div>
        <div className="flex my-1">
          <h2 className="w-[30%] font-semibold">PIN Code</h2>
          <p className="w-[70%]">{pin}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
