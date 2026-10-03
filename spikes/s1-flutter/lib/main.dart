// S1 Flutter schedule screen. Sandbox PoC: web (CanvasKit) build only -- NOT a native Android/iOS build.
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;

const test = ['እንኳን ደህና መጡ','የአየር ንብረት ለውጥ','ጉባኤ ፕሮግራም ካርታ','አዲስ አበባ ኢትዮጵያ','፩ ፪ ፫ ፲ ፻ ። ፣ ፤ ፦','Mixed: COP32 ጉባኤ in አዲስ አበባ'];
void main() => runApp(const MaterialApp(home: Home(), debugShowCheckedModeBanner: false));

class Home extends StatefulWidget { const Home({super.key}); @override State<Home> createState() => _S(); }
class _S extends State<Home> {
  bool am = true, pub = false; double scale = 1; List sessions = [];
  @override void initState() { super.initState();
    rootBundle.loadString('assets/sample.json').then((s) => setState(() => sessions = jsonDecode(s)['sessions'])); }
  TextStyle f(double sz, [FontWeight w = FontWeight.w400]) => TextStyle(fontFamily: 'EthioNoto', fontSize: sz * scale, fontWeight: w);
  @override Widget build(BuildContext c) {
    final items = sessions.where((s) => !pub || s['open_to_public'] == true).toList();
    return Scaffold(body: Center(child: SizedBox(width: 420, child: Column(children: [
      Container(padding: const EdgeInsets.all(8), decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFFCCCCCC)))),
        child: Row(children: [
          Expanded(child: Text(am ? 'ፕሮግራም' : 'Programme', style: f(20, FontWeight.w700))),
          OutlinedButton(key: const Key('lang'), onPressed: () => setState(() => am = !am), child: Text(am ? 'EN' : 'አማ', style: f(14))),
          const SizedBox(width: 8),
          OutlinedButton(key: const Key('scale'), onPressed: () => setState(() => scale = scale == 1 ? 2 : 1), child: Text(scale == 1 ? '200%' : '100%', style: f(14))),
          Text(am ? 'ለሕዝብ ክፍት' : 'Open to public', style: f(13)),
          Switch(value: pub, onChanged: (v) => setState(() => pub = v)),
        ])),
      Container(width: double.infinity, color: const Color(0xFFF4F1EA), padding: const EdgeInsets.all(8), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        for (final t in test) Text(t, style: f(16, FontWeight.w700)),
        Text('${test[0]} (regular) · ${test[1]}', style: f(16)),
      ])),
      Expanded(child: ListView.builder(itemCount: items.length, itemBuilder: (c, i) { final s = items[i];
        return Container(padding: const EdgeInsets.all(10), decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFFEEEEEE)))),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(am ? s['title_am'] : s['title_en'], style: f(16, FontWeight.w600)),
            Text('${s['day']} ${s['start']}–${s['end']} · ${s['room']}${s['open_to_public'] ? ' ✓' : ''}', style: f(13)),
          ])); })),
    ]))));
  }
}
