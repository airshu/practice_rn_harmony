import React, { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    RefreshControl
} from 'react-native';

import {  useAppState, useLayout, useKeyboard, useDeviceOrientation, useRefresh, useInteractionManager } from '@react-native-community/hooks'
export const HooksUnTester = ({ navigation }) => {
    const [backText, setBackText] = useState('')
    const [refreshText, setRefreshText] = useState('下拉刷新')
    const fetch = () => {
        return new Promise((resolve) => setTimeout(() => { resolve(setRefreshText('刷新成功')) }, 500))
    }
    const { isRefreshing, onRefresh } = useRefresh(fetch);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }>
                {/* hooks-useRefresh-demo */}
                <View style={styles.testSuite}>
                    <Text style={styles.titles}>useRefresh</Text>
                    <View style={styles.textCase}>
                        <Text> {refreshText} </Text>
                    </View>
                </View>
                {/* hooks-useDeviceOrientation-demo */}
                <View style={styles.testSuite}>
                    <Text style={styles.titles}>useDeviceOrientation</Text>
                    <View style={styles.textCase}>
                        <Text>判断是横屏(landscape)还是纵屏(portrait)：{useDeviceOrientation()} </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    useBackHandlerBtn: {
        borderRadius: 6,
        height: 36,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'rgb(61, 176, 236)',
    },
    TextInput: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
        width: '90%',
        backgroundColor: '#fff'
    },
    testSuite: { backgroundColor: "#fff", margin: 10 },
    titles: {
        marginLeft: 6,
        fontWeight: '600'
    },
    textCase: {
        margin: 5,
    },
    btnText: { fontWeight: 'bold', color: '#fff', fontSize: 20 },
    container: { flex: 1 },
    ball: {
        width: 100,
        height: 100,
        backgroundColor: "salmon",
        borderRadius: 100,
    },
});