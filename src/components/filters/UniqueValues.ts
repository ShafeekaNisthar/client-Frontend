import axios from 'axios';

async function getUniqueValues(table: string, column: string) {
    try {
        const params = {
            table: table,
            columns: column,
        };

        const response = await axios.get(`http://localhost:3000/api/unique-values`, {
            params,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        });

        if (response.status === 200) {
            const uniqueValues = await response.data.data; // Updated this line
            // console.log('received from frontend Server:', uniqueValues);
            return uniqueValues;
        } else {
            throw new Error('Failed to process from frontend Server');
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export default getUniqueValues;
