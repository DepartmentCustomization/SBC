declare @info table (Id int,
   dollar_date date);

UPDATE [dbo].Dollar_rate
   Set [dollar_date] = @dollar_date
      ,[dollar_rate] = @dollar_rate
      ,[editor_id] = @user_id
      ,[edit_date] = getutcdate()
output inserted.Id, inserted.dollar_date into @info
where Id = @Id

if(select Id
from @info) is not null 
begin
   select 'Курс доллара на "' + convert(varchar,dollar_date,102) + '" обновлен'
   from @info
end