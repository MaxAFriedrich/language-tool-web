import {watch} from "vue";

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

export type Config = {
    basePath: string;
    language: string;
    level: Level;
}

export let CONFIG: Config = {
    basePath: 'https://api.languagetool.org',
    language: 'en-US',
    level: Level.DEFAULT
}

function parseUrlArgs() {
    const urlParams = new URLSearchParams(window.location.search);
    const json = urlParams.get('s')
    if (json) {
        CONFIG = JSON.parse(atob(json)) as Config
    }
}

export function setUrlArgs() {
    const urlParams = new URLSearchParams();
    urlParams.set('s', btoa(JSON.stringify(CONFIG)))
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`)
}

export function load() {
    watch(() => window.location.search, parseUrlArgs)
    parseUrlArgs()
}
