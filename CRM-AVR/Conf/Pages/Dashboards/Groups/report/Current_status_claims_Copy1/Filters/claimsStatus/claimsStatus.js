(function () {
  return {
    placeholder: 'Статус заявки',
    keyValue: 'Id',
    displayValue: 'Name',
    baseQueryOptions: {
        queryCode: 'list_claimsStatus_from_dashboars',
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
        this.sendStatus(item);
    },
    onClearFilter: function() {
    },
    sendStatus(item) {
        let message = {
            name: 'claimStatus',
            package: {
                type: item.value
            }
        }
        this.messageService.publish(message);
    },
    init: function(){
    
    },
    initValue: function(){
        this.setDefaultValue('first');
    },
    destroy() {
      
    }
};
}());
