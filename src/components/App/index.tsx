import {Routes, Route} from 'react-router-dom'
import {Training} from '../Training/Training'
import {Study} from '../Study/Study'
import {Home} from '../Home/Home'

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="abc/:letter" element={<Study />} />
                <Route path="train/:letter" element={<Training />} />
            </Route>
        </Routes>
    )
}

export default App
