import {Routes, Route} from 'react-router-dom'
import {Training} from '../Training/Training'
import {Study} from '../Study/Study'
import {Home} from '../Home/Home'
import {useAssets} from '../../hooks'

function App() {
    const {isLoading} = useAssets()

    return isLoading ? (
        <>Loading</>
    ) : (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="abc/:letter" element={<Study />} />
                <Route path="letter" element={<Training />} />
            </Route>
        </Routes>
    )
}

export default App
