export default function setUrl(u: string, q?: any[]): string {
    return [u, (q || []).map((i) => [i.name, i.value].join('=')).join('&')].join('?');
}
