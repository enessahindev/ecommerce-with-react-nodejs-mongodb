import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

function LayoutComponents() {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand">
            {/* <img
              src="https://cdn.discordapp.com/emojis/1071186706918809771.webp?size=44&quality=lossless"
              alt="MZN"
              width="30"
              height="24"
            /> */}
            Ecommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/products">Ürünler</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/orders">Siparişlerim</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/baskets">Sepetim</Link>
              </li>
            </ul>
            <button onClick={logOut} className="btn btn-danger" type="submit">
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
export default LayoutComponents;
