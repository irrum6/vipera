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
    'g' to play music.`,
    multi_text: ""
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
    score: "Scქულაore",
    //dialog texts
    welcome_text: `
        Montivipera Redemption.
    მოძრაობისათვის გამოიყენეთთ ისრები
    თამაშის დასაპაუზებლად დააჭირეთ P
    თამაშის გასაგრძელებლად დააჭირეთ P თავიდან
    სრულ ეკრანზე გასაშლელეად დააჭირეთ F.
    დააჭირეთ M პარამეტრების ფანჯარის გამოსატანათ
    დააჭირეთ N ახალი თამაშის მენიუს გასახსნელად
    დააჭირეთ G მუსიკის მოსასმენად`,
    multi_text: ""
}

// 
let de = {
    // pcount
    single: "eins",
    two: "zwei",
    three: "drei",
    four: "vier",
    // dificulty
    easy:"einfach",
    normal:"normal",
    hard:"Schwer",
    master:"Master",
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
    'g' fur music spielen.`,
    multi_text:""
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
                // console.log(2);
                return "de"
            case Languages.GEORGIAN:
                // console.log(3);
                return "ka"
            default:
                return "en";
        }
    }
}