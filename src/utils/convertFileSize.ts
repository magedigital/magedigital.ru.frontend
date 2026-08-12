export const converFileSize = (bytes: number): string => {
    if (!bytes || bytes < 0) return '0 B';

    const units = ['б', 'Кб', 'Мб', 'Гб', 'Тб'];
    let i = 0;

    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }

    return `${bytes.toFixed(0)} ${units[i]}`;
};
