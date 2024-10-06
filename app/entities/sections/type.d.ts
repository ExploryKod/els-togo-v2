
type SectionTexts = Partial<{
    id: string;
    section_name: string;
    section_lang: string;
    section_version: string;
    section_pretitle: string;
    section_title: string,
    section_text: string | array<string>;
    css: string
}>;

type SectionTextError = {
    error: boolean;
    message: string;
}