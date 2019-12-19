declare @info table (Id int,
   part_name nvarchar(100));
declare @cat_id int = (select Id
from Categories
where category_name = @category_id)

UPDATE [dbo].[Parts]
   Set 
       [category_id] = @cat_id
      ,[part_name] = @part_name
      ,[articul] = @articul
      ,[manufacturer] = @manufacturer
      ,[editor_id] = @user_id
      ,[edit_date] = getutcdate()

output inserted.Id, inserted.part_name into @info
where Id = @Id

if(select Id
from @info) is not null 
begin
   select 'Приход запчастей по накладной "' + part_name + '" обновлен'
   from @info
end