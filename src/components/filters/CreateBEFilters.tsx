interface DefineFilterProps {
    filtername: string;
    table: string;
    column: string;
    operator: string;
    values: any;
}

const DefineFilter = ({ table, column, operator, values }: DefineFilterProps) => {
    if (!table || !column || !operator || !values) {
        throw new Error('Invalid filter definition. All fields (table, column, operator, values) are required.');
    }
    
    const filter = {
        target: { table, columns: column },
        conditions: { operator, values: values }
    };

    return filter;
};

const CreateBEFilters = (filterDefinitions: DefineFilterProps[]) => {
    if (!Array.isArray(filterDefinitions)) {
        throw new Error('Invalid filter definitions. An array of filter definitions is required.');
    }

    // const columns = filterDefinitions.map(({ table, column }) => ({ table, columns: column }));
    const filters = Object.fromEntries(filterDefinitions.map(filter => {
        if (!filter.filtername) {
            throw new Error('Invalid filter definition. filtername is required.');
        }
        return [filter.filtername, DefineFilter(filter)];
    }));

    return { filters };
};

export default CreateBEFilters;
