import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BasketComponents() {
  const [baskets, setBaskets] = useState([]);

  const getAll = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { userId: user._id };
    let response = await axios.post(
      "http://localhost:5000/baskets/getAll",
      model
    );
    setBaskets(response.data);
  };

  const remove = async (_id) => {
    let eventClick = window.confirm("Are you sure you want to remove?");
    if (eventClick) {
      let model = { _id: _id };
      await axios.post("http://localhost:5000/baskets/remove", model);
      toast.info("Operation successful. 🥳", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getAll();
    }
  };

  const addOrder = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { userId: user._id };
    await axios.post("http://localhost:5000/orders/add", model);
    getAll();
  };

  const handleSubmit = () => {
    toast.info("Payment successful. 🥳", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const calc = () => {
    let total = 0;
    baskets.forEach((element) => {
      total += element.products[0].price;
    });
    return total;
  };

  useEffect(() => {
    getAll();
  });

  return (
    <>
      <div className="container-md mt-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <h3>Baskets</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-md-12 mb-4 mb-lg-3">
                <table className="table table-hover" style={{ width: "auto" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Product Piece</th>
                      <th>Product Price</th>
                      <th>Process</th>
                    </tr>
                  </thead>
                  <tbody>
                    {baskets.map((basket, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{basket.products[0].name}</td>
                        <td>
                          <img
                            src={
                              "http://localhost:5000/" +
                              basket.products[0].imageUrl
                            }
                            width="75"
                            alt={basket.products[0].name}
                          />
                        </td>
                        <td>1</td>
                        <td>{basket.products[0].price}</td>
                        <td>
                          <button
                            onClick={(eventClick) => remove(basket._id)}
                            className="btn btn-warning"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h4 className="card-title mb-0">Summary</h4>
                    <hr />
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-primary mb-2">
                          Total piece: {baskets.length}
                        </li>
                        <li className="list-group-item list-group-item-primary mb-2">
                          Total amount:
                          <p className="col-2 text-center"> {calc()} $ </p>
                        </li>
                      </ul>
                      <div onClick={handleSubmit}>
                      <button
                        className="btn btn-success btn-block w-100"
                        style={{ float: "right" }}
                        type="button"
                        onClick={addOrder}
                      >
                        Payment
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default BasketComponents;
