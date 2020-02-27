SELECT [Actions].[Id]
      ,[Actions].[Claim_ID]
      ,[Actions].[Order_ID]
      ,Action_type_Place_type.Id as ac_pl_types_id
      ,concat(Action_types.Name, '  (тип місця: ' +  p.Name + ')') as action_types_name
    --  ,Action_types.Name as action_types_name
      	--	,Action_types.Id as action_types_id
	  ,Places.Name as places_name
		,Places.Id as places_id
	  ,Actions.Plan_start_date
      ,[Actions].[Start_from]
      ,[Actions].[Finish_at]
	  ,Actions.Plan_duration
	  ,Actions.Fact_duration
      ,[Actions].[Sort_index]
      ,[Actions].[Is_Goal]
      ,[Diameters].Size 
        ,Diameters.Id as [Diameters_ID]
      ,[Actions].[Value]
      ,Actions.Comment
      ,Claims.Status_ID as claim_stat_id
      ,Orders.Status_ID as order_stat_id
      ,Actions.Do_not
      ,Houses.Street_id
      ,Place_types.Name as place_type_name
        ,Place_types.Id as place_type_id
        ,Units.Id as Units_Id
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
  where Actions.Id = @Id