// S1 React Native (react-native-web renderer) schedule screen. Sandbox PoC: NOT a native build.
import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet, Switch} from 'react-native';
import data from './sample.json';
const TEST = ['እንኳን ደህና መጡ','የአየር ንብረት ለውጥ','ጉባኤ ፕሮግራም ካርታ','አዲስ አበባ ኢትዮጵያ','፩ ፪ ፫ ፲ ፻ ። ፣ ፤ ፦','Mixed: COP32 ጉባኤ in አዲስ አበባ'];
export default function App(){
  const [am,setAm]=useState(true); const [pub,setPub]=useState(false); const [scale,setScale]=useState(1);
  const items=data.sessions.filter(s=>!pub||s.open_to_public);
  return (<View style={st.root}>
    <View style={st.bar}><Text style={st.h}>{am?'ፕሮግራም':'Programme'}</Text>
      <Pressable testID="lang" onPress={()=>setAm(!am)} style={st.btn}><Text style={st.f}>{am?'EN':'አማ'}</Text></Pressable>
      <Pressable testID="scale" onPress={()=>setScale(scale===1?2:1)} style={st.btn}><Text style={st.f}>{scale===1?'200%':'100%'}</Text></Pressable>
      <Text style={st.f}>{am?'ለሕዝብ ክፍት':'Open to public'}</Text><Switch value={pub} onValueChange={setPub}/></View>
    <View style={st.test}>{TEST.map(t=><Text key={t} style={[st.f,{fontSize:16*scale,fontWeight:'700'}]}>{t}</Text>)}
      <Text style={[st.f,{fontSize:16*scale}]}>{TEST[0]} (regular) · {TEST[1]}</Text></View>
    <FlatList data={items} keyExtractor={s=>s.id} renderItem={({item:s})=>(
      <View style={st.row}><Text style={[st.f,{fontSize:16*scale,fontWeight:'600'}]}>{am?s.title_am:s.title_en}</Text>
        <Text style={[st.f,{fontSize:13*scale}]}>{s.day} {s.start}–{s.end} · {s.room}{s.open_to_public?' ✓':''}</Text></View>)}/>
  </View>);
}
const st=StyleSheet.create({root:{flex:1,backgroundColor:'#fff',maxWidth:420,height:'100vh'},bar:{flexDirection:'row',alignItems:'center',padding:8,gap:8,borderBottomWidth:1,borderColor:'#ccc'},
 h:{fontSize:20,fontFamily:'EthioNoto',fontWeight:'700',flex:1},btn:{padding:6,borderWidth:1,borderRadius:6},f:{fontFamily:'EthioNoto'},
 test:{padding:8,backgroundColor:'#f4f1ea'},row:{padding:10,borderBottomWidth:1,borderColor:'#eee'}});
