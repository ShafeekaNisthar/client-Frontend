import axios from 'axios';

async function getUniqueValues(table: string, column: string): Promise<any[]> {
    try {
        const params = {
            tableName: table,
            columnName: column,
        };

        const response = await axios.get(`http://localhost:3000/ForwardRequest/UniqueValues`, {
            params,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const UniqueValues = response.data;
            console.log('received from frontend Server:', UniqueValues);
            return UniqueValues;
        } else {
            throw new Error('Failed to process from frontend Server');
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export default getUniqueValues;
