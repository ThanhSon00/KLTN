import { useState } from "react";
import PopularQuestions from "../PopularQuestions";
import LatestAnswers from "../LatestAnswers";
import e from "express";

enum Tab {
    PopularQuestions = 1,
    LatestAnswers = 2
}

export default function RightSideTabs() {
    const [activeTab, setActiveTab] = useState(Tab.PopularQuestions);
    const isActiveTab = (tab: Tab) => activeTab === tab;
    const openTab = (e, tab: Tab) => {
        e.preventDefault();
        setActiveTab(tab);
    }

    const isCurrentTab = (tab: Tab) => {
        if (activeTab === tab) {
            return ' current';
        }
    };

    return (
        <div className="widget card tabs-wrap widget-tabs">
            <div className="widget-title widget-title-tabs">
                <ul className="tabs tabstabs-widget-2">
                <li className={"tab" + isCurrentTab(Tab.PopularQuestions)}>
                    <a href="#" onClick={(e) => openTab(e, Tab.PopularQuestions)}>Câu hỏi phổ biến</a>
                </li>
                <li className={"tab" + isCurrentTab(Tab.LatestAnswers)}>
                    <a href="#"  onClick={(e) => openTab(e, Tab.LatestAnswers)}>Trả lời mới nhất</a>
                </li>
                </ul>
                <div className="clearfix" />
            </div>
            <div className="widget-wrap">
                <PopularQuestions isActive={isActiveTab(Tab.PopularQuestions)} key="1"/>
                <LatestAnswers isActive={isActiveTab(Tab.LatestAnswers)} key="2"/>
            </div>
        </div>
    )
}