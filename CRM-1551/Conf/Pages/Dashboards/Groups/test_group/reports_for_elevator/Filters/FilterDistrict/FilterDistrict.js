(function () {
  return {
    placeholder: 'Район',
    keyValue: 'Id',
    displayValue: 'Name',
    baseQueryOptions: {
        queryCode: 'DistricsSelect',
        limit: -1,
        filterColumns: [
            {
                key: 'Name',
                value: {
                    values: []
                }
            }
        ],
        parameterValues: [],
        pageNumber: 1,
        sortColumns: [
            {
            key: 'Name',
            value: 0
            }
        ]
    },
    onClearFilter: function() {
    },
    initValue:function() {
        this.setDefaultValue("first");
    },
    init:function() {
    },
    destroy() {
    }
};
}());
