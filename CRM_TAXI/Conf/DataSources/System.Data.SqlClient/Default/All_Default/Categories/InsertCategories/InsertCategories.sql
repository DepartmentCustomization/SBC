declare @info table (Id int,
        category_name nvarchar(100));
begin

        INSERT INTO [dbo].[Categories]
                ([category_name]
                ,[category_description]
                ,[operational_period_km]
                ,[operational_period_day]
                ,[min_count_stock]
                ,[creator_id]
                ,[create_date]
                ,[editor_id]
                ,[edit_date])
        Output inserted.Id, inserted.category_name into @info
        Values
                (
                        @category_name,
                        @category_description,
                        @operational_period_km,
                        @operational_period_day,
                        @min_count_stock,
                        @user_id,
                        getutcdate(),
                        @user_id,
                        getutcdate() )
end

if(select Id from @info) is not null
begin
        select 'Категорию "' + category_name  + '" добавлено', Id 
        from @info
end