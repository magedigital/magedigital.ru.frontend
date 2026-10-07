export default function getQueryArr(s: string): any[] {
    return s.split('&').map((i) => ({ name: i.split('=')[0], value: i.split('=')[1] }));
}
