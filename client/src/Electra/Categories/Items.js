import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getItemsList } from "../../services/itemService";
import Item from "./Item";
import { useParams } from 'react-router-dom'

const Items = () => {
    const { name } = useParams()
    const [myItems, setItems] = useState([])

    //get items by category
    useEffect(() => {
        getItemsList(name).then(res => {
            setItems(res)
        })
    }, [name])

    return (
        <>     
            <Grid style={{marginRight:'1%', marginTop:'2%'}} alignItems="center" container spacing={2}>
                {myItems.map((p) => (
                    <Grid key={p.id} item xl={2} md={3} xs={6} style={{ textAlign: 'center' }} >
                        <Item key={p.id} item={p}/>
                    </Grid>             
                ))}
            </Grid>
        </>
    );
}

export default Items