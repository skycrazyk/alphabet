import {Routes, Route} from 'react-router-dom'
import {FullScreenAlphabet} from '../FullScreenAlphabet/FullScreenAlphabet'
import {Study} from '../Study/Study'

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Study />} />
                <Route path="fs" element={<FullScreenAlphabet />} />
            </Route>
        </Routes>
    )
}

export default App
