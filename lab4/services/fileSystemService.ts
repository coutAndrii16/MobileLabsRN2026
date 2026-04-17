import * as FileSystem from 'expo-file-system/legacy';

export const readDirectory = async (path: string) => {
    const entries = await FileSystem.readDirectoryAsync(path);

    return Promise.all(
        entries.map(async (name) => {
            const fullPath = path + name;
            const info = await FileSystem.getInfoAsync(fullPath, { size: true });

            return {
                name,
                fullPath,
                isDirectory: info.isDirectory,
                size: info.size,
                modificationTime: info.modificationTime,
            };
        })
    );
};