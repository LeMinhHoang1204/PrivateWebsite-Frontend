import React from 'react';
import '../css/Footer.css'

const FooterComponent = () => {
    return (
            <footer className='footer'>
                <span>ABC Company | All Right Reserved &copy; {new Date().getFullYear()} </span>
            </footer>
    )
}

export default FooterComponent