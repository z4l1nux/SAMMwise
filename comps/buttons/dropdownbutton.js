
import styles from '../../styles/buttons.module.css'
import Image from 'next/image'
import { useState } from 'react';





const DropButton = (props) => {
    

    return ( 
        <div className = {styles.dropDown} onClick={()=> props.onClick(!props.state)}> 
            <span className = {styles.dropDownText}>
                {props.name}
            </span>
            <span className = {styles.dropDownImage}>
                <Image src={props.state?"/uparrow.png":"/downarrow.png"} width={30} height = {30} alt={props.state ? "Collapse" : "Expand"} />
            </span>
        </div>
     );
}
 
export default DropButton;