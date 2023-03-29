import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeComponents() {
  const [products, setProducts] = useState([]);

  const getAll = async () => {
    var response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const addBasket = async (productId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { productId: productId, userId: user._id };
    var response = await axios.post("http://localhost:5000/baskets/add", model);
    toast.success(response.data.message);
    getAll();
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mt-2">
              <div className="card" style={{ width: "18rem" }}>
                <div>
                  <img
                    className="card-img-top"
                    src={"http://localhost:5000/" + product.imageUrl}
                    alt={product.name}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="card-text">
                    <p className="alert alert-info text-center">
                      Piece : {product.stock}
                    </p>
                    <p className="alert alert-danger text-center">
                      Price : {product.price} $
                    </p>
                  </div>
                  {product.stock > 0 ? (
                    <button
                      onClick={(not) => addBasket(product._id)}
                      className="btn btn-primary w-100"
                    >
                      Add to basket
                    </button>
                  ) : (
                    <button className="btn btn-danger w-100">
                      Out of stock!
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default HomeComponents;
