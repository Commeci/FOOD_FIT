import "./App.css";
import MyPage from "./component/mypage/MyPage";
import DailyCheck from "./component/dailycheck/DailyCheck";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    // return <MyPage></MyPage>;
    // return <DailyCheck></DailyCheck>;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyPage />}></Route>
                <Route path="/daily" element={<DailyCheck />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
