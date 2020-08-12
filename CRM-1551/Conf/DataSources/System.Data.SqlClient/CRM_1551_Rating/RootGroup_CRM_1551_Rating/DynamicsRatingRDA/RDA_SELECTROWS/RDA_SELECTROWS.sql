
--declare @user_id nvarchar(128)=N'36d11ab9-4151-4b63-8cd7-fb5008996af4'

--select Id, short_name Name
--  from [CRM_1551_Analitics].[dbo].[Organizations]
--  where organization_type_id=5/*РДА*/
--  --AND #filter_columns#
--  --#sort_columns#
--  ORDER BY 1
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only

select Id, Name
from 
(
 select [Organizations].Id, [Organizations].short_name Name
 --[Positions].organizations_id
  from [CRM_1551_Analitics].[dbo].[Positions]
  inner join [CRM_1551_Analitics].[dbo].[Organizations] on [Positions].organizations_id=[Organizations].id
  where [Positions].[programuser_id]=@user_id and [Organizations].organization_type_id=5/*РДА*/
  union
  select [Organizations].Id, [Organizations].short_name Name
  --[Positions2].organizations_id
  from [CRM_1551_Analitics].[dbo].[Positions]
  inner join [CRM_1551_Analitics].[dbo].[PositionsHelpers] on [Positions].Id=[PositionsHelpers].helper_position_id
  inner join [CRM_1551_Analitics].[dbo].[Positions] [Positions2] on [PositionsHelpers].main_position_id=[Positions2].Id
  inner join [CRM_1551_Analitics].[dbo].[Organizations] on [Positions2].organizations_id=[Organizations].id
  where [Positions].[programuser_id]=@user_id and [Organizations].organization_type_id=5/*РДА*/
  ) t
  where #filter_columns#
    ORDER BY 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only