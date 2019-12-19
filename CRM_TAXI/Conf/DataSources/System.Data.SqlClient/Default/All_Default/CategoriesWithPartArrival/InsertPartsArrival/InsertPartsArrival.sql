declare @info table (Id int,
    invoice_number nvarchar(100));
begin
    INSERT INTO [dbo].[PartArrival]
        ([part_id]
        ,[provider_id]
        ,[invoice_number]
        ,[part_quantity]
        ,[part_price]
        ,[creator_id]
        ,[create_date]
        ,[editor_id]
        ,[edit_date])
    Output inserted.Id, inserted.invoice_number into @info
    Values
        (
             @articul
           , @provider
           , @invoice_number
           , @part_quantity
           , @part_price
           , @user_id
           , getutcdate()
           , @user_id
           , getutcdate()
		   )
end

if(select Id
from @info) is not null
begin
    select 'Приход запчастей по накладной "' + invoice_number  + '" выполнен', Id
    from @info
end