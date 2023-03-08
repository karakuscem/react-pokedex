import classes from '../styles/Header.module.css'
import logo from '../assets/pokedex.png'
import pokeball from '../assets/pokeball.png'

function Header(){
    return (
        <div className={classes.header}>
            <img src={logo} className={classes.logo} alt="" />
            <img src={pokeball} className={classes.pokeball} alt="" />
        </div>
    )
}

export default Header;