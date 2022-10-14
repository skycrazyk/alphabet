import {Routes, Route} from 'react-router-dom'
import {FullScreenAlphabet} from '../FullScreenAlphabet/FullScreenAlphabet'
import {Study} from '../Study/Study'
import {Home} from '../Home/Home'

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="study" element={<Study />} />
                <Route path="fs" element={<FullScreenAlphabet />} />
            </Route>
        </Routes>
    )
}

export default App
