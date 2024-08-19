import {ref, type Ref, watch} from "vue";
import {applyStyle} from "@/style";

export enum Level {
    DEFAULT = 'default',
    PICKY = 'picky',
    ACADEMIC = 'academic',
    CLARITY = 'clarity',
    PROFESSIONAL = 'professional',
    CREATIVE = 'creative',
    CUSTOMER = 'customer',
    JOBAPP = 'jobapp',
    OBJECTIVE = 'objective',
    ELEGANT = 'elegant'
}


export enum Language {
    ARABIC = 'ar',
    ASTURIAN = 'ast',
    BELARUSIAN = 'be',
    BRETON = 'br',
    CATALAN_BAL = 'ca-ES-VALENCIA',
    CATALAN_VAL = 'ca-ES-BALEARIC',
    CHINESE = 'zh',
    CRIMEAN_TATAR = 'crh',
    DANISH = 'da',
    DUTCH = 'nl',
    DUTCH_BE = 'nl-BE',
    ENGLISH_AU = 'en-AU',
    ENGLISH_CA = 'en-CA',
    ENGLISH_GB = 'en-GB',
    ENGLISH_NZ = 'en-NZ',
    ENGLISH_SA = 'en-ZA',
    ENGLISH_US = 'en-US',
    ESPERANTO = 'eo',
    FRENCH = 'fr',
    FRENCH_BE = 'fr-BE',
    FRENCH_CA = 'fr-CA',
    FRENCH_CH = 'fr-CH',
    GALICIAN = 'gl',
    GERMAN = 'de',
    GERMAN_AT = 'de-AT',
    GERMAN_CH = 'de-CH',
    GREEK = 'el',
    IRISH = 'ga',
    ITALIAN = 'it',
    JAPANESE = 'ja',
    KHMER = 'km',
    PERSIAN = 'fa',
    POLISH = 'pl',
    PORTUGUESE = 'pt',
    PORTUGUESE_AO = 'pt-AO',
    PORTUGUESE_BR = 'pt-BR',
    PORTUGUESE_MZ = 'pt-MZ',
    PORTUGUESE_PT = 'pt-PT',
    ROMANIAN = 'ro',
    RUSSIAN = 'ru',
    SLOVAK = 'sk',
    SLOVENIAN = 'sl',
    SPANISH = 'es',
    SPANISH_VOSEO = 'es-VOSEO',
    SWEDISH = 'sv',
    TAGALOG = 'tl',
    TAMIL = 'ta',
    UKRAINIAN = 'uk'
}


export const LanguageNames: { [key in Language]: string } = {
    [Language.ARABIC]: 'Arabic',
    [Language.ASTURIAN]: 'Asturian',
    [Language.BELARUSIAN]: 'Belarusian',
    [Language.BRETON]: 'Breton',
    [Language.CATALAN_BAL]: 'Catalan (Valencia)',
    [Language.CATALAN_VAL]: 'Catalan (Balearic)',
    [Language.CHINESE]: 'Chinese',
    [Language.CRIMEAN_TATAR]: 'Crimean Tatar',
    [Language.DANISH]: 'Danish',
    [Language.DUTCH]: 'Dutch',
    [Language.DUTCH_BE]: 'Dutch (Belgium)',
    [Language.ENGLISH_AU]: 'English (Australia)',
    [Language.ENGLISH_CA]: 'English (Canada)',
    [Language.ENGLISH_GB]: 'English (UK)',
    [Language.ENGLISH_NZ]: 'English (New Zealand)',
    [Language.ENGLISH_SA]: 'English (South Africa)',
    [Language.ENGLISH_US]: 'English (US)',
    [Language.ESPERANTO]: 'Esperanto',
    [Language.FRENCH]: 'French',
    [Language.FRENCH_BE]: 'French (Belgium)',
    [Language.FRENCH_CA]: 'French (Canada)',
    [Language.FRENCH_CH]: 'French (Switzerland)',
    [Language.GALICIAN]: 'Galician',
    [Language.GERMAN]: 'German',
    [Language.GERMAN_AT]: 'German (Austria)',
    [Language.GERMAN_CH]: 'German (Switzerland)',
    [Language.GREEK]: 'Greek',
    [Language.IRISH]: 'Irish',
    [Language.ITALIAN]: 'Italian',
    [Language.JAPANESE]: 'Japanese',
    [Language.KHMER]: 'Khmer',
    [Language.PERSIAN]: 'Persian',
    [Language.POLISH]: 'Polish',
    [Language.PORTUGUESE]: 'Portuguese',
    [Language.PORTUGUESE_AO]: 'Portuguese (Angola)',
    [Language.PORTUGUESE_BR]: 'Portuguese (Brazil)',
    [Language.PORTUGUESE_MZ]: 'Portuguese (Mozambique)',
    [Language.PORTUGUESE_PT]: 'Portuguese (Portugal)',
    [Language.ROMANIAN]: 'Romanian',
    [Language.RUSSIAN]: 'Russian',
    [Language.SLOVAK]: 'Slovak',
    [Language.SLOVENIAN]: 'Slovenian',
    [Language.SPANISH]: 'Spanish',
    [Language.SPANISH_VOSEO]: 'Spanish (Voseo)',
    [Language.SWEDISH]: 'Swedish',
    [Language.TAGALOG]: 'Tagalog',
    [Language.TAMIL]: 'Tamil',
    [Language.UKRAINIAN]: 'Ukrainian'
};

export enum FontName {
    MONOSPACE = 'monospace',
    SERIF = 'serif',
    SANS_SERIF = 'sans-serif',
    Attkinson = 'Atkinson Hyperlegible',
    OpenDyslexic = 'OpenDyslexic',
    Lexend = 'Lexend',
    Noto = 'Noto Sans',
    Fira = 'Fira Sans',
    Roboto = 'Roboto',
    Cabin = 'Cabin',
    Times = 'Times New Roman',
    Arial = 'Arial',
}

export type Config = {
    basePath: Ref<string>;
    language: Ref<Language>;
    level: Ref<Level>;
    fontFamily: Ref<string>;
    fontSize: Ref<number>;
    lineHeight: Ref<number>;
    letterSpacing: Ref<number>;
    color: Ref<string>;
    backgroundColor: Ref<string>;
}


export let CONFIG: Config = {
    basePath: ref('https://api.languagetool.org'),
    language: ref(Language.ENGLISH_US),
    level: ref(Level.DEFAULT),
    fontFamily: ref(FontName.SANS_SERIF),
    fontSize: ref(16),
    lineHeight: ref(1.5),
    letterSpacing: ref(0.05),
    color: ref('#dddddd'),
    backgroundColor: ref('#333333')
}

function parseUrlArgs() {
    const urlParams = new URLSearchParams(window.location.search);
    const json = urlParams.get('s');
    if (json) {
        const parsedConfig = JSON.parse(atob(decodeURIComponent(json))) as Config;
        CONFIG.basePath.value = parsedConfig.basePath._value;
        CONFIG.language.value = parsedConfig.language._value;
        CONFIG.level.value = parsedConfig.level._value;
        CONFIG.fontFamily.value = parsedConfig.fontFamily._value;
        CONFIG.fontSize.value = parsedConfig.fontSize._value;
        CONFIG.lineHeight.value = parsedConfig.lineHeight._value;
        CONFIG.letterSpacing.value = parsedConfig.letterSpacing._value;
        CONFIG.color.value = parsedConfig.color._value;
        CONFIG.backgroundColor.value = parsedConfig.backgroundColor._value;
    }
    applyStyle();
}

export function setUrlArgs() {
    const urlParams = new URLSearchParams();
    urlParams.set('s', encodeURIComponent(btoa(JSON.stringify(CONFIG))))
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
    applyStyle()
}

export function load() {
    watch(() => window.location.search, parseUrlArgs)
    watch(() => CONFIG, setUrlArgs, {deep: true})
    parseUrlArgs()
}
