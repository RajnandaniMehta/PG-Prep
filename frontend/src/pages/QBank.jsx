import { Routes, Route } from 'react-router-dom';
import { QBankHome, QBankChapter,QBankQHome,QBankQuestion} from '../components';
function QBank() {
  return (
    <>
    <Routes>
        <Route path='/' element={<QBankHome/>}/>
        <Route path=':subjectId' element={<QBankChapter/>}/>
        <Route path=':subjectId/:chapterId' element={<QBankQHome/>}/>
        <Route path=':subjectId/:chapterId/practice' element={<QBankQuestion/>}/>

    </Routes>
    </>
    
  )
}

export default QBank