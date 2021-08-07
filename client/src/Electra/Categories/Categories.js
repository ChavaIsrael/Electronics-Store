import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory ,NavLink} from 'react-router-dom'

//reutrn dropdown of all categories
const Categoties = () => {

  const CategoriesNames = [
    {
      id: 1,
      name: 'refrigerators',
      category: 'מקררים ומקפיאים'
    },
    {
      id: 2,
      name: 'computers',
      category: 'מחשבים ותקשורת'
    },
    {
      id: 3,
      name: 'washings',
      category: 'כביסה וייבוש'
    },
    {
      id: 4,
      name: 'cosmetics',
      category: 'מוצרי טיפוח ועיצוב'
    },
    {
      id: 5,
      name: 'kitchen',
      category: 'חשמל למטבח'
    },
    {
      id: 6,
      name: 'ovens',
      category: 'תנורים וכיריים'
    },
    {
      id: 6,
      name: 'airConditioners',
      category: 'מזגנים ומאוררים'
    },
  ]

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" variant="outlined" color="secondary" aria-haspopup="true" onClick={handleClick} style={{marginLeft:'190%', fontSize:'20px', width:'120%', color:'yellow'}}>
        קטגוריות מוצרים
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {CategoriesNames.map((i) => (
        <MenuItem key={i.id} style={{borderColor:'yellow', fontSize:'18px'}} component={NavLink} to={`/items/${i.name}`}>{i.category}</MenuItem>
      ))}
      </Menu>
    </div>
  );
}

export default Categoties