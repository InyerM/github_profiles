import React, { useEffect , useState} from "react"
import '../styles/Users.css'
import { Link } from "react-router-dom" 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const Users = () => {

    const[data, setData] = useState([])
    const[userInput, setUserInput] = useState()
    const[graphicData, setGraphicData] = useState([])

    const [open, setOpen] = useState(false)

    var url = 'https://api.github.com/search/users?q=a'

    const fetchApi = async () => {
        const response = await fetch(url)
        const responseJson = await response.json()
        responseJson.items.length = 10
        setData(responseJson)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const handleSearch = (e) => {
        userInput.length < 5 || userInput == "doublevpartners" ?
        setOpen(true) :
        url = `https://api.github.com/search/users?q=${userInput}`
        setData(null)
        fetchApi()
    }

    const enterPressed = (e) => {
        if (e.key === 'Enter'){
            handleSearch(e)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }


    const handleInput = (e) => {
        setUserInput(e.target.value)
    }

    return(
        <div className="Page">
            <div className="container d-flex justify-content-center">
                <div className="tableView">
                    <div className="header">
                        <div className="searchBox">
                            <i className='bx bx-search searchIcon'></i>
                            <input type='search' placeholder='Search users' className="seachInput" onChange={handleInput} onKeyPress={enterPressed}></input>
                        </div>
                        <div className="button">
                            <button onClick={handleSearch}>
                                <i className='bx bxs-send'></i>
                            </button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Error al buscar"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Hubo un error al buscar, la palabra que ingreso tiene menos de 4 caracteres o quizá ingresó la palabra doublevpartners
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Aceptar</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                    <div className="tbl">
                        <table className="myTable">
                            <thead>
                                <tr>
                                    <th># Id</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data == null ? console.log() : 
                                    data.items?.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>
                                                <Link to={`/users/${item.login}`} className="name">
                                                    {item.login}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users