import { useState, useEffect } from "react";
import axios from "axios";

function OrderComponents() {
    const [orders, setOrders] = useState([]);

    const getAll = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const model = { userId: user._id };
      const response = await axios.post("http://localhost:5000/orders", model);
      setOrders(response.data);
    };

    useEffect(() => {
      getAll();
    }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-danger mt-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Order list</h3>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Piece</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) =>(
                  <tr key={index}>
                    <td className="table-warning">{index + 1}</td>
                    <td className="table-warning">{order.products.name}</td>
                    <td className="table-warning">1</td>
                    <td className="table-warning">{order.products.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderComponents;
