import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    return (
        <div id='contact'>
            <h2 className='titleContact'>For artworks’ sales and gallery contacts:</h2>
            <a href='https://www.romanroad.com/artists/luca-asta/'>Roman Road</a><br />
            <a href='https://displayfever.com/contact/'>Display Fever</a>
            <h2 className='titleContact'>For film commissions:</h2>
            <a href='https://transonscreen.com/listing/luca-asta/'>Trans+ On Screen</a>
            <h2 className='titleContact'>For internship opportunities and other enquiries:</h2>
        </div>
    )
}
export default Contact;    