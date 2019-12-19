declare @info table (Id int,
   invoice_number nvarchar(100));

UPDATE [dbo].[PartArrival]
   Set [part_id] = (select Id from Parts where articul = @articul)
      ,[provider_id] = ( select Id from Providers where [provider] = @provider )
      ,[part_quantity] = @part_quantity
      ,[part_price] = @part_price
      ,[editor_id] = @user_id
      ,[edit_date] = GETUTCDATE()
output inserted.Id, inserted.invoice_number into @info

 Where Id = @Id

if(select Id
from @info) is not null 
begin
   select 'Приход запчастей по накладной "' + invoice_number + '" обновлен'
   from @info
end