# ギターコード v0.0.27

BBC micro:bit V2 用の3音和音拡張です。

## ボタン
- ボタン1 = P1
- ボタン2 = P2
- ボタン3 = P9

## 音声出力
- 出力1 = P8
- 出力2 = P14
- 出力3 = P16

## ディレイ
「ディレイを ○ ms に設定する」ブロックでストラム間隔を設定できます。

- 0 ms: 3音同時
- 正の値: 出力1 → 出力2 → 出力3
- 負の値: 出力3 → 出力1 → 出力2

C（ド・ミ・ソ）なら、+120 ms は ド→ミ→ソ、-120 ms は ソ→ド→ミ です。
各音は追加されていき、最終的には3音が重なって、ボタンを離すまで鳴ります。

## 例
```typescript
guitarchord.setDelay(120)
guitarchord.assignChord(guitarchord.ChordButton.Button1, guitarchord.Chord.C)
guitarchord.assignChord(guitarchord.ChordButton.Button2, guitarchord.Chord.G)
guitarchord.assignChord(guitarchord.ChordButton.Button3, guitarchord.Chord.Am)
```
