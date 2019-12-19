--declare @userId nvarchar(128) = 'edf0eb42-a976-4989-bfc5-1bf5cafedf11';

USE [CRM_TAXI_System]

select 
os.[Name] as roleName

from [User] u
join [UserInOrganisation] uio on uio.UserId = u.UserId
join [OrganisationStructure] os on os.Id = uio.OrganisationStructureId
where u.UserId = @userId