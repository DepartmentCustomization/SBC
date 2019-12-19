declare @info table (Id int, cars_name nvarchar(100));

UPDATE [dbo].[Cars]
   Set [cars_name] = @cars_name
      ,[cars_number] = @cars_number
      ,[cars_mark] = @cars_mark
      ,[cars_year] = @cars_year
      ,[editor_id] = @user_id
      ,[edit_date] = getutcdate()
output inserted.Id, inserted.cars_name into @info
where Id = @Id 

if(select Id from @info) is not null 
begin
select 'Данные автомобиля "' + cars_name + '" обновлены'
from @info
end