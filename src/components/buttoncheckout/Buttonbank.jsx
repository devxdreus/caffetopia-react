import React from 'react';
import { css } from '@emotion/react';
import bank from "../../assets/logobutton/bank.png"; // Path menuju gambar logo

const cardStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100px;

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        background-color: #f7f7f7;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        position: relative;

        .icon {
            width: 10px; /* Ukuran gambar ikon diubah menjadi 10px */
            height: 10px; /* Ukuran gambar ikon diubah menjadi 10px */
            margin-right: 10px;
        }

        .text {
            font-weight: bold;
        }
    }

    input[type="checkbox"] {
        display: none;
    }

   /* CSS untuk custom checkbox */
.custom-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
    position: relative;
    outline: none;
}

.custom-checkbox:checked {
    border-color: #F4991A; /* Warna oranye */
    background-color: #F4991A; /* Warna oranye */
}

.custom-checkbox:checked:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 7px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

`;

const Buttonbank = () => {
    return (
        <div css={cardStyle} className="flex items-center">   
            <label className="inline-flex items-center ml-5 ">
            <input
                type="checkbox"
                className="custom-checkbox "    
            />
            </label>
                <img
                    src={bank}
                    alt="card"
                    className="icon bg-[#F4991A] border-[#321313] border rounded-lg"
                    style={{ width: '50px', height: '50px', marginRight: '36px', marginLeft: '20px' }}
                />
                <span className="font-bold text-[#321313] ml-2">Bank account</span> 
        </div>
    );
};

export default Buttonbank;
