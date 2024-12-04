import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';


export function CollapsibleDemo({ navigation }) {
    const [activeSections, setActiveSections] = useState([0]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    function renderHeader(section: any, _: any, isActive: any) {
        return (<Text>{section.title}</Text>);
    };
    function renderContent(section: any, _: any, isActive: any) {
        return (<Text>{section.content}</Text> );
    }
    return(
        <ScrollView>
         <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setActiveSections}
            renderAsFlatList={false}
        />
        <Button title = "open" onPress = {() =>{ setIsCollapsed(!isCollapsed) } } />
            <Collapsible 
                collapsed={isCollapsed}
                onAnimationEnd = { ()=>{ console.log("log:动画结束") } }
                duration = { 100 }
                collapsedHeight = { 0 } >
                <Button title = "aaaaa" />
                <Button title = "bbbbb" />
            </Collapsible>
        </ScrollView>
    );
}
const CONTENT = [
    { title: 'First', feet: '1', content: "a", },
    { title: 'Second', feet: '2', content: "b", },
    { title: 'Third', feet: '3', content: "c", },
];
