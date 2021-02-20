/* eslint-disable no-console */
const inputText = document.querySelector('.text-area-input');
const outputText = document.querySelector('.text-area-output');
const copy = document.querySelector('.copy');
const convert = document.querySelector('.convert');
const selectInput = document.querySelector('.from');
const selectoutput = document.querySelector('.to');

function translator() {
    const language = {
        Arabic: 'ar',
        English: 'en',
        French: 'fr',
        Greek: 'el',
        Gujarati: 'gu',
        Hindi: 'hi',
        Indonesian: 'id',
        Italian: 'it',
        Japanese: 'ja-JP',
        Kannada: 'kn',
        Korean: 'ko',
        Latin: 'la',
        Malayalam: 'ml',
        Marathi: 'mr',
        Mongolian: 'mn',
        Nepali: 'ne',
        Spanish: 'es',
        Tamil: 'ta',
        Telugu: 'te',
        Urdu: 'ur',
    };

    const url = new URL('https://api.mymemory.translated.net/get');

    const parameter = {
        q: inputText.value,
        langpair: `${language[selectInput.value]}|${language[selectoutput.value]}`,
    };
    console.log(parameter.langpair);
    Object.keys(parameter).forEach((key) => {
        url.searchParams.append(key, parameter[key]);
    });
    url.search = new URLSearchParams(parameter).toString();
    const promise = fetch(url);
    // promise
    //     .then((response) => response.json())
    //     .then((json) => {
    //         outputText.value = json.reposeData.translatedText;
    //     });

    promise
        .then((response) => response.json())
        .then((json) => {
            outputText.value = json.responseData.translatedText;
        });
}

convert.addEventListener('click', () => {
    translator();
});
selectoutput.addEventListener('change', () => {
    translator();
});
inputText.addEventListener('change', () => {
    if (selectoutput.value !== 'Select') translator();
});

copy.addEventListener('click', () => {
    const cpy = document.querySelector('.text-area-output');
    console.log('clicked', cpy);
    cpy.focus();
    cpy.select();
    document.execCommand('copy');
    try {
        const success = document.execCommand('copy');
        const msg = success ? 'sucess' : 'unsuccess';
        console.log(msg);
    } catch (err) {
        console.log('unable to cpy');
    }
});
