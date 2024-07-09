import { useContext, useState, useEffect } from 'react';
import COFFEE_IMAGE from '../assets/coffe.jpg';
import TambahButton from '../components/buttonaction/TambahButton';
import HapusButton from '../components/buttonaction/HapusButton';
import KurangButton from '../components/buttonaction/KurangButton';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentMethod from '../components/checkout/PaymentMethod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import axios from '../api/axios';

const Checkout = () => {
    const { cart, setCart, addProductOnCart, removeProductFromCart } =
        useContext(ProductContext);
    const navigate = useNavigate();

    const [tableNumber, setTableNumber] = useState('');
    const [diningOption, setDiningOption] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [note, setNote] = useState('');
    const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
    const [availableTable, setAvailableTable] = useState([]);
    const [availableNumber, setAvailableNumber] = useState([]);

    useEffect(() => {
        let totalPrice = 0;
        cart.forEach((product) => {
            totalPrice +=
                parseInt(product.price, 10) * parseInt(product.quantity, 10);
        });
        setTotalPrice(totalPrice);
    }, [cart, isConfirmed]);

    useEffect(() => {
        setBookedTableNumbers(cart.map((product) => product.tableNumber));
    }, [cart]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('/orders');
            const data = response.data.payload;

            const newData = data.map((entry) => {
                const table =
                    localStorage.getItem(`order-${entry.id}-table`) ||
                    entry.table;

                return {
                    ...entry,
                    table,
                };
            });
        };

        fetchOrders();
    });

    useEffect(() => {
        TableNumberSelect();
    }, []);

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Are you sure you want to delete this order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProducts = [...cart];
                updatedProducts.splice(index, 1);
                setCart(updatedProducts);
                Swal.fire('Deleted!', 'The order has been deleted.', 'success');
            }
        });
    };

    // Saat proses checkout, simpan informasi meja ke localStorage
    const handleConfirm = () => {
        if (tableNumber !== '' && diningOption !== '') {
            const totalPrice = cart.reduce((total, product) => {
                return (
                    total + parseInt(product.price) * parseInt(product.quantity)
                );
            }, 0);

            setTotalPrice(totalPrice);
            setIsConfirmed(true);

            // Simpan informasi meja ke localStorage
            localStorage.setItem(`order-${cart.id}-table`, tableNumber);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter table number and dining option.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleCheckout = async () => {
        const order = {
            username: localStorage.getItem('username'),
            order: cart,
            amount: totalPrice,
            tableNumber: parseInt(tableNumber),
            diningOption,
            note,
        };

        console.log(order);

        try {
            const response = await axios.post('/checkout', order);
            console.log(response);

            // Menampilkan alert "Pesanan berhasil di checkout"
            Swal.fire({
                title: 'Success!',
                text: 'Pesanan berhasil di checkout.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Reset cart setelah checkout
            setCart([]);
            setIsConfirmed(false);
            setTableNumber('');
            setDiningOption('');
            setTotalPrice(0);
            setNote('');

            // Menonaktifkan tombol Checkout
            setIsCheckoutDisabled(true);
        } catch (error) {
            console.error(error);
        }
    };

    const TableNumberSelect = async () => {
        const tables = [
            {
                table: 1,
                available: true,
            },
            {
                table: 2,
                available: true,
            },
            {
                table: 3,
                available: true,
            },
            {
                table: 4,
                available: true,
            },
            {
                table: 5,
                available: true,
            },
            {
                table: 6,
                available: true,
            },
            {
                table: 7,
                available: true,
            },
            {
                table: 8,
                available: true,
            },
            {
                table: 9,
                available: true,
            },
            {
                table: 10,
                available: true,
            },
        ];

        const orders = await axios.get('/orders');
        const bookedTable = orders.data.payload
            .filter((order) => {
                return order.status == 'pending';
            })
            .map((order) => order.table_number);

        const bookedNumber = [...new Set(bookedTable)].sort((a, b) => a - b);

        const tableSelet = tables.map((table) => {
            bookedNumber.map((booked) => {
                if (table.table == booked) {
                    table.available = false;
                }
            });
            return table;
        });

        setAvailableNumber(tableSelet);
    };

    //select meja yang di pesan
    const [bookedTableNumbers, setBookedTableNumbers] = useState([]);

    return (
        <div className="font-poppins">
            <div
                className="min-h-screen bg-cover bg-center flex justify-center items-start text-[#321313]"
                style={{
                    backgroundImage: `url(${COFFEE_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container px-4 py-20 sm:px-0">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4">
                            <h3 className="text-xl text-left text-[#321313] font-bold mb-0 p-4">
                                Checkout your item now!
                            </h3>
                            <div className="p-4 mt-0 bg-white border border-white rounded-md">
                                <h3 className="mb-4 text-3xl font-bold text-center border-b border-gray-200">
                                    Products
                                </h3>
                                <div className="mt-4 overflow-x-auto table-container">
                                    <table
                                        className="min-w-full"
                                        id="productTable"
                                    >
                                        <thead>
                                            <tr>
                                                <th className="p-4 text-left">
                                                    Name
                                                </th>
                                                <th className="p-4 text-left">
                                                    Quantity
                                                </th>
                                                <th className="p-4 text-left">
                                                    Price
                                                </th>
                                                <th className="p-4 text-left">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.length > 0 ? (
                                                cart.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="p-4">
                                                            {product.name}
                                                        </td>
                                                        <td className="flex items-center p-5">
                                                            {!isConfirmed && (
                                                                <KurangButton
                                                                    onClick={() =>
                                                                        removeProductFromCart(
                                                                            product.id
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                            {product.quantity}
                                                            {!isConfirmed && (
                                                                <TambahButton
                                                                    onClick={() =>
                                                                        addProductOnCart(
                                                                            product.id
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="p-4">{`IDR ${product.price.toLocaleString(
                                                            'id-ID'
                                                        )}`}</td>
                                                        <td className="flex items-center justify-start p-4">
                                                            {!isConfirmed && (
                                                                <HapusButton
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="p-4 text-center"
                                                    >
                                                        No products in cart
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center mt-8 space-x-2">
                                    <label
                                        htmlFor="tableNumber"
                                        className="text-sm text-[#321313]"
                                    >
                                        Table No:
                                    </label>

                                    <select
                                        id="tableNumber"
                                        className="bg-white border border-[#321313] text-[#321313] text-xs rounded-md p-1 w-52"
                                        value={tableNumber}
                                        onChange={(e) =>
                                            setTableNumber(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            select a table number
                                        </option>
                                        {console.log(availableNumber)}
                                        {availableNumber.map((number) => {
                                            return number.available ? (
                                                <option
                                                    key={number.table}
                                                    value={number.table}
                                                >
                                                    Table {number.table}
                                                </option>
                                            ) : (
                                                <option
                                                    disabled
                                                    key={number.table}
                                                >
                                                    Table {number.table}{' '}
                                                    (booked)
                                                </option>
                                            );
                                        })}

                                        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                                            .filter((number) => {
                                                const tableStatus =
                                                    localStorage.getItem(
                                                        `table-${number}`
                                                    );
                                                console.log(
                                                    number,
                                                    tableStatus
                                                );
                                                return tableStatus !== 'booked';
                                            })
                                            .map((number) => (
                                                <option
                                                    key={number}
                                                    value={number}
                                                >
                                                    Table {number}
                                                </option>
                                            ))} */}
                                    </select>
                                </div>
                                <div className="flex items-center mt-4 space-x-2">
                                    <label
                                        htmlFor="diningOption"
                                        className="text-sm text-[#321313]"
                                    >
                                        Dining Option:
                                    </label>
                                    <select
                                        id="diningOption"
                                        className="bg-white border border-[#321313] text-[#321313] text-xs rounded-md p-1 w-44"
                                        value={diningOption}
                                        onChange={(e) =>
                                            setDiningOption(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select an option
                                        </option>
                                        <option value="Dine-In">Dine In</option>
                                        <option value="Take-Away">
                                            Take Away
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-4 space-y-2">
                                    <input
                                        type="text"
                                        id="notes"
                                        onChange={(e) =>
                                            setNote(e.target.value)
                                        }
                                        className="bg-white border border-[#321313] text-[#321313] text-xs rounded-md p-2 w-64 sm:w-72"
                                        placeholder="Notes..."
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex justify-start w-full mt-8 mb-4 sm:mb-4">
                                        {!isConfirmed && (
                                            <button
                                                type="submit"
                                                onClick={() =>
                                                    navigate('/products')
                                                }
                                                className="text-white bg-[#591E0A] hover:bg-[#693828] focus:ring-4 focus:outline-none focus:ring-[#a15941] font-bold rounded-lg text-sm w-32 sm:w-auto px-5 py-2.5 text-center"
                                            >
                                                Add Menu
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex justify-end w-full mt-8 mb-4 sm:mb-4">
                                        {!isConfirmed && (
                                            <button
                                                type="submit"
                                                onClick={handleConfirm}
                                                className="text-white bg-[#F4991A] hover:bg-[#f6aa40] focus:ring-4 focus:outline-none focus:ring-[#facc8d] font-bold rounded-lg text-sm w-24 sm:w-auto px-5 py-2.5 text-center"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="p-4 mb-0 text-xl font-bold text-left text-white">
                                Order Summary
                            </h3>
                            {isConfirmed && (
                                <>
                                    <OrderSummary
                                        confirmedOrder={cart}
                                        totalPrice={totalPrice}
                                        tableNumber={tableNumber}
                                        diningOption={diningOption}
                                        note={note}
                                    />

                                    <div className="p-4 mt-4">
                                        <button
                                            type="submit"
                                            className="text-white bg-[#F4991A] hover:bg-[#f6aa40] focus:ring-4 focus:outline-none focus:ring-[#facc8d] font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                            onClick={handleCheckout}
                                            disabled={isCheckoutDisabled} // Menambahkan disabled={isCheckoutDisabled}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
