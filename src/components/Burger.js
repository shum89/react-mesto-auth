import React from "react";


/**
 * burger for mobile menu
 * @param onMobileMenu {function} handles click on mobile menu
 * @param isMobileMenuOpened {boolean} checks if mobile menu is open
 * @return {JSX.Element}
 * @constructor
 */
function Burger({onMobileMenu, isMobileMenuOpened}) {

    return (
        <button className='burger' type='button' onClick={onMobileMenu} >
            <span className={`burger__dash ${isMobileMenuOpened ? 'burger__dash_active' : null}`}></span>
        </button>
    )

}

export default Burger;