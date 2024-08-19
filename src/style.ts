import {CONFIG} from "@/config";

function adjustHex(hex: string, amount: number) {
    let num = parseInt(hex.replace('#', ''), 16);
    num += amount;
    if (num < 0) {
        num = 0;
    }
    if (num > 0xffffff) {
        num = 0xffffff;
    }
    let str = num.toString(16);
    if (str.length < 6) {
        str = '0'.repeat(6 - str.length) + str;
    }
    return '#' + str;
}


function buildContent() {
    const bg = CONFIG.backgroundColor.value
    if (!bg) {
        return '';
    }
    const bgDark = adjustHex(bg, -0x101010);
    const bgLight = adjustHex(bg, 0x101010);
    return `
        html {
            font-family: ${CONFIG.fontFamily.value};
            font-size: ${CONFIG.fontSize.value}px;
            line-height: ${CONFIG.lineHeight.value};
            letter-spacing: ${CONFIG.letterSpacing.value}em;
            --color: ${CONFIG.color.value};
            --bg: ${bg};
            --bg-dark: ${bgDark};
            --bg-light: ${bgLight};
        }
    `
}

export function applyStyle() {
    let style = document.getElementById('custom-style');
    if (style) {
        style.textContent = buildContent();
        return;
    }
    style = document.createElement('style');
    style.id = 'custom-style';
    style.textContent = buildContent();
    document.head.appendChild(style);
}
