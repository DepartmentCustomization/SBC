(function () {
  return { 
    init: function() {
      this.sub = this.messageService.subscribe( 'GlobalFilterChanged', this.getFiltersParams, this );
    },
    getFiltersParams: function(message){
      const dateFilterStart = message.package.value.values.find(f => f.name === 'period').value.dateFrom;
      const dateFilterEnd = message.package.value.values.find(f => f.name === 'period').value.dateTo;
      const executorFilter = message.package.value.values.find(f => f.name === 'executor').value;
      const claim_typeFilter = message.package.value.values.find(f => f.name === 'claim_type').value;
      const name = 'FiltersParams';

      const dateStart = this.changeDateTimeValues(dateFilterStart);
      const dateEnd = this.changeDateTimeValues(dateFilterEnd);
      // if( date !== '' ){
         const executor = executorFilter === null ? 0 :  executorFilter === '' ? 0 : executorFilter.value;
         const claimType = claim_typeFilter === null ? 0 :  claim_typeFilter === '' ? 0 : claim_typeFilter.value;
         this.messageService.publish({ name, dateStart, dateEnd, executor, claimType  });
      // }
    },
    changeDateTimeValues: function(value){
      
        if( value === '') {
          return value;
        }
        let date = new Date(value);
        let dd = date.getDate().toString();
        let mm = (date.getMonth() + 1).toString();
        let yyyy = date.getFullYear();
        dd = dd.length === 1 ? '0' + dd : dd;
        mm = mm.length === 1 ? '0' + mm : mm;
        return yyyy + '-' + mm + '-' + dd;
    },
    destroy: function () {
      this.sub.unsubscribe();
    }
  };
}());
