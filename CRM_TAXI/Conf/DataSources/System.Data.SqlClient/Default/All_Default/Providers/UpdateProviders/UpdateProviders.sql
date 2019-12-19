declare @info table (Id int,
   provider_name nvarchar(100));

UPDATE [dbo].Providers
   Set [provider] = @provider
      ,[provider_conditions] = @provider_conditions
      ,[editor_id] = @user_id
      ,[edit_date] = getutcdate()
output inserted.Id, inserted.[provider] into @info
where Id = @Id

if(select Id
from @info) is not null 
begin
   select 'Данные поставщика "' + provider_name + '" обновлены'
   from @info
end