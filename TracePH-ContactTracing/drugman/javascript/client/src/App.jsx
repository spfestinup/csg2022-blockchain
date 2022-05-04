import Router from './router/router'
import Navi from './components/Navi';
import { BrowserRouter } from "react-router-dom";
import { Container } from '@mui/material'

export default function App() {
return (
        <div>
                <BrowserRouter>
                        <Navi/>
                        <Container sx={{px: 8, py: 4}}>
                                <Router/>
                        </Container>
                </BrowserRouter>
        </div>
        )
}