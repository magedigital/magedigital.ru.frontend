export default function setUrl(u: string, q?: FilterQueryT[]): string {
    return [u, (q || []).map((i) => [i.name, i.value].join('=')).join('&')].join('?');
}
