import "../assets/css/myInformation.css";

function MyInformation({
  id,
  name,
  email,
  age,
}: {
  id: string;
  name: string;
  email?: string;
  age?: number;
}) {
  return (
    <div className="w-auto h-auto ml-auto p-6 m-auto">
      <div className=" flex-row w-auto h-auto p-2 mb-0 mt-0 m-10  bg-gradient-to-br from-blue-500 to-indigo-900 md:p-12 rounded-2xl shadow-lg text-white  translate-y-10 animate-fade-in-up glow-all-around">
        <h1 className="mb-6 text-3xl font-bold md:text-5xl ">{name}</h1>
        <p className="m-2 text-xl">
          <strong>Age : </strong> {age}
        </p>
        <p className="m-2 text-xl">
          <strong>Email : </strong>
          {email}
        </p>

        {/* <p className="m-2 text-xl">
          {" "}
          <strong>ID : </strong> {id}
        </p> */}
      </div>
      //{" "}
    </div>
  );
}

export default MyInformation;
