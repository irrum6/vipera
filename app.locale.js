let en = {
    // pcount
    single: "",
    two: "",
    three: "",
    four: "",
    // dificulty
    easy:"",
    normal:"",
    hard:"",
    master:"",
    score: "",
    //dialog texts
    welcome_text: `Welcome to Montivipera Redemption.
    use arrow keys to navigate.
    Press 'p' to pause game, again 'p' to resume, 'f' to fullscreen.
    'm' to display/dissmis settings dialog , 'n' to open/close new game dialog.
    'g' to play music.`,
    multi_text:""
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
    score: "",
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
                console.log(2);
                return "de"
            case Languages.GEORGIAN:
                console.log(3);
                return "ka"
            default:
                return "en";
        }
    }
}