import { useState, useEffect } from "react";
import axios from "axios";

function ProductComponents() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const getAll = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    var input = document.querySelector("input[type='file']");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("categoryName", categoryName);
    formData.append("price", price);
    formData.append("image", input.files[0], input.files[0].name);

    var response = await axios.post(
      "http://localhost:5000/products/add",
      formData
    );
    alert(response.data.message);

    getAll();

    let element = document.getElementById("addModalCloseBtn");
    element.click();
    setName("");
    setPrice("");
    setStock("");
    setCategoryName(0);
    input.value = "";
  };

  const remove = async (_id) => {
    let confirm = window.confirm("Would you like to delete the product?");
    if (confirm) {
      let model = { _id: _id, stock: stock };
      let response = await axios.post(
        "http://localhost:5000/products/remove",
        model
      );
      alert(response.data.message);
      getAll();
    }
  };

  const update = async (_id) => {
    let up = window.confirm("Would you like update items?"); 
    if (up) {
      let model = { _id: _id };
      let response = await axios.post(
        "http://localhost:5000/products/update",
        model
      );
      alert(response.data.message);
      getAll();
    }
  }

  return (
    <>
      <div className="container mt-2">
        <div className="card">
          <div className="card-header">
            <h3>Product Lists</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
              >
                Add+
              </button>
              <table className="table table-bordered table-hover mt-2">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Piece</th>
                    <th scope="col">Price</th>
                    <th scope="col">Process</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{ width: "auto", height: "100px" }}
                          src={"http://localhost:5000/" + product.imageUrl}
                          alt="tomato"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.categoryName}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          onClick={() => remove(product._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => update(product._id)}
                          className="btn btn-warning btn-sm mx-2"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Add Product
              </h1>
              <button
                type="button"
                className="btn-close"
                id="addModalCloseBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={add}>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Product Name"
                  />
                </div>
                <div className="form-group mt-2">
                  <select
                    className="form-control"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value={0}>Select Category..</option>
                    <option>T-shirt</option>
                    <option>Sweetshirt</option>
                    <option>Coat</option>
                    <option>MZN Collection</option>
                  </select>
                </div>
                <div className="form-group mt-2">
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="form-control"
                    id="piece"
                    name="piece"
                    placeholder="Piece"
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Price"
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    placeholder="Image"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductComponents;
