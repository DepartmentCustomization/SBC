declare @info table (Id int,
        provider_name nvarchar(100));
begin

        INSERT INTO [dbo].Providers
                ([provider]
                ,[provider_conditions]
                ,[creator_id]
                ,[create_date]
                ,[editor_id]
                ,[edit_date])
        Output inserted.Id, inserted.[provider] into @info
        Values
                (
                        @provider,
                        @provider_conditions,
                        @user_id,
                        getutcdate(),
                        @user_id,
                        getutcdate() )
end

if(select Id
from @info) is not null
begin
        select 'Поставщика "' + provider_name  + '" добавлено', Id
        from @info
end