import { useEffect, useState } from "react";
import axios from "axios";

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
    let model = {productId: productId, userId: user._id};
    var response = await axios.post("http://localhost:5000/basket/add", model);
    alert(response.data.message);
    getAll();
  }

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3">
              <div className="card" style={{ width: "18rem" }}>
                <div>
                  <img
                    className="card-img-top"
                    src={"http://localhost:5000/" + product.imageUrl}
                    alt={product.name}
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">
                    <p className="alert alert-info text-center">Piece : {product.stock}</p>
                    <p className="alert alert-danger text-center">Price : {product.price} $</p>
                  </p>
                  { product.stock > 0 ?
                    <button onClick={()=> addBasket(product._id)} class="btn btn-primary w-100">
                    Go to shop
                  </button> : <button class="btn btn-danger w-100">
                    Out of stock!
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default HomeComponents;
