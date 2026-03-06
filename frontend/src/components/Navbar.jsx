import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div className="flex justify-between items-center p-5 shadow">

      <h1 className="text-2xl font-bold">
        BlockCert
      </h1>

      <div className="flex gap-6">

        <Link to="/">Home</Link>

        <Link to="/issue">Issue Certificate</Link>

        <Link to="/verify">Verify Certificate</Link>

      </div>

    </div>

  );

}

export default Navbar;