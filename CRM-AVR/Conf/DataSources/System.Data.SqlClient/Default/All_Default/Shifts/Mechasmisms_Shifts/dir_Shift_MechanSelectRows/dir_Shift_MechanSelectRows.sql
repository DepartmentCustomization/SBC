SELECT distinct [Mechanisms].[Id]
	  ,Mechanism_types.Name as mechanism_types_name
      ,[Mechanisms].[Name] as mechanisms_name
      ,[Mechanisms].[Number] as mechanisms_number
      ,Organizations.Name as organizations_name
	  ,case when len(concat(N'Тип: ' + Mechanism_types.Name, N'; Модель: ' + [Mechanisms].[Name],N'; Гос.номер: ' + [Mechanisms].[Number])) = 0 then NULL else
		concat(N'Тип: ' + Mechanism_types.Name, N'; Модель: ' + [Mechanisms].[Name],N'; Гос.номер: ' + [Mechanisms].[Number]) end as model
  FROM [dbo].[Mechanisms]
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	left join Shifts on Shifts.Mechanism_ID = Mechanisms.Id
	left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
WHERE Organizations.Id = @organizations_mech
    and
     #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only