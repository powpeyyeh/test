/* eslint-disable @next/next/no-img-element */
import { _onFetchNumber } from '@/redux/actions/appGlobal';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import cphoneIcon from '@/assets/img/icons8-touchscreen.png';
import searchIcon from '@/assets/img/icons8-search.png';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '@/assets/img/Avatar.png';

export default function Home() {
    const dispatch = useDispatch();
    const cNumberDetails = useSelector((state) => state.app.cNumber);

    const [cNum, setcNum] = useState('');
    const searchRf = useRef(null);
    const checkIfValidNum = (num) => {
        const regex = /^\+[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/; //
        if (regex.test(num.target.value)) {
            if (num.target.value.length === 12) {
                setcNum(num.target.value);
            } else {
                setcNum(null);
                console.log('Please check you input number');
            }
        } else {
            setcNum(null);
            console.log('invalid');
        }
    };
    const doQuery = () => {
        const regex = /^\+[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/;

        if (regex.test(cNum)) {
            if (cNum.length === 12) {
                dispatch(_onFetchNumber(cNum));
            } else {
                setcNum(null);
                console.log('Please check you input number');
            }
        } else {
            setcNum(null);
            console.log('invalid');
        }
    };
    const domParse = (data) => {
        const parser = new DOMParser();
        const dataReturn = parser.parseFromString(data, 'text/html');
        console.log(dataReturn);
    };
    return (
        <div className='modal-mask'>
            <div className='modal-wrapper'>
                <div className='modal-container'>
                    {cNumberDetails.length > 0 ? (
                        cNumberDetails.map((item, index) => (
                            <div key={index}>
                                <div className='modal-header'>
                                    <div className='exAvatar'>
                                        <Image
                                            src={avatar}
                                            alt='cnumber-icon'
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className='cNum'>{cNum}</div>
                                </div>
                                <div className='modal-body'>
                                    <div className='outPut'>
                                        <div className='image'>
                                            <img
                                                src={item.LogoPath}
                                                alt='cnumber-icon'
                                                width={25}
                                                height={25}
                                            />
                                            <div className='name'>
                                                {item.Name}
                                            </div>
                                        </div>

                                        <div className='ouputTxt'>
                                            <div className='description'>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.Description,
                                                    }}
                                                />
                                            </div>
                                            <div className='compromiseDate'>
                                                <span>Compromise date: </span>
                                                <span>
                                                    {item.DataClasses[0]},{' '}
                                                </span>
                                                <span>
                                                    {item.DataClasses[1]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='modal-footer'>
                                    <button className='modal-default-button'>
                                        close
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className='modal-header'>
                                <div>
                                    <Image
                                        src={cphoneIcon}
                                        alt='cnumber-icon'
                                        width={70}
                                        height={70}
                                    />
                                </div>
                                <div>Check a phone number</div>
                            </div>

                            <div className='modal-body'>
                                <div className='titleForm'>
                                    Enter the phone number to be checked
                                    including the country code. <br />
                                    Eg. +61412333555
                                </div>
                                <div className='formWrapper'>
                                    <div className='inputWrapper'>
                                        <input
                                            className='searchInput'
                                            type='search'
                                            name='search'
                                            ref={searchRf}
                                            placeholder='Enter phone number'
                                            onInput={checkIfValidNum}
                                        />
                                    </div>
                                    <div className='searchIcon'>
                                        <button onClick={doQuery}>
                                            <Image
                                                src={searchIcon}
                                                alt='cnumber-icon'
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='modal-footer'>
                                <button className='modal-default-button'>
                                    close
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
