declare @info table (Id int,
        dollar_date date);
begin

        INSERT INTO [dbo].Dollar_rate
                ([dollar_date]
                ,[dollar_rate]
                ,[creator_id]
                ,[create_date]
                ,[editor_id]
                ,[edit_date])
        Output inserted.Id, inserted.dollar_date into @info
        Values
                (
                        @dollar_date,
                        @dollar_rate,
                        @user_id,
                        getutcdate(),
                        @user_id,
                        getutcdate() )
end

if(select Id
from @info) is not null
begin
        select 'Курс доллара на "' + convert(varchar,dollar_date,102)  + '" добавлен', Id 
        from @info
end