with [ParentOrganisations] as (
    select
       [Id]
      ,[Name]
      ,[ParentId]
      ,[Group]
      ,[Icon]
      ,[Address]
      ,[PhoneNumber]
    from [CRM_AVR_System].[dbo].[OrganisationStructure]
    where #filter_columns#
),
[Organisations] as (
    select
       [Id]
      ,[Name]
      ,[ParentId]
      ,[Group]
      ,[Icon]
      ,[Address]
      ,[PhoneNumber]
    from [ParentOrganisations]
    union all
    select
       [CRM_AVR_System].[dbo].[OrganisationStructure].[Id]
      ,[CRM_AVR_System].[dbo].[OrganisationStructure].[Name]
      ,[CRM_AVR_System].[dbo].[OrganisationStructure].[ParentId]
      ,[CRM_AVR_System].[dbo].[OrganisationStructure].[Group]
      ,[CRM_AVR_System].[dbo].[OrganisationStructure].[Icon]
      ,[CRM_AVR_System].[dbo].[OrganisationStructure].[Address]
      ,[CRM_AVR_System].[dbo].[OrganisationStructure].[PhoneNumber]
    from [CRM_AVR_System].[dbo].[OrganisationStructure]
    where exists(select * from [ParentOrganisations] where [ParentOrganisations].[Id] = [CRM_AVR_System].[dbo].[OrganisationStructure].[ParentId])
)
select TOP 5
       [Id]
      ,[Name]
      ,[ParentId]
      ,[Group]
      ,[Icon]
      ,[Address]
      ,[PhoneNumber]
from [Organisations]