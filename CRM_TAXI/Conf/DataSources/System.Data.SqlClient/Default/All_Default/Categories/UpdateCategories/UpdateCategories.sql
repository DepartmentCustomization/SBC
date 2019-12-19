declare @info table (Id int, category_name nvarchar(100));

UPDATE [dbo].[Categories]
   Set [category_name] = @category_name
      ,[category_description] = @category_description
      ,[operational_period_km] = @operational_period_km
      ,[operational_period_day] = @operational_period_day
      ,[min_count_stock] = @min_count_stock
      ,[editor_id] = @user_id
      ,[edit_date] = getutcdate()
output inserted.Id, inserted.category_name into @info
where Id = @Id 

if(select Id from @info) is not null 
begin
select 'Данные категории "' + category_name + '" обновлены'
from @info
end