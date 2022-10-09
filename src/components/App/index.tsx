import {Routes, Route} from 'react-router-dom'
import {FullScreenAlphabet} from '../FullScreenAlphabet/FullScreenAlphabet'

function App() {
    return (
        <Routes>
            <Route path="fs" element={<FullScreenAlphabet />} />
        </Routes>
    )
}

export default App
