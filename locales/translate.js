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