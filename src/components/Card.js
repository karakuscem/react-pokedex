import classes from '../styles/Card.module.css'

function Card(props){
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const typeList = props.types ? props.types.map(type => 
        <div key={type.slot} className={classes.type}>{capitalizeFirstLetter(type.type.name)}</div>
      ) : [];      

    return (
        <div className={classes.card}>
            <div className={classes.id}>{props.id}</div>
            <div className={classes.name}>{props.name}</div>
            <img className={classes.photo} src={props.photo} alt=""/>
            <div className={classes.types}>
                {typeList}
            </div>
        </div>
    )
}

export default Card;