import axios from 'axios';
import configs from '../config';
import modelLibrary from '../models/modelLibrary';
import { ILibraryResponse } from '../interfaces/ILibraryResponse';

const {
    URLS: { SOURCE },
} = configs;

/**
 * 열람실 좌석 정보 -> 5분마다 한 번씩 크롤링
 */

export default {
    getLibraryStatus: async function (): Promise<ILibraryResponse[]> {
        const url = SOURCE.LIBRARY;
        const {
            data: {
                data: { list },
            },
        }: { data: { data: { list: [ILibraryResponse] } } } = await axios.get(url);
        return list;
    },

    updateLibraryData: async function (newData: ILibraryResponse): Promise<void> {
        await modelLibrary().createOrOverwrite(newData);
    },
};
