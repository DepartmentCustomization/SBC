(function () {
  return {
    placeholder: 'Клас заявки',
    keyValue: 'Id',
    displayValue: 'Name',
    baseQueryOptions: {
        queryCode: 'Query_Filter_Claim_classes',
        filterColumns: null,
        limit: -1,
        parameterValues: [],
        pageNumber: 1,
        sortColumns: [
            {
            key: 'Name',
            value: 0
            }
        ]
    },
    onItemSelect: function(item) {
                var message = {
                                name: 'chance_filter_Claim_classes',
                                value: item
                              };
                this.messageService.publish(message);
    },
    onClearFilter: function() {
    },
    init:function() {

    },
    destroy() {
    }
    //initValue: function(){ }
};
}());
