//% color=#F2B705 icon="\uf001" block="ギターコード"
//% groups=['スイッチ割り当て', '和音', '音色', '個別出力']
namespace guitarchord {
    /**
     * 3音で鳴らす和音を選びます。
     * 7th / add9 など本来4音のコードは、3音に省略したボイシングです。
     */
    export enum Chord {
        //% block="A"
        A,
        //% block="A7"
        A7,
        //% block="Aadd9"
        Aadd9,
        //% block="Am"
        Am,
        //% block="Am7"
        Am7,
        //% block="AM7"
        AM7,
        //% block="Asus4"
        Asus4,

        //% block="B7"
        B7,
        //% block="B♭"
        BFlat,
        //% block="Bm"
        Bm,
        //% block="Bm7-5"
        Bm7b5,

        //% block="C"
        C,
        //% block="C7"
        C7,
        //% block="Cadd9"
        Cadd9,
        //% block="Cdim"
        Cdim,
        //% block="Cm"
        Cm,
        //% block="CM7"
        CM7,
        //% block="Csus4"
        Csus4,
        //% block="C♯m7-5"
        CSharpM7b5,

        //% block="D"
        D,
        //% block="D7"
        D7,
        //% block="Dm"
        Dm,
        //% block="Dm7"
        Dm7,
        //% block="Dsus4"
        Dsus4,
        //% block="D/F♯"
        DOverFSharp,

        //% block="E"
        E,
        //% block="E7"
        E7,
        //% block="Em"
        Em,
        //% block="Em7"
        Em7,
        //% block="Esus4"
        Esus4,

        //% block="F"
        F,
        //% block="Fm"
        Fm,
        //% block="FM7"
        FM7,
        //% block="Fsus4"
        Fsus4,
        //% block="F♯dim"
        FSharpDim,
        //% block="F♯m"
        FSharpM,

        //% block="G"
        G,
        //% block="G7"
        G7,
        //% block="Gadd9"
        Gadd9,
        //% block="Gsus4"
        Gsus4
    }


    /** ブロック上のボタン名と実際の入力ピンを対応させます。 */
    export enum ChordButton {
        //% block="ボタン1"
        Button1 = 1,
        //% block="ボタン2"
        Button2 = 2,
        //% block="ボタン3"
        Button3 = 3
    }

    /** シンセサイザーで使われるパルス幅を基準にした音色（波形）です。 */
    export enum Timbre {
        //% block="スクエア 50%"
        Square50 = 0,
        //% block="パルス 37.5%"
        Pulse375 = 1,
        //% block="パルス 25%"
        Pulse25 = 2,
        //% block="ナローパルス 12.5%"
        Pulse125 = 3,
        //% block="ウルトラナロー 6.25%"
        Pulse625 = 4
    }

    let assignedPins: DigitalPin[] = []
    let assignedChords: Chord[] = []
    let assignedModes: number[] = []
    let assignedF1: number[] = []
    let assignedF2: number[] = []
    let assignedF3: number[] = []
    let watcherStarted = false
    let playingAssignment = -1
    let chordDelayMs = 0

    /**
     * 和音を鳴らすときの各音の時間差を設定します。
     * 0 = 3音同時、正 = 1→2→3、負 = 3→1→2。
     * 例: C(ド・ミ・ソ)で -120 ms の場合は ソ→ド→ミ。
     */
    //% blockId=guitarchord_v29_set_delay block="ディレイを $delay ms に設定する"
    //% group="和音" weight=95
    //% delay.defl=0
    export function setDelay(delay: number): void {
        chordDelayMs = delay
    }

    /**
     * 3つの音声出力に共通する音色（パルス幅）を設定します。
     * プリセット和音と、3周波数を直接指定した和音の両方に適用されます。
     */
    //% blockId=guitarchord_v30_set_timbre block="音色（波形）を $timbre にする"
    //% group="音色" weight=100
    //% timbre.defl=Timbre.Square50
    //% shim=guitarchord::setTimbre
    export function setTimbre(timbre: Timbre): void {
        0
    }


    /** P8 / P14 / P16 の3出力で和音を鳴らします。 */
    //% blockId=guitarchord_v29_play_chord block="和音 %chord を鳴らす"
    //% group="和音" weight=90
    //% chord.defl=Chord.C
    export function playChord(chord: Chord): void {
        switch (chord) {
            // A
            case Chord.A:          play3(220, 277, 330); break // A3 C#4 E4
            case Chord.A7:         play3(220, 277, 392); break // A3 C#4 G4
            case Chord.Aadd9:      play3(220, 277, 494); break // A3 C#4 B4
            case Chord.Am:         play3(220, 262, 330); break // A3 C4 E4
            case Chord.Am7:        play3(220, 262, 392); break // A3 C4 G4
            case Chord.AM7:        play3(220, 277, 415); break // A3 C#4 G#4
            case Chord.Asus4:      play3(220, 294, 330); break // A3 D4 E4

            // B
            case Chord.B7:         play3(247, 311, 440); break // B3 D#4 A4
            case Chord.BFlat:      play3(233, 294, 349); break // Bb3 D4 F4
            case Chord.Bm:         play3(247, 294, 370); break // B3 D4 F#4
            case Chord.Bm7b5:      play3(247, 294, 349); break // B3 D4 F4

            // C
            case Chord.C:          play3(262, 330, 392); break // C4 E4 G4
            case Chord.C7:         play3(262, 330, 466); break // C4 E4 Bb4
            case Chord.Cadd9:      play3(262, 330, 587); break // C4 E4 D5
            case Chord.Cdim:       play3(262, 311, 370); break // C4 Eb4 Gb4
            case Chord.Cm:         play3(262, 311, 392); break // C4 Eb4 G4
            case Chord.CM7:        play3(262, 330, 494); break // C4 E4 B4
            case Chord.Csus4:      play3(262, 349, 392); break // C4 F4 G4
            case Chord.CSharpM7b5: play3(277, 330, 392); break // C#4 E4 G4

            // D
            case Chord.D:          play3(294, 370, 440); break // D4 F#4 A4
            case Chord.D7:         play3(294, 370, 523); break // D4 F#4 C5
            case Chord.Dm:         play3(294, 349, 440); break // D4 F4 A4
            case Chord.Dm7:        play3(294, 349, 523); break // D4 F4 C5
            case Chord.Dsus4:      play3(294, 392, 440); break // D4 G4 A4
            case Chord.DOverFSharp:play3(185, 220, 294); break // F#3 A3 D4

            // E
            case Chord.E:          play3(330, 415, 494); break // E4 G#4 B4
            case Chord.E7:         play3(330, 415, 587); break // E4 G#4 D5
            case Chord.Em:         play3(330, 392, 494); break // E4 G4 B4
            case Chord.Em7:        play3(330, 392, 587); break // E4 G4 D5
            case Chord.Esus4:      play3(330, 440, 494); break // E4 A4 B4

            // F
            case Chord.F:          play3(175, 220, 262); break // F3 A3 C4
            case Chord.Fm:         play3(175, 208, 262); break // F3 Ab3 C4
            case Chord.FM7:        play3(175, 220, 330); break // F3 A3 E4
            case Chord.Fsus4:      play3(175, 233, 262); break // F3 Bb3 C4
            case Chord.FSharpDim:  play3(185, 220, 262); break // F#3 A3 C4
            case Chord.FSharpM:    play3(185, 220, 277); break // F#3 A3 C#4

            // G
            case Chord.G:          play3(196, 247, 294); break // G3 B3 D4
            case Chord.G7:         play3(196, 247, 349); break // G3 B3 F4
            case Chord.Gadd9:      play3(196, 247, 440); break // G3 B3 A4
            case Chord.Gsus4:      play3(196, 262, 294); break // G3 C4 D4
        }
    }

    /**
     * ボタン1=P1、ボタン2=P2、ボタン3=P9 として、
     * GNDとの間につないだスイッチを押している間だけ選んだ和音を鳴らします。
     */
    //% blockId=guitarchord_v29_assign_chord block="$button に和音 $chord を割り当てる"
    //% group="スイッチ割り当て" weight=100
    //% button.defl=ChordButton.Button1
    //% chord.defl=Chord.C
    export function assignChord(button: ChordButton, chord: Chord): void {
        assignPinChord(buttonToPin(button), chord)
    }

    /**
     * ボタンを選び、3つの周波数を直接入力してオリジナルの和音を割り当てます。
     * ディレイ設定は通常の和音と共通です。
     */
    //% blockId=guitarchord_v31_assign_custom block="$button に|周波数1 $f1 Hz|周波数2 $f2 Hz|周波数3 $f3 Hz|を割り当てる"
//% inlineInputMode=external
    //% group="スイッチ割り当て" weight=99
    //% button.defl=ChordButton.Button1
    //% f1.defl=262 f1.min=31 f1.max=10000
    //% f2.defl=330 f2.min=31 f2.max=10000
    //% f3.defl=392 f3.min=31 f3.max=10000
    export function assignFrequencies(button: ChordButton, f1: number, f2: number, f3: number): void {
        assignPinFrequencies(buttonToPin(button), f1, f2, f3)
    }

    /** 内部用。実際の入力ピンにプリセット和音を割り当てます。 */
    //% blockHidden=true
    export function assignPinChord(pin: DigitalPin, chord: Chord): void {
        pins.setPull(pin, PinPullMode.PullUp)

        let found = findAssignment(pin)
        if (found >= 0) {
            assignedChords[found] = chord
            assignedModes[found] = 0
        } else {
            assignedPins.push(pin)
            assignedChords.push(chord)
            assignedModes.push(0)
            assignedF1.push(0)
            assignedF2.push(0)
            assignedF3.push(0)
        }
        startWatcher()
    }

    /** 内部用。実際の入力ピンに3周波数を割り当てます。 */
    //% blockHidden=true
    export function assignPinFrequencies(pin: DigitalPin, f1: number, f2: number, f3: number): void {
        pins.setPull(pin, PinPullMode.PullUp)

        let found = findAssignment(pin)
        if (found >= 0) {
            assignedModes[found] = 1
            assignedF1[found] = f1
            assignedF2[found] = f2
            assignedF3[found] = f3
        } else {
            assignedPins.push(pin)
            assignedChords.push(Chord.C)
            assignedModes.push(1)
            assignedF1.push(f1)
            assignedF2.push(f2)
            assignedF3.push(f3)
        }
        startWatcher()
    }

    function findAssignment(pin: DigitalPin): number {
        for (let i = 0; i < assignedPins.length; i++) {
            if (assignedPins[i] == pin) {
                return i
            }
        }
        return -1
    }

    function startWatcher(): void {
        if (watcherStarted) {
            return
        }
        watcherStarted = true
        control.inBackground(function () {
            while (true) {
                let pressed = -1
                for (let i = 0; i < assignedPins.length; i++) {
                    if (pins.digitalReadPin(assignedPins[i]) == 0) {
                        pressed = i
                        break
                    }
                }

                if (pressed != playingAssignment) {
                    if (pressed >= 0) {
                        if (assignedModes[pressed] == 1) {
                            play3(assignedF1[pressed], assignedF2[pressed], assignedF3[pressed])
                        } else {
                            playChord(assignedChords[pressed])
                        }
                    } else {
                        stopAll()
                    }
                    playingAssignment = pressed
                }
                basic.pause(10)
            }
        })
    }

    function buttonToPin(button: ChordButton): DigitalPin {
        switch (button) {
            case ChordButton.Button1: return DigitalPin.P1
            case ChordButton.Button2: return DigitalPin.P2
            case ChordButton.Button3: return DigitalPin.P9
        }
        return DigitalPin.P1
    }

    /** 3つの周波数を設定したディレイで鳴らします。 */
    function play3(f1: number, f2: number, f3: number): void {
        if (chordDelayMs == 0) {
            tone1(f1)
            tone2(f2)
            tone3(f3)
        } else if (chordDelayMs > 0) {
            stopAll()
            tone1(f1)
            basic.pause(chordDelayMs)
            tone2(f2)
            basic.pause(chordDelayMs)
            tone3(f3)
        } else {
            let d = -chordDelayMs
            stopAll()
            tone3(f3)
            basic.pause(d)
            tone1(f1)
            basic.pause(d)
            tone2(f2)
        }
    }

    //% block="出力1 P8 を %frequency Hz"
    //% frequency.min=31 frequency.max=10000
    //% shim=guitarchord::tone1
    //% group="個別出力" weight=60
    export function tone1(frequency: number): void {
        0
    }

    //% block="出力2 P14 を %frequency Hz"
    //% frequency.min=31 frequency.max=10000
    //% shim=guitarchord::tone2
    //% group="個別出力" weight=59
    export function tone2(frequency: number): void {
        0
    }

    //% block="出力3 P16 を %frequency Hz"
    //% frequency.min=31 frequency.max=10000
    //% shim=guitarchord::tone3
    //% group="個別出力" weight=58
    export function tone3(frequency: number): void {
        0
    }

    //% block="出力1を止める"
    //% shim=guitarchord::stop1
    //% group="個別出力" weight=40
    export function stop1(): void {
        0
    }

    //% block="出力2を止める"
    //% shim=guitarchord::stop2
    //% group="個別出力" weight=39
    export function stop2(): void {
        0
    }

    //% block="出力3を止める"
    //% shim=guitarchord::stop3
    //% group="個別出力" weight=38
    export function stop3(): void {
        0
    }

    //% block="全部の音を止める"
    //% shim=guitarchord::stopAll
    //% group="和音" weight=80
    export function stopAll(): void {
        0
    }
}
