// Define the types for the response from the LanguageTool server
import {CONFIG} from "@/config";

interface LanguageToolResponse {
    matches: Array<{
        message: string;
        shortMessage: string;
        replacements: Array<{ value: string;}>;
        offset: number;
        length: number;
        context: {
            text: string;
            offset: number;
            length: number;
        };
        rule: {
            id: string;
            description: string;
            issueType: string;
        };
    }>;
    language: {
        name: string;
        code: string;
        detectedLanguage: string;
    };
}

export async function checkTextWithLanguageTool(text: string) {
    const url = CONFIG.basePath + '/v2/check';

    const params = new URLSearchParams();
    params.append('text', text);
    params.append('language', CONFIG.language);
    params.append('level', CONFIG.level);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    if (!response.ok) {
        throw new Error("Failed to get response from LanguageTool server.")
    }

    const data: LanguageToolResponse = await response.json();
    return data;

}
