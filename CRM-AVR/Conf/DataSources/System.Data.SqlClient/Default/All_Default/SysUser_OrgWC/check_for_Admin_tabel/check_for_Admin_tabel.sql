-- declare @user_id nvarchar(128) = N'f3d35da1-2867-4043-b41c-dc2fb5eafcf3'

IF EXISTS (SELECT 1
              FROM [CRM_AVR_System].[dbo].[UserInOrganisation]
              where [OrganisationStructureId] = 10
              and UserId = @user_id
    )
begin
	select 'Admin' as [check]
end