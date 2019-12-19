declare @info table (Id int,
        cars_name nvarchar(100));
begin

        INSERT INTO [dbo].[Cars]
                ([cars_name]
                ,[cars_number]
                ,[cars_mark]
                ,[cars_year]
                ,[creator_id]
                ,[create_date]
                ,[editor_id]
                ,[edit_date])
        Output inserted.Id, inserted.cars_name into @info
        Values
                (
                        @cars_name,
                        @cars_number,
                        @cars_mark,
                        @cars_year,
                        @user_id,
                        getutcdate(),
                        @user_id,
                        getutcdate() )
end

if(select Id from @info) is not null
begin
        select 'Автомобиль "' + cars_name  + '" добавлено'
        from @info
end