import Router from './router/router'
import Navi from './components/Navi';
import { Container } from '@mui/material'
export default function App() {
        return (
                <div>
                        <Navi/>
                        <Container sx={{px: 8, py: 4}}>
                                <Router/>
                        </Container>
                </div>
        )
}