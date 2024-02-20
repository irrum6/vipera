let en = {
    // pcount
    single: "Single",
    two: "Two",
    three: "Three",
    four: "Four",
    // dificulty
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    master: "Master",
    // mode
    long: "Long",
    endurance: "Endurance",
    challenge: "Challenge",
    //interface texts
    score: "Score",
    //dialog texts
    welcome_text: `Welcome to Montivipera Redemption.
    use arrow keys to navigate.
    Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen.
    'm' to display/dissmis settings dialog , 'n' to open/close new game dialog.
    'g' to play/pause music.
    't' to shuffle`,
    multi_text: "",
    onplay_text: "",
    endurance_mode_text: `
    You are playing endurance mode
    Endurance : you gain point and mass periodically, your intent is to last longer
    easy every 20 seconds
    medium every 10 seconds
    hard every 5 seconds
    master 5 second and point isn't given for gained mass you need to eat food (only level to feature food)
    `,
    challenge_mode_text: `
    challenge mode
    fruits are dropped and have limited time to be eaten
    easy if miss no penalty
    medium if miss penalty on score 1 point (positive constraint)
    hard if miss warning , loss of tail (3 positions)
    in multi player who eats pardon, who don shrink`
}

//
let ka = {
    // pcount
    single: "ერთი",
    two: "ორი",
    three: "სამი",
    four: "ოთხი",
    // dificulty
    easy: "იოლი",
    normal: "ჩვეულებრივი",
    hard: "რთული",
    master: "ოსტატი",
    // mode
    long: "სრული",
    endurance: "გამძლეობა",
    challenge: "გამოწვევა",
    //interface texts
    score: "ქულა",
    //dialog texts
    welcome_text: `
        Montivipera Redemption.
    მოძრაობისათვის გამოიყენეთთ ისრები
    თამაშის დასაპაუზებლად დააჭირეთ P
    თამაშის გასაგრძელებლად დააჭირეთ P თავიდან
    სრულ ეკრანზე გასაშლელეად დააჭირეთ F.
    დააჭირეთ M პარამეტრების ფანჯარის გამოსატანათ
    დააჭირეთ N ახალი თამაშის მენიუს გასახსნელად
    დააჭირეთ G მუსიკის მოსასმენად ან დასაპაუზებლად.
    დააჭირეთ T მუსიკის გადასართავად`,
    multi_text: "",
    onplay_text:"",
    endurance_mode_text:`
    თქვენ თამაშობთ გამძლეობის რეჟიმში
    გამძლეობის რეჟიმში თქვენ პერიოდულად იმატებთ ქულებს და წონას
    თქვენი მიზანი გაძლოთ დიდხანს
    იოლი: ყოველ 20 წამში
    საშუალო ყოველ 10 წამში
    რთული ყოველ 5 წამში
    ოსტატის სირთულე: ყოველ 5 წამში და თქვენ ამისთვის ქულა არ გემატებათ და საჭმელი უნდა მოძებნოთ
    (ერთადერთი დონე რომელიც საჭმელს შეიცავს)
    `,
    challenge_mode_text:`
    challenge mode
    fruits are dropped and have limited time to be eaten
    easy if miss no penalty
    medium if miss penalty on score 1 point (positive constraint)
    hard if miss warning , loss of tail (3 positions)
    in multi player who eats pardon, who don shrink`
}

// 
let de = {
    // pcount
    single: "eins",
    two: "zwei",
    three: "drei",
    four: "vier",
    // dificulty
    easy: "einfach",
    normal: "normal",
    hard: "Schwer",
    master: "Master",
    // mode
    long: "Lange",
    endurance: "Ertragen",
    challenge: "Herausforderung",
    //interface texts
    score: "Score",
    //dialog texts
    welcome_text: `Willkommen zum Montivipera Redemption.
    P fur pause/fortsetzen
    'f' fur ganzer Bildschirm.
    'm' fur paramter fenster zeigen
    'n' fur neue spiele fenster zeigen.
    'g' fur music spielen/pausen.
    't' fur shuffle`,
    multi_text: "",
    onplay_text: "",
    endurance_mode_text: "",
    challenge_mode_text: `
    challenge mode`
}

//
let translatables = { ka, en, de }

class Translator {
    static getWord(lang, text) {
        // debugger;
        let short = Translator.getLangShort(lang);
        return translatables[short][text];
    }

    static getLangShort(lang) {
        if (!Languages.valid(lang)) {
            return "en";
        }
        switch (lang) {
            case Languages.ENGLISH:
                return "en";
            case Languages.DEUTSCH:
                return "de"
            case Languages.GEORGIAN:
                return "ka"
            default:
                return "en";
        }
    }
}