SELECT DISTINCT [Actions].[Id]
      ,Places.Name as places_name
      ,concat(Action_types.Name, '  (тип місця: ' +  p.Name + ')') as action_types_name
	  ,Actions.Plan_start_date
      ,[Actions].[Start_from]
      ,[Actions].[Finish_at]

	  ,Actions.Fact_duration

      ,case when Actions.[Is_Goal] = 1 then N'Так' else N'Ні' end Is_Goal
      ,[Actions].[Value]

      ,Place_types.Name as place_type_name


      ,Units.ShortName as UnitsShortName
  FROM [dbo].[Actions]
  left join Claims on Claims.Id = Actions.Claim_ID
  left join Orders on Orders.Id = Actions.Order_ID
  left join Action_type_Place_type on Action_type_Place_type.Id = Actions.Action_type_ID
  left join Action_types on Action_types.Id = Action_type_Place_type.Action_type_Id
  left join Units on Units.Id = Action_types.Units_Id
  left join Place_types p on p.Id = Action_type_Place_type.Place_type_Id
  left join Places on Places.Id = Actions.Place_ID
  left join Place_types on Place_types.Id = Places.Place_type_ID
  left join Houses on Houses.Id = Places.Street_id
  left join Diameters on Diameters.Id = Actions.Diameters_ID
  where Claims.Id = @claim_id