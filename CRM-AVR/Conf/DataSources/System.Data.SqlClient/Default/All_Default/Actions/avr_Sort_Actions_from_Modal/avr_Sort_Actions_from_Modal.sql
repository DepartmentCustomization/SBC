SELECT [Actions].[Id]
      ,Action_types.Name
      ,[Actions].[Sort_index]
  FROM [dbo].[Actions]
   inner join Action_type_Place_type as atpt on atpt.Id = Actions.Action_type_ID  
   inner join Action_types on Action_types.Id = atpt.Action_type_Id
  where Order_ID = @order_id
  order by Sort_index