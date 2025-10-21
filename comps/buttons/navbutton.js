//Button component for future use..

import styles from '../../styles/navbar.module.css'

const NavButton = (props) => {
   
    return ( 
        <div 
            className={styles.grouping} 
            onClick={props.onClick}
            style={{cursor: 'pointer'}}
        >
            <button 
                className={props.state ? styles.pageButtonsActive : styles.pageButtons}
                aria-label={props.name}
            ></button>
            <label className={styles.pageLabel}>{props.name}</label>
        </div>
     );
}
 
export default NavButton;