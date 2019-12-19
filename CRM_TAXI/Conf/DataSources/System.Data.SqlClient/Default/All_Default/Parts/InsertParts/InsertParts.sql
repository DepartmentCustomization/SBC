declare @info table (Id int,
        part_name nvarchar(100));
begin
        INSERT INTO [dbo].[Parts]
                ([category_id]
                ,[part_name]
                ,[articul]
                ,[manufacturer]
                -- ,[part_quantity]
                -- ,[part_price]
                ,[creator_id]
                ,[create_date]
                ,[editor_id]
                ,[edit_date])
        Output inserted.Id, inserted.part_name into @info
        Values(
             @category_id
           , @part_name
           , @articul
           , @manufacturer
        --    , @part_quantity
        --    , @part_price
           , @user_id
           , getutcdate()
           , @user_id
           , getutcdate() 
		   )
end
if(select Id
from @info) is not null
begin
        select 'Запчасть "' + part_name  + '" добавлено', Id, part_name
        from @info
end