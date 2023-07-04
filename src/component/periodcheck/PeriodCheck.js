import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const API_URL = "http://43.201.73.166:8080";

const PeriodCheck = () => {
    const navigate = useNavigate();

    const moveHomePage = () => {
        navigate("/");
    };

    const [selectedType, setSelectedType] = useState(null);
    const handleSelectType = (e) => {
        setSelectedType(e.target.value);
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [periodData, setPeriodData] = useState("");

    useEffect(() => {
        const fetchTypeData = async () => {
            console.log(startDate);
            try {
                let token =
                    "eyJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjg4NDY4MDU3LCJleHAiOjE2ODg0Njk4NTd9.l_6mjbhAyw7gz0sIHyJ-4DLoHCeWNoBPhNX49oNciLU";

                const res = await axios.get(
                    `${API_URL}/api/analysis/period?startDate=${startDate}&endDate=${endDate}&nutrient=${selectedType}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = res.data;
                setPeriodData(data);
                console.log(data);
            } catch {
                console.error("periodData bring Failed!");
            }
        };
        fetchTypeData();
    }, []);

    return (
        <div className="period_page">
            <div className="title_group">
                <p className="title">Food Fit</p>
                <p className="small_title">기간 분석</p>
            </div>
            <div className="period_select">
                <div className="period">
                    <label>시작일:&nbsp;&nbsp;</label>
                    <DatePicker
                        className="date_picker"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                <div className="period">
                    <label>종료일:&nbsp;&nbsp;</label>
                    <DatePicker
                        className="date_picker"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            </div>
            <div className="period_graph">
                <select
                    className="select_type"
                    onChange={handleSelectType}
                    value={selectedType}
                >
                    <option value="caloroie">칼로리</option>
                    <option value="salt">탄수화물</option>
                    <option value="protein">단백질</option>
                    <option value="fat">지방</option>
                </select>
                <div className="graph_data">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={150}
                            height={40}
                            border_radius={"10px"}
                            data={periodData}
                        >
                            <Bar dataKey="num" fill="#B8E0D2" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="button_group">
                <button className="home_btn" onClick={moveHomePage}>
                    홈으로
                </button>
            </div>
        </div>
    );
};

export default PeriodCheck;
