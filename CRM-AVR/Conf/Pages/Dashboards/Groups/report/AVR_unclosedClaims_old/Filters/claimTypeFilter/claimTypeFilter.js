(function () {
  return {
    placeholder: 'Тип заявки',
    keyValue: 'Id',
    displayValue: 'Name',
    baseQueryOptions: {
        queryCode: 'dir_ClaimClassesSelectRows',
        filterColumns: null,
        limit: -1,
        parameterValues: [],
        pageNumber: 1,
        sortColumns: [
            {
            key: 'Id',
            value: 0
            }
        ]
    },
    onItemSelect: function(item) {
        
        this.sendMessage(item);
    },
    onClearFilter: function() {
    },
    sendMessage(item) {
        
        let message = {
            name: 'claimsType',
            package: {
                type: item
            }
        }
        this.messageService.publish(message);
    },
    init:function() {
        this.setDefaultValue("first");
    },
    destroy() {
        console.log("Kastular_ClaimTypeFilter says Bye!");
    }
};
}());
