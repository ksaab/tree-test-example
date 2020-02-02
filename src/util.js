/**
 * Рекурсивно строит дерево
 * @param {object} root - корень дерева
 * @param {object} binding - связи в дереве
 */
function MakeTree(root, binding) {
    root.children = binding[root.id] || [];
    root.children.sort((a, b) => {
        return a.srt < b.srt ? -1 : 1;
    });

    for (let key in root.children) {
        MakeTree(root.children[key], binding)
    }

    return root;
}

/**
 * Парсит строку с json содержимым
 * @param {string} raw - json строка
 * @return {object} - связи в дереве
 */
export function ParseRaw(raw) {
    const decoded = JSON.parse(raw);
    const binding = [];

    let root;

    for (let key in decoded) {
        let parent = decoded[key].parent_id;

        if (parent === undefined || decoded[key].id === undefined) {
            continue;
        }

        if (parent === null) {
            root = decoded[key];
            continue;
        }

        if (binding[parent] === undefined) {
            binding[parent] = [];
        }

        binding[parent].push(decoded[key]);
    }

    return MakeTree(root, binding);
}

/**
 * Запрашивает данные извне, передает в json парсер
 * @param {string} url - ссылка
 * @return {object} - связи в дереве
 */
export async function GetData(url) {
    const response = await fetch(url || 'https://rcslabs.ru/locations2.json');
    const data = await response.text();
    return ParseRaw(data);
}